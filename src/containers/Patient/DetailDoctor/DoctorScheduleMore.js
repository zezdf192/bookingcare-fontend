import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import moment from 'moment';
import './DoctorScheduleMore.scss';
import localization from 'moment/locale/vi';
import NumberFormat from 'react-number-format';

import { getExtraInforDoctorById } from '../../../services/doctorService';

function DoctorScheduleMore(props) {
    const [isShowMore, setIsShowMore] = useState(false);
    const [extraInfor, setExtraInfor] = useState({});

    useEffect(async () => {
        let res = await getExtraInforDoctorById(props.doctorId);
        if (res && res.errCode === 0) {
            setExtraInfor(res.data);
        }
    }, [props.doctorId]);

    console.log('check res', extraInfor);

    return (
        <div className="more-schedule-container">
            <div className="more-infor">
                <div className="title-clinic">
                    <FormattedMessage id="patient.extra-infor.address" />
                </div>
                <div className="specialty">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                <div className="address">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
            </div>

            <div className={isShowMore ? 'price-container colum' : 'price-container'}>
                <span className="price-title">
                    <FormattedMessage id="patient.extra-infor.price" />
                </span>
                {isShowMore ? (
                    <>
                        <div className="content-up">
                            <div className="title-price">
                                <span>
                                    <FormattedMessage id="patient.extra-infor.price" />
                                </span>
                                <span>
                                    {props.language === LANGUAGES.VI ? (
                                        <NumberFormat
                                            value={
                                                extraInfor && extraInfor.priceData ? extraInfor.priceData.valueVi : ''
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    ) : (
                                        <NumberFormat
                                            value={
                                                extraInfor && extraInfor.priceData ? extraInfor.priceData.valueEn : ''
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    )}
                                </span>
                            </div>
                            <div className="description">{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                        </div>
                        <div className="content-down">
                            <FormattedMessage id="patient.extra-infor.payment" />
                            {props.language === LANGUAGES.VI
                                ? extraInfor && extraInfor.paymentData
                                    ? extraInfor.paymentData.valueVi
                                    : ''
                                : extraInfor && extraInfor.paymentData
                                ? extraInfor.paymentData.valueEn
                                : ''}
                        </div>
                        <span className="price-more" onClick={() => setIsShowMore(false)}>
                            <FormattedMessage id="patient.extra-infor.hide-price" />
                        </span>
                    </>
                ) : (
                    <>
                        <span className="price-care">
                            {props.language === LANGUAGES.VI ? (
                                <NumberFormat
                                    value={extraInfor && extraInfor.priceData ? extraInfor.priceData.valueVi : ''}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            ) : (
                                <NumberFormat
                                    value={extraInfor && extraInfor.priceData ? extraInfor.priceData.valueEn : ''}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            )}
                        </span>
                        <span className="price-more" onClick={() => setIsShowMore(true)}>
                            <FormattedMessage id="patient.extra-infor.show-more" />
                        </span>
                    </>
                )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorScheduleMore);
