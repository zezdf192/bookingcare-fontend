import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';

import HeaderHome from '../../HomePage/HeaderHome/HeaderHome';

import DoctorSchedule from '../DetailDoctor/DoctorSchedule';
import DoctorScheduleMore from '../DetailDoctor/DoctorScheduleMore';
import DoctorProfile from '../DoctorProfile/DoctorProfile';
import { getDetailClinic } from '../../../services/patientService';

import { getDetailSpecialty } from '../../../services/patientService';

import './DetailClinic.scss';

function DetailClinic(props) {
    const [clinicDetail, setClinicDetail] = useState({});
    const [listDoctorID, setListDoctorId] = useState([]);

    useEffect(async () => {
        let id;
        if (props.match && props.match.params && props.match.params.id) {
            id = props.match.params.id;
        }
        let res = await getDetailClinic({
            id,
        });
        if (res && res.errCode === 0) {
            setClinicDetail(res.data);
            if (res.data.doctorClinic && res.data.doctorClinic.length > 0) {
                setListDoctorId(res.data.doctorClinic);
            }
        }
    }, []);

    return (
        <>
            <HeaderHome />
            <div className="detail-specialty-container">
                <div className="specialty-description">
                    <h1>{clinicDetail.name && clinicDetail.name}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: clinicDetail && clinicDetail.descriptionHTML && clinicDetail.descriptionHTML,
                        }}
                    ></div>
                </div>
                <div className="detail-specialty-body">
                    <div className="detail-specialty-list-doctor">
                        {listDoctorID &&
                            listDoctorID.length > 0 &&
                            listDoctorID.map((item, index) => {
                                return (
                                    <div className="each-doctor" key={index}>
                                        <div className="content-left">
                                            <div className="ds-doctor-profile">
                                                <DoctorProfile
                                                    isShowPrice={false}
                                                    isShowMore={true}
                                                    isShowDescription={true}
                                                    doctorId={item.doctorId}
                                                />
                                            </div>
                                        </div>
                                        <div className="content-right">
                                            <div className="ds-schedule">
                                                <DoctorSchedule doctorId={item.doctorId} />
                                            </div>
                                            <div className="more">
                                                <DoctorScheduleMore doctorId={item.doctorId} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
