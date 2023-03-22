import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';

import HeaderHome from '../../HomePage/HeaderHome/HeaderHome';
import './DetailDoctor.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorScheduleMore from './DoctorScheduleMore';

function DetailDoctor(props) {
    const [doctorDetail, setdoctorDetail] = useState({});
    let id;
    if (props.match && props.match.params && props.match.params.id) {
        id = props.match.params.id;
    }

    useEffect(() => {
        props.getDetailDoctor(id);
    }, []);

    if (doctorDetail !== props.detailDoctor) {
        setdoctorDetail(props.detailDoctor);
    }
    let valueVi = '';
    let valueEn = '';
    if (doctorDetail && doctorDetail.positionData && doctorDetail.positionData.valueVi) {
        valueVi = `${doctorDetail.positionData.valueVi} ${doctorDetail.lastName} ${doctorDetail.firstName}`;
        valueEn = `${doctorDetail.positionData.valueEn} ${doctorDetail.firstName} ${doctorDetail.lastName}`;
    }
    let title = props.language === LANGUAGES.VI ? valueVi : valueEn;

    return (
        <>
            <HeaderHome />
            <div className="detail-doctor-container">
                <div className="detail-doctor-intro">
                    <div className="content-left">
                        <div
                            className="doctor-image"
                            style={
                                doctorDetail && doctorDetail.image && { backgroundImage: `url(${doctorDetail.image})` }
                            }
                        ></div>
                    </div>
                    <div className="content-right">
                        <div className="up">{title}</div>
                        <div className="down">
                            <span>{doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.description}</span>
                        </div>
                    </div>
                </div>
                <div className="detail-doctor-calendar">
                    <div className="content-left">
                        <DoctorSchedule doctorId={id} />
                    </div>
                    <div className="content-right">
                        <DoctorScheduleMore doctorId={id} />
                    </div>
                </div>
                <div className="detail-doctor-schedule">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.contentHTML,
                        }}
                    ></div>
                    {/* <span>{doctorDetail.Markdown.contentHTML}</span> */}
                </div>
                <div className="detail-doctor-comment"></div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        detailDoctor: state.doctor.detailDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailDoctor: (id) => dispatch(actions.getDetailInfoDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
