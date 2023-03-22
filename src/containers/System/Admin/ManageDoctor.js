import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import './ManageDoctor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctor(props) {
    //markdown
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [description, setDescription] = useState('');
    const [markdown, setMarkdown] = useState({});
    const [isEditMarkdown, setIsEditMarkdown] = useState(false);

    //doctor requited
    const [allDoctor, setAllDoctor] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedDefault, setSelectedDefault] = useState();
    const [priceOption, setPriceOption] = useState([]);
    const [paymentOption, setPaymentOption] = useState([]);
    const [provinceOption, setProvinceOption] = useState([]);
    const [specialtyOption, setSpecialtyOption] = useState([]);
    const [clinicOption, setClinicOption] = useState([]);

    //data post backend
    const [specialty, setSpecialty] = useState();
    const [clinic, setClinic] = useState();
    const [price, setPrice] = useState();
    const [payment, setPayment] = useState();
    const [province, setProvince] = useState();
    const [nameClinic, setNameClinic] = useState('');
    const [addressClinic, setAddressClinic] = useState('');
    const [note, setNote] = useState('');

    //call api
    useEffect(() => {
        props.getAllDoctor();
        props.fetchRequitedDoctor();
        handleChangeInputByLanguage();
    }, [props.language]);

    //xu ly chuyen ngon ngu
    const handleChangeInputByLanguage = () => {
        if (markdown.Doctor_infor) {
            let doctorInfor = markdown.Doctor_infor;
            console.log('check doctor', doctorInfor);
            if (doctorInfor.priceData) {
                let priceId = doctorInfor.priceId;
                let labelPrice =
                    props.language === LANGUAGES.VI ? doctorInfor.priceData.valueVi : doctorInfor.priceData.valueEn;

                let price = {
                    value: priceId,
                    label: labelPrice,
                };
                setPrice(price);
            }

            if (doctorInfor.paymentData) {
                let paymentId = doctorInfor.paymentId;
                let labelPayment =
                    props.language === LANGUAGES.VI ? doctorInfor.paymentData.valueVi : doctorInfor.paymentData.valueEn;

                let payment = {
                    value: paymentId,
                    label: labelPayment,
                };

                setPayment(payment);
            }

            if (doctorInfor.provinceData) {
                let provinceId = doctorInfor.provinceId;
                let labelProvince =
                    props.language === LANGUAGES.VI
                        ? doctorInfor.provinceData.valueVi
                        : doctorInfor.provinceData.valueEn;

                let province = {
                    value: provinceId,
                    label: labelProvince,
                };
                setProvince(province);
            }

            if (doctorInfor.specialtyData) {
                let specialtyId = doctorInfor.specialtyData;

                let specialty = {
                    value: specialtyId.id,
                    label: specialtyId.name,
                };
                setSpecialty(specialty);
            }

            setNote(doctorInfor.note);
            setAddressClinic(doctorInfor.addressClinic);
            setNameClinic(doctorInfor.nameClinic);
        }
    };

    //lay du lieu markdown hien thi ra giao dien
    useEffect(() => {
        let markdown1 = markdown.Markdown;
        if (markdown1) {
            setDescription(markdown1.description ? markdown1.description : '');
            setContentMarkdown(markdown1.contentMarkdown ? markdown1.contentMarkdown : '');
            setContentHTML(markdown1.contentHTML ? markdown1.contentHTML : '');
            if (markdown1 && markdown1.contentMarkdown) {
                setIsEditMarkdown(true);
            } else setIsEditMarkdown(false);
        }
        handleChangeInputByLanguage();
    }, [props.markdown]);

    //set state requited doctor
    useEffect(() => {
        let price = buildDataSelect(props.requitedDoctor.resPrice, 'PRICE');
        let payment = buildDataSelect(props.requitedDoctor.resPayment, 'PAYMENT');
        let province = buildDataSelect(props.requitedDoctor.resProvince, 'PROVINCE');
        let specialty = buildDataSelect(props.requitedDoctor.resSpecialty, 'SPECIALTY');
        let clinic = buildDataSelect(props.requitedDoctor.resClinic, 'CLINIC');

        if (price && price.length > 0) {
            setPriceOption(price);
        }
        if (payment && payment.length > 0) {
            setPaymentOption(payment);
        }
        if (province && province.length > 0) {
            setProvinceOption(province);
        }
        if (specialty && specialty.length > 0) {
            setSpecialtyOption(specialty);
        }
        if (clinic && clinic.length > 0) {
            setClinicOption(clinic);
        }
    }, [props.requitedDoctor]);

    useEffect(() => {
        setAllDoctor(props.allDoctor);
        let options = buildDataSelect(props.allDoctor, 'USERS');
        setSelectedOption(options);
    }, [props.allDoctor]);

    const buildDataSelect = (doctorArr, type) => {
        let result = [];
        if (type === 'USERS') {
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
        } else if (type === 'PRICE') {
            if (doctorArr && doctorArr.length > 0) {
                doctorArr.map((item) => {
                    let object = {};
                    let valueVi = item.valueVi;
                    let valueEn = `${item.valueEn} USD`;

                    object.value = item.keyMap;
                    object.label = props.language === LANGUAGES.VI ? valueVi : valueEn;
                    result.push(object);
                });
            }
        } else if (type === 'PAYMENT' || type === 'PROVINCE') {
            if (doctorArr && doctorArr.length > 0) {
                doctorArr.map((item) => {
                    let object = {};
                    let valueVi = item.valueVi;
                    let valueEn = `${item.valueEn}`;

                    object.value = item.keyMap;
                    object.label = props.language === LANGUAGES.VI ? valueVi : valueEn;
                    result.push(object);
                });
            }
        } else if (type === 'SPECIALTY') {
            if (doctorArr && doctorArr.length > 0) {
                doctorArr.map((item) => {
                    let object = {};

                    object.value = item.id;
                    object.label = item.name;
                    result.push(object);
                });
            }
        } else if (type === 'CLINIC') {
            if (doctorArr && doctorArr.length > 0) {
                doctorArr.map((item) => {
                    let object = {};

                    object.value = item.id;
                    object.label = item.name;
                    result.push(object);
                });
            }
        }

        return result;
    };

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleChangeSelect = async (selectedOption) => {
        let data = await props.getMarkdown(selectedOption.value);

        console.log('cehck', data);
        setSelectedDefault(selectedOption);
    };

    const handleChangeSelectRequitedDoctor = (selectedOption, option) => {
        switch (option.name) {
            case 'price':
                setPrice(selectedOption);

                break;
            case 'payment':
                setPayment(selectedOption);

                break;
            case 'province':
                setProvince(selectedOption);

                break;
            case 'specialty':
                setSpecialty(selectedOption);
                break;
            case 'clinic':
                setClinic(selectedOption);
                break;
            default:
            // code block
        }
    };

    if (props.markdown !== markdown) {
        setMarkdown(props.markdown);
    }

    const handleChangeText = (e, type) => {
        switch (type) {
            case 'description':
                setDescription(e.target.value);
                break;
            case 'nameClinic':
                setNameClinic(e.target.value);
                break;
            case 'addressClinic':
                setAddressClinic(e.target.value);
                break;
            case 'note':
                setNote(e.target.value);
                break;
            default:
            // code block
        }
    };

    const handleSaveDoctor = () => {
        // console.log('check props', {
        //     contentHTML: contentHTML,
        //     contentMarkdown: contentMarkdown,
        //     description: description,
        //     doctorId: selectedDefault && selectedDefault.value,
        //     price: price && price.value,
        //     payment: payment && payment.value,
        //     province: province && province.value,
        //     nameClinic: nameClinic,
        //     addressClinic: addressClinic,
        //     note: note,
        //     clinic: clinic && clinic.value ? clinic.value : '',
        //     specialty: specialty && specialty.value,
        // });

        if (isEditMarkdown) {
            props.editMarkdown({
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: description,
                doctorId: selectedDefault && selectedDefault.value,
                price: price && price.value,
                payment: payment && payment.value,
                province: province && province.value,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                clinic: clinic && clinic.value ? clinic.value : -1,
                specialty: specialty && specialty.value,
            });

            setContentHTML('');
            setDescription('');
            setContentMarkdown('');
            setSelectedDefault('');
            setPrice('');
            setPayment('');
            setProvince('');
            setNameClinic('');
            setAddressClinic('');
            setNote('');
            setSpecialty('');
            setClinic('');
        } else {
            props.saveInfoDoctorDetail({
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: description,
                doctorId: selectedDefault && selectedDefault.value,
                price: price && price.value,
                payment: payment && payment.value,
                province: province && province.value,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                clinic: clinic && clinic.value ? clinic.value : -1,
                specialty: specialty && specialty.value,
            });

            setContentHTML('');
            setDescription('');
            setContentMarkdown('');
            setSelectedDefault('');
            setPrice('');
            setPayment('');
            setProvince('');
            setNameClinic('');
            setAddressClinic('');
            setNote('');
        }
        setIsEditMarkdown(false);
    };

    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title">
                <FormattedMessage id="manage-doctor.title" />
            </div>
            <div className="manage-doctor-content">
                <div className="content-left">
                    <label>
                        <FormattedMessage id="manage-doctor.choose-doctor" />
                    </label>
                    <Select value={selectedDefault} onChange={handleChangeSelect} options={selectedOption} />
                </div>
                <div className="content-right">
                    <label>
                        <FormattedMessage id="manage-doctor.description" />
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => handleChangeText(e, 'description')}
                        className="form-control"
                    ></textarea>
                </div>
            </div>
            <div className="more-content row">
                <div className="col-4 form-group content-item">
                    <label>
                        <FormattedMessage id="manage-doctor.price" />
                    </label>
                    <Select
                        placeholder={<FormattedMessage id="manage-doctor.price" />}
                        value={price}
                        onChange={handleChangeSelectRequitedDoctor}
                        name="price"
                        options={priceOption}
                    />
                </div>
                <div className="col-4 form-group content-item">
                    <label>
                        <FormattedMessage id="manage-doctor.payment" />
                    </label>
                    <Select
                        value={payment}
                        onChange={handleChangeSelectRequitedDoctor}
                        placeholder={<FormattedMessage id="manage-doctor.payment" />}
                        options={paymentOption}
                        name="payment"
                    />
                </div>
                <div className="col-4 form-group content-item">
                    <label>
                        <FormattedMessage id="manage-doctor.province" />
                    </label>
                    <Select
                        value={province}
                        onChange={handleChangeSelectRequitedDoctor}
                        placeholder={<FormattedMessage id="manage-doctor.province" />}
                        options={provinceOption}
                        name="province"
                    />
                </div>
                <div className="col-4 form-group content-item">
                    <label>
                        <FormattedMessage id="manage-doctor.nameClinic" />
                    </label>
                    <input
                        className="form-control"
                        value={nameClinic}
                        onChange={(e) => handleChangeText(e, 'nameClinic')}
                    />
                </div>
                <div className="col-4 form-group content-item">
                    <label>
                        <FormattedMessage id="manage-doctor.addressClinic" />
                    </label>
                    <input
                        className="form-control"
                        value={addressClinic}
                        onChange={(e) => handleChangeText(e, 'addressClinic')}
                    />
                </div>
                <div className="col-4 form-group content-item">
                    <label>
                        <FormattedMessage id="manage-doctor.note" />
                    </label>
                    <input className="form-control" value={note} onChange={(e) => handleChangeText(e, 'note')} />
                </div>

                <div className="col-4 form-group content-item">
                    <label>
                        chuyen khoa
                        {/* <FormattedMessage id="manage-doctor.note" /> */}
                    </label>
                    <Select
                        value={specialty}
                        onChange={handleChangeSelectRequitedDoctor}
                        //placeholder={<FormattedMessage id="manage-doctor.province" />}
                        options={specialtyOption}
                        name="specialty"
                    />
                </div>
                <div className="col-4 form-group content-item">
                    <label>
                        phong kham
                        {/* <FormattedMessage id="manage-doctor.note" /> */}
                    </label>
                    <Select
                        value={clinic}
                        onChange={handleChangeSelectRequitedDoctor}
                        //placeholder={<FormattedMessage id="manage-doctor.province" />}
                        options={clinicOption}
                        name="clinic"
                    />
                </div>
            </div>

            <div className="manage-doctor-markdown">
                <MdEditor
                    value={contentMarkdown}
                    style={{ height: '300px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
            <button
                className={isEditMarkdown ? 'save-manage-doctor' : 'save-manage-doctor edit'}
                onClick={handleSaveDoctor}
            >
                {isEditMarkdown ? 'Edit doctor' : 'Save doctor'}
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctor: state.doctor.allDoctor,
        markdown: state.doctor.markdown,
        requitedDoctor: state.doctor.requitedDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDoctorDetail: (data) => dispatch(actions.saveInfoDoctor(data)),
        getMarkdown: (id) => dispatch(actions.getMarkdown(id)),
        editMarkdown: (data) => dispatch(actions.editMarkdown(data)),
        fetchRequitedDoctor: () => dispatch(actions.fetchRequitedDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
