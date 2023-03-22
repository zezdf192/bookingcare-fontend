import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyPatientByEmail } from '../../../services/patientService';
import HeaderHome from '../../HomePage/HeaderHome/HeaderHome';
import './VerifyEmail.scss';

function VerifyEmail(props) {
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [errCode, serErrcode] = useState();

    useEffect(async () => {
        let params = new URL(document.location).searchParams;
        let token = params.get('token');
        let doctorId = params.get('doctorId');

        let res = await postVerifyPatientByEmail({
            token: token,
            doctorId: doctorId,
        });

        if (res && res.errCode === 0) {
            setVerifyEmail(true);
            serErrcode(res.errCode);
        } else {
            setVerifyEmail(true);
            serErrcode(res.errCode);
        }
    }, []);

    return (
        <>
            <HeaderHome />
            <div className="verify-email-container">
                {verifyEmail === false ? (
                    <div>Loding.....</div>
                ) : (
                    <>
                        {errCode === 0 ? (
                            <div className="verify-email-status">Đặt lịch thành công</div>
                        ) : (
                            <div className="verify-email-status">Đã đặt lịch hoặc không tồn tại lịch hẹn</div>
                        )}
                    </>
                )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
