import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import './ManageSchedule.scss';

import { createBulkScheduleDoctor } from '../../../services/doctorService';

function ManageSchedule(props) {
    const [selectedDefault, setSelectedDefault] = useState('');
    const [selectedOption, setSelectedOption] = useState([]);
    const [allDoctor, setAllDoctor] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rangeTime, setRangeTime] = useState([]);

    useEffect(() => {
        props.getAllDoctor();
    }, [props.language]);

    useEffect(() => {
        props.getScheDuleTimes();
    }, []);

    useEffect(() => {
        if (rangeTime !== props.scheduleTimes) {
            let data = props.scheduleTimes;
            if (data && data.length > 0) {
                data.map((item) => {
                    item.isSelect = false;
                    return item;
                });
            }

            setRangeTime(data);
        }
    }, [props.scheduleTimes]);

    const buildDataSelect = (doctorArr) => {
        let result = [];
        if (doctorArr && doctorArr.length > 0) {
            doctorArr.map((item) => {
                let object = {};
                let valueVi = `${item.lastName} ${item.firstName}`;
                let valueEn = `${item.firstName} ${item.lastName}`;

                object.value = item.id;
                object.label = props.language === LANGUAGES.VI ? valueVi : valueEn;
                result.push(object);
            });
        }

        return result;
    };

    if (allDoctor !== props.allDoctor) {
        setAllDoctor(props.allDoctor);
        let options = buildDataSelect(props.allDoctor);
        setSelectedOption(options);
    }

    const handleChangeSelect = (selectedOption) => {
        setSelectedDefault(selectedOption);
    };

    const handleChangeDate = (date) => {
        setCurrentDate(date);
    };

    const handleChangeRangeTime = (time) => {
        let data = [...rangeTime];
        if (data && data.length > 0) {
            data.map((item) => {
                if (item.id === time.id) {
                    item.isSelect = !item.isSelect;
                }
                return item;
            });

            setRangeTime(data);
        }
    };

    const handleSaveSchedule = async () => {
        let result = [];
        //Chuyển thời gian chỉ lấy ngày tháng năm
        let date = currentDate;
        let newdate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();

        let momentTime = new Date(newdate).getTime();

        if (!selectedDefault) {
            toast.error('Missing doctor');
        } else if (rangeTime && rangeTime.length > 0) {
            let data = rangeTime.filter((item) => item.isSelect === true);
            if (data && data.length > 0) {
                data.forEach((time) => {
                    time.isSelect = false;
                    let object = {};
                    object.doctorId = selectedDefault.value;
                    object.date = momentTime;
                    object.timeType = time.keyMap;
                    result.push(object);
                });
                toast.success('Save times success');

                //Call api
                await createBulkScheduleDoctor({
                    schedule: result,
                    doctorId: selectedDefault.value,
                    time: momentTime,
                });

                setSelectedDefault('');
                setCurrentDate(new Date());
            } else {
                toast.error('Missing times');
            }
        }

        //console.log('finally result', result);
    };

    return (
        <div className="container manage-schedule-container">
            <div className="manage-schedule-title">Manage schedule</div>
            <div className="">
                <div className="row">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="manage-schedule.choose-doctor" />
                        </label>
                        <Select value={selectedDefault} onChange={handleChangeSelect} options={selectedOption} />
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="manage-schedule.choose-date" />
                        </label>
                        <DatePicker
                            className="form-control"
                            onChange={handleChangeDate}
                            selected={currentDate}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-12 schedule-time-container">
                        {rangeTime &&
                            rangeTime.length > 0 &&
                            rangeTime.map((item) => {
                                return (
                                    <button
                                        className={item.isSelect ? 'schedule-time-item active' : 'schedule-time-item'}
                                        onClick={() => handleChangeRangeTime(item)}
                                    >
                                        {props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="col-12">
                        <button className="save-schedule" onClick={handleSaveSchedule}>
                            <FormattedMessage id="manage-schedule.save-schedule" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctor: state.doctor.allDoctor,
        markdown: state.doctor.markdown,
        scheduleTimes: state.doctor.scheduleTimes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getScheDuleTimes: () => dispatch(actions.fetchScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
