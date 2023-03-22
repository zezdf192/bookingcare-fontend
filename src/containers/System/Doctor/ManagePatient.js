import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/doctorService';

import './ManagePatient.scss';

import { createBulkScheduleDoctor } from '../../../services/doctorService';
import ModalRemedy from './ModalRemedy';

import LoadingOverlay from 'react-loading-overlay';
function ManagePatient(props) {
    const [date, setDate] = useState(new Date());
    const [listPatient, setListPatient] = useState([]);

    //child
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        let timestamp = moment(new Date()).startOf('day').valueOf();
        let res = await getAllPatientForDoctor(props.user.id && props.user.id, timestamp);
        if (res && res.errCode === 0) {
            setListPatient(res.data);
        }
    }, []);

    const handleChangeDate = async (date) => {
        setDate(date);
        let timestamp = moment(new Date(date)).startOf('day').valueOf();

        let res = await getAllPatientForDoctor(props.user.id && props.user.id, timestamp);
        if (res && res.errCode === 0) {
            setListPatient(res.data);
        }
    };
    //console.log('check data', listPatient);

    const handleConfirm = (data) => {
        let dataModal = {
            doctorId: data.doctorId,
            patientId: data.patientId,
            email: data.patientData.email,
            name: data.patientData.firstName,
            timeType: data.timeType,
        };
        setDataModal(dataModal);
        setIsOpenModal(true);
    };
    //console.log('check data', dataModal);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const handleSendRemedy = async (data) => {
        setIsLoading(true);
        let res = await postSendRemedy({
            email: data.email,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            imgBase64: data.imgBase64,
            name: dataModal.name,
            timeType: dataModal.timeType,
        });

        if (res && res.errCode === 0) {
            setIsLoading(false);
            toast.success('Success');
            let timestamp = moment(new Date(date)).startOf('day').valueOf();
            let res = await getAllPatientForDoctor(props.user.id && props.user.id, timestamp);
            if (res && res.errCode === 0) {
                setListPatient(res.data);
            }
        } else {
            setIsLoading(false);
            toast.error('error');
        }

        handleCloseModal();
    };
    console.log(isLoading);
    return (
        <>
            <div className="manage-patient-container">
                <div className="mp-title">Quản lý bệnh nhân khám bệnh</div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chon ngay</label>
                        <DatePicker className="form-control" onChange={handleChangeDate} selected={date} />
                    </div>
                    <div className="col-12 mt-4">
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listPatient && listPatient.length > 0 ? (
                                    listPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypePatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button onClick={() => handleConfirm(item)} className="mp-confirm">
                                                        Xác nhận
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>no data</tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalRemedy
                handleSendRemedy={handleSendRemedy}
                isOpenModal={isOpenModal}
                handleCloseModal={handleCloseModal}
                dataModal={dataModal}
            />
            <LoadingOverlay active={isLoading} spinner text="Loading..."></LoadingOverlay>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
