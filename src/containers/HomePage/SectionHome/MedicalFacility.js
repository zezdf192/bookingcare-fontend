import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import './SectionHome.scss';
import { getAllClinic } from '../../../services/patientService';

function MedicalFacility({ settings }) {
    const [clinicArr, setClinicArr] = useState([]);
    const history = useHistory();
    useEffect(async () => {
        let res = await getAllClinic();

        if (res && res.errCode === 0) {
            setClinicArr(res.data);
        }
    }, []);

    const handleViewDetailDoctor = (doctor) => {
        history.push(`/detail-clinic/${doctor.id}`);
    };

    return (
        <div className="section-container section-medical-facility">
            <div className="section-content ">
                <div className="section-header">
                    <h2 className="section-title">Cơ sở y tế nổi bật</h2>
                    <button className="section-btn">XEM THÊM</button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {clinicArr &&
                            clinicArr.length > 0 &&
                            clinicArr.map((item) => {
                                return (
                                    <div
                                        className="section-child medical-facility-img"
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
