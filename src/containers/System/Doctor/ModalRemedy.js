import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';

import { toast } from 'react-toastify';
import CommonUtils from '../../../utils/CommonUtils';

import './ModalRemedy.scss';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalRemedy(props) {
    const { isOpenModal, handleCloseModal, dataModal, handleSendRemedy } = props;

    const [email, setEmail] = useState('');
    const [imgBase64, setImgBase64] = useState();

    useEffect(() => {
        setEmail(dataModal.email && dataModal.email);
    }, [dataModal]);

    const handleUploadFile = async (e) => {
        const [file] = e.target.files;

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setImgBase64(base64);
        }
    };

    return (
        <Modal isOpen={isOpenModal} size="md" centered toggle={handleCloseModal} className={props.className}>
            <ModalHeader toggle={handleCloseModal}>Gửi hóa đơn cho bệnh nhân</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6 form-group">
                        <label>Email benh nhan</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Hoa don</label>
                        <input onChange={(e) => handleUploadFile(e)} type="file" />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className="px-2" onClick={() => handleSendRemedy({ email, imgBase64 })}>
                    Send
                </Button>{' '}
                <Button color="secondary" className="px-2" onClick={handleCloseModal}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemedy);
