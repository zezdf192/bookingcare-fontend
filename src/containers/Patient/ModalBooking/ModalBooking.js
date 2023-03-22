import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './ModalBooking.scss';
import DoctorProfile from '../DoctorProfile/DoctorProfile';
import { postCreatePatient } from '../../../services/patientService';
import moment from 'moment';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalBooking(props) {
    const [doctorId, setDoctorId] = useState('');
    const [genderOption, setGenderOption] = useState([]);

    const [selectedGender, setSelectedGender] = useState();
    const [birthDate, setBirthDate] = useState(new Date());

    //api
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        props.getGenders();
    }, []);

    useEffect(() => {
        if (props.doctorId) {
            setDoctorId(props.doctorId);
        }
    }, [props.doctorId]);

    useEffect(() => {
        let gender = buileGenders();
        if (gender && gender.length > 0) {
            setGenderOption(gender);
        }
    }, [props.genders]);

    useEffect(() => {
        let gender = buileGenders();
        if (gender && gender.length > 0) {
            setGenderOption(gender);
        }
    }, [props.language]);

    const buileGenders = () => {
        let result = [];
        if (props.genders && props.genders.length > 0) {
            props.genders.forEach((item) => {
                let object = {};
                object.label = props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
            setSelectedGender();
        }

        return result;
    };

    const handleChangeSelect = (selectedOption) => {
        setSelectedGender(selectedOption);
    };

    const handleChangeDate = (date) => {
        setBirthDate(date);
    };
    // console.log('check data', props.doctorProfile);

    const buildTimeBooking = () => {
        let doctorDate = props.doctorProfile;

        let time =
            doctorDate && doctorDate.date && doctorDate.timeTypeData && props.language === LANGUAGES.VI
                ? doctorDate.timeTypeData.valueVi
                : doctorDate.timeTypeData.valueEn;

        let date =
            props.language === LANGUAGES.VI
                ? moment(new Date(doctorDate.date)).format('dddd - DD/MM/YYYY')
                : moment(new Date(doctorDate.date)).locale('en').format('ddd - MM/DD/YYYY');

        return `${time} - ${date}`;
    };

    const buildDoctorName = () => {
        let doctorDate = props.doctorProfile;
        let name = '';
        if (doctorDate) {
            name =
                doctorDate && doctorDate.doctorData && props.language === LANGUAGES.VI
                    ? `${doctorDate.doctorData.lastName} ${doctorDate.doctorData.firstName}`
                    : `${doctorDate.doctorData.firstName} ${doctorDate.doctorData.lastName}`;
        }

        return name;
    };

    const handleConfirm = async () => {
        //!data.email || !data.doctorId || !data.date || !data.timeType

        let date = new Date(props.doctorProfile && props.doctorProfile.date).getTime();
        let timeString = buildTimeBooking();
        let doctorName = buildDoctorName();

        let data = {
            email: email,
            doctorId: doctorId,
            timeType: props.doctorProfile.timeType,
            date: date,
            gender: selectedGender && selectedGender.value,
            birthDate: new Date(birthDate && birthDate).getTime(),
            name: fullName,
            phoneNumber: phoneNumber,
            address: address,
            reason: reason,
            language: props.language,
            timeString: timeString,
            doctorName: doctorName,
        };

        let res = await postCreatePatient(data);

        if (res && res.errCode === 0) {
            toast.success('Save patient booking success');
            props.handleCloseModalBooking();

            setSelectedGender();
            setBirthDate(new Date());

            setFullName('');
            setPhoneNumber('');
            setAddress('');
            setEmail('');
            setReason('');
        } else {
            toast.error('Save patient booking failed');
        }

        // console.log('check state', data);
    };

    return (
        <Modal
            size="lg"
            toggle={props.handleCloseModalBooking}
            centered
            isOpen={props.isOpenModalBooking}
            className="modal-booking"
        >
            <div className="modal-booking-container">
                <div className="modal-booking-header">
                    <span className="modal-booking-title">
                        <FormattedMessage id="patient.booking-modal.title" />
                    </span>
                    <span className="modal-booking-close" onClick={props.handleCloseModalBooking}>
                        <i class="fas fa-times"></i>
                    </span>
                </div>
                <div className="modal-booking-body">
                    <div className="doctor-infor">
                        <DoctorProfile
                            isShowPrice={true}
                            isShowMore={false}
                            doctorDate={props.doctorProfile}
                            isShowDescription={false}
                            doctorId={doctorId}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6 form-group mt-3">
                            <label>
                                <FormattedMessage id="patient.booking-modal.name" />
                            </label>
                            <input
                                className="form-control"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label>
                                <FormattedMessage id="patient.booking-modal.phone-number" />
                            </label>
                            <input
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label>
                                <FormattedMessage id="patient.booking-modal.email" />
                            </label>
                            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label>
                                <FormattedMessage id="patient.booking-modal.address" />
                            </label>
                            <input
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="col-12 form-group mt-3">
                            <label>
                                <FormattedMessage id="patient.booking-modal.reason" />
                            </label>
                            <input
                                className="form-control"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label>
                                <FormattedMessage id="patient.booking-modal.gender" />
                            </label>

                            <Select value={selectedGender} onChange={handleChangeSelect} options={genderOption} />
                        </div>
                        <div className="col-6 form-group mt-3">
                            <label>
                                <FormattedMessage id="patient.booking-modal.birth-date" />
                            </label>
                            <DatePicker
                                className="form-control"
                                onChange={handleChangeDate}
                                selected={birthDate}
                                //minDate={new Date()}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-booking-footer">
                    <button className="save-booking" onClick={handleConfirm}>
                        <FormattedMessage id="patient.booking-modal.save-btn" />
                    </button>
                    <button className="cancle-booking" onClick={props.handleCloseModalBooking}>
                        <FormattedMessage id="patient.booking-modal.cancle" />
                    </button>
                </div>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.gender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
