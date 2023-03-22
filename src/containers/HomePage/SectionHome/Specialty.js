import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/patientService';
import { useHistory } from 'react-router-dom';

import Slider from 'react-slick';
import './SectionHome.scss';

function Specialty({ settings }) {
    const [specialtyArr, setSpecialtyArr] = useState([]);
    const history = useHistory();
    useEffect(async () => {
        let res = await getAllSpecialty();

        if (res && res.errCode === 0) {
            setSpecialtyArr(res.data);
        }
    }, []);

    const handleViewDetailDoctor = (doctor) => {
        history.push(`/detail-specialty/${doctor.id}`);
    };

    return (
        <div className="section-container section-specialty">
            <div className="section-content">
                <div className="section-header">
                    <h2 className="section-title">
                        <FormattedMessage id="home-page.specialty" />
                    </h2>
                    <button className="section-btn">
                        <FormattedMessage id="home-page.more-info" />
                    </button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {specialtyArr &&
                            specialtyArr.length > 0 &&
                            specialtyArr.map((item) => {
                                return (
                                    <div
                                        className="section-child specialty-img"
                                        onClick={() => handleViewDetailDoctor(item)}
                                    >
                                        <div
                                            className="section-img "
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className="section-title">{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
