import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import moment from 'moment';
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import { getScheduleByDate } from '../../../services/doctorService';
import ModalBooking from '../ModalBooking/ModalBooking';

function DoctorSchedule(props) {
    const [arrDate, setArrDate] = useState([]);
    const [availableDate, setAvailableDate] = useState([]);
    const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
    const [doctorProfile, setDoctorProfile] = useState();
    const [doctorId, setDoctorId] = useState('');

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getAllDate = () => {
        let allDay = [];

        for (let i = 0; i < 7; i++) {
            let object = {};

            if (props.language === LANGUAGES.VI) {
                if (i === 0) {
                    let labelVi = moment(new Date()).add(i, 'days').format('DD/MM');
                    let label = `Hôm nay - ${labelVi}`;
                    object.label = label;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let labelVi = moment(new Date()).add(i, 'days').locale('en').format('DD/MM');
                    let label = `Today - ${labelVi}`;
                    object.label = label;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDay.push(object);
        }

        return allDay;
    };

    useEffect(() => {
        let allDay = getAllDate();
        setArrDate(allDay);
    }, [props.language]);

    useEffect(async () => {
        let allDay = getAllDate();

        let allDaycheck = allDay && allDay.length > 0 && allDay[0].value;
        let res = await getScheduleByDate(props.doctorId, allDaycheck);
        if (res && res.errCode === 0) {
            setAvailableDate(res.data);
        }
    }, []);

    const handleChangeSchedule = async (e) => {
        console.log('fix', e.target.value);
        let res = await getScheduleByDate(props.doctorId, e.target.value);

        if (res && res.errCode === 0) {
            setAvailableDate(res.data);
        }
    };

    //Modal booking
    const handleOpenModalBooking = (data) => {
        setDoctorId(data.doctorId);
        setDoctorProfile(data);
        setIsOpenModalBooking(true);
    };

    const handleCloseModalBooking = () => {
        setIsOpenModalBooking(false);
    };

    return (
        <>
            <div className="doctor-schedule-container">
                <div className="doctor-schedule-select">
                    <select onChange={(e) => handleChangeSchedule(e)}>
                        {arrDate &&
                            arrDate.length > 0 &&
                            arrDate.map((item) => {
                                return <option value={item.value}>{item.label}</option>;
                            })}
                    </select>
                </div>
                <div className="doctor-schedule-date">
                    <div className="time-calendar">
                        <i class="fas fa-calendar-alt">
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </i>
                    </div>
                    <div className="time-content">
                        {availableDate && availableDate.length > 0 ? (
                            <>
                                <div className="time-list">
                                    {availableDate.map((item) => {
                                        let timeType =
                                            props.language === LANGUAGES.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => handleOpenModalBooking(item)}
                                                className={props.language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                            >
                                                {timeType}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="book-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />{' '}
                                        <i class="far fa-hand-point-up"></i>{' '}
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div>
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalBooking
                doctorId={doctorId}
                isOpenModalBooking={isOpenModalBooking}
                handleCloseModalBooking={handleCloseModalBooking}
                doctorProfile={doctorProfile}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
