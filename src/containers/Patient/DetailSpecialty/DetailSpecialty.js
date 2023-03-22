import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';

import HeaderHome from '../../HomePage/HeaderHome/HeaderHome';

import DoctorSchedule from '../DetailDoctor/DoctorSchedule';
import DoctorScheduleMore from '../DetailDoctor/DoctorScheduleMore';
import DoctorProfile from '../DoctorProfile/DoctorProfile';
import { getAllCodeService } from '../../../services/userService';

import { getDetailSpecialty } from '../../../services/patientService';

import './DetailSpecialty.scss';

function DetailSpecialty(props) {
    const [specialtyDetail, setSpecialtyDetail] = useState({});
    const [listProvince, setListProvince] = useState([]);
    const [listDoctorID, setListDoctorId] = useState([]);

    useEffect(async () => {
        let id;
        if (props.match && props.match.params && props.match.params.id) {
            id = props.match.params.id;
        }
        let res = await getDetailSpecialty({
            id,
            location: 'ALL',
        });
        if (res && res.errCode === 0) {
            setSpecialtyDetail(res.data);
            if (res.data.doctorSpecialty && res.data.doctorSpecialty.length > 0) {
                setListDoctorId(res.data.doctorSpecialty);
            }
        }

        let provice = await getAllCodeService('PROVINCE');
        if (provice && provice.errCode == 0) {
            let result = provice.data;
            result.unshift({
                keyMap: 'ALL',
                type: 'PROVINCE',
                valueEn: 'All',
                valueVi: 'Toàn quốc',
            });
            setListProvince(provice.data);
        }
    }, []);

    console.log('check data ', specialtyDetail);
    console.log('cehck province', listProvince);

    const handleChangeProvince = async (e) => {
        let id;
        let location = e.target.value;
        if (props.match && props.match.params && props.match.params.id) {
            id = props.match.params.id;
        }
        if (id) {
            let res = await getDetailSpecialty({
                id,
                location: location,
            });
            if (res && res.errCode === 0) {
                if (res.data.doctorSpecialty && res.data.doctorSpecialty.length > 0) {
                    setListDoctorId(res.data.doctorSpecialty);
                } else {
                    setListDoctorId([]);
                }
            }
            console.log('province', e.target.value);
        }
    };

    return (
        <>
            <HeaderHome />
            <div className="detail-specialty-container">
                <div className="specialty-description">
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                specialtyDetail && specialtyDetail.descriptionHTML && specialtyDetail.descriptionHTML,
                        }}
                    ></div>
                </div>
                <div className="detail-specialty-body">
                    <div className="ds-option">
                        <select onChange={(e) => handleChangeProvince(e)}>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
