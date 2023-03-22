import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { fetchTopDoctor } from '../../../store/actions/doctorActions';

import Slider from 'react-slick';
import './SectionHome.scss';

function OutstandingDoctor(props) {
    const { settings, getTopDoctorRedux, topDoctor, language } = props;
    const [arrDoctor, setArrDoctor] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getTopDoctorRedux();
    }, []);

    if (arrDoctor !== topDoctor) {
        setArrDoctor(topDoctor);
    }

    const handleViewDetailDoctor = (doctor) => {
        console.log('cehck dadta', doctor);
        history.push(`/detail-doctor/${doctor.id}`);
    };

    return (
        <div className="section-container section-doctor">
            <div className="section-content ">
                <div className="section-header">
                    <h2 className="section-title">
                        <FormattedMessage id="home-page.outstanding-doctor" />
                    </h2>
                    <button className="section-btn">
                        <FormattedMessage id="home-page.more-info" />
                    </button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {arrDoctor &&
                            arrDoctor.length > 0 &&
                            arrDoctor.map((doctor) => {
                                let buffer;
                                if (doctor.image) {
                                    buffer = new Buffer(doctor.image, 'base64').toString('binary');
                                }
                                let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
                                let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                                return (
                                    <div
                                        className="section-child doctor-img"
                                        onClick={() => handleViewDetailDoctor(doctor)}
                                    >
                                        <div className="section-border ">
                                            <div className="section-img" style={{ backgroundImage: `url(${buffer})` }}>
                                                <div className="img"></div>
                                            </div>
                                            <div className="section-title">
                                                <div>{language === 'vi' ? nameVi : nameEn}</div>
                                                <div className="speciaty">Da liễu</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.doctor.topDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopDoctorRedux: () => dispatch(fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
