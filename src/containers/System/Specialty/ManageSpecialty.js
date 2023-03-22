import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '../../../utils/CommonUtils';
import { toast } from 'react-toastify';

import { createSpecialty } from '../../../services/patientService';

import './ManageSpecialty.scss';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageSpecialty() {
    const [name, setName] = useState('');
    const [imgBase64, setImgBase64] = useState('');
    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [descriptionMarkdown, setDescriptionMarkdown] = useState('');

    const handleUploadFile = async (e) => {
        const [file] = e.target.files;

        if (file) {
            //let url = URL.createObjectURL(file);
            let base64 = await CommonUtils.getBase64(file);

            setImgBase64(base64);
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setDescriptionMarkdown(text);
        setDescriptionHTML(html);
    };

    const handleSaveSpecialty = async () => {
        let data = {
            name,
            imgBase64,
            descriptionMarkdown,
            descriptionHTML,
        };
        let res = await createSpecialty(data);

        if (res && res.errCode === 0) {
            toast.success('Create specialty success');
        } else {
            toast.error('Create specialty failed');
            console.log('check err', res);
        }

        setName('');
        setImgBase64('');
        setDescriptionHTML('');
        setDescriptionMarkdown('');
    };

    return (
        <div className="mangage-specialty-container">
            <div className="ms-title">Quản lí chuyên khoa</div>

            <div className="row">
                <div className="col-6 form-group">
                    <label>Ten chuyen khoa</label>
                    <input
                        value={name}
                        className="form-control"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-6 form-group">
                    <div>Anh chuyen khoa</div>
                    <input className="form-control-file" type="file" onChange={(e) => handleUploadFile(e)} />
                </div>
                <div className="col-12 mt-5">
                    <MdEditor
                        value={descriptionMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </div>
                <div className="col-12">
                    <button className="ms-btn-save" onClick={handleSaveSpecialty}>
                        Save specialty
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageSpecialty;
