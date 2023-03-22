import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getDetailInfoDoctorService } from '../../../services/doctorService';
import { LANGUAGES } from '../../../utils/constant';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import './DoctorProfile.scss';
import _ from 'lodash';
import { Link } from 'react-router-dom';

function DoctorProfile(props) {
    let { isShowPrice, isShowMore, isShowDescription } = props;
    const [doctorId, setDoctorId] = useState('');
    const [doctorProfile, setDoctorProfile] = useState({});
    useEffect(() => {
        setDoctorId(props.doctorId);
    }, [props.doctorId]);

    const getProfileDoctor = async () => {
        let result = {};
        if (doctorId) {
            let res = await getDetailInfoDoctorService(doctorId);

            if (res && res.errCode === 0) {
                result = res.data;
            }
        }

        return result;
    };

    useEffect(async () => {
        let profile = await getProfileDoctor();
        if (!_.isEmpty(profile)) {
            setDoctorProfile(profile);
        }
    }, [doctorId]);

    let title = '';

    let valueVi =
        doctorProfile &&
        doctorProfile.positionData &&
        `${doctorProfile.positionData.valueVi} ${doctorProfile.lastName} ${doctorProfile.firstName}`;
    let valueEn =
        doctorProfile &&
        doctorProfile.positionData &&
        `${doctorProfile.positionData.valueEn} ${doctorProfile.firstName} ${doctorProfile.lastName}`;

    title = props.language === LANGUAGES.VI ? valueVi : valueEn;

    const renderShowDateBooking = () => {
        if (props.doctorDate) {
            let doctorDate = props.doctorDate;

            let time =
                doctorDate && doctorDate.timeTypeData && props.language === LANGUAGES.VI
                    ? doctorDate.timeTypeData.valueVi
                    : doctorDate.timeTypeData.valueEn;

            let date =
                props.language === LANGUAGES.VI
                    ? moment(new Date(doctorDate.date)).format('dddd - DD/MM/YYYY')
                    : moment(new Date(doctorDate.date)).locale('en').format('ddd - MM/DD/YYYY');

            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                </>
            );
        }
        return;
    };

    return (
        <div className="doctor-profile-container">
            <div className="doctor-profile-body">
                <div className="content-left">
                    <div
                        className="doctor-image"
                        style={
                            doctorProfile && doctorProfile.image && { backgroundImage: `url(${doctorProfile.image})` }
                        }
                    ></div>
                </div>
                <div className="content-right">
                    <div className="up">{title}</div>
                    <div className="down">
                        <span>
                            {isShowDescription
                                ? doctorProfile && doctorProfile.Markdown && doctorProfile.Markdown.description
                                : ''}
                        </span>
                    </div>
                    <>{renderShowDateBooking()}</>
                </div>
            </div>
            {isShowMore && <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>}
            {isShowPrice && (
                <div className="doctor-profile-price">
                    <FormattedMessage id="patient.extra-infor.price" />
                    {props.language === LANGUAGES.VI ? (
                        <NumberFormat
                            value={
                                doctorProfile && doctorProfile.Doctor_infor && doctorProfile.Doctor_infor.priceData
                                    ? doctorProfile.Doctor_infor.priceData.valueVi
                                    : ''
                            }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    ) : (
                        <NumberFormat
                            value={
                                doctorProfile && doctorProfile.Doctor_infor && doctorProfile.Doctor_infor.priceData
                                    ? doctorProfile.Doctor_infor.priceData.valueEn
                                    : ''
                            }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    )}
                </div>
            )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
