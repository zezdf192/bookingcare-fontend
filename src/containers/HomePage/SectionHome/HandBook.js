import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import './SectionHome.scss';

function HandBook({ settings }) {
    return (
        <div className="section-container section-handbook">
            <div className="section-content ">
                <div className="section-header">
                    <h2 className="section-title">Cẩm nang</h2>
                    <button className="section-btn">XEM THÊM</button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        <div className="section-child handbook-img">
                            <div className="section-img "></div>
                            <div className="section-title">Cơ xương khớp 1</div>
                        </div>
                        <div className="section-child handbook-img">
                            <div className="section-img "></div>
                            <div className="section-title">Cơ xương khớp 2</div>
                        </div>
                        <div className="section-child handbook-img">
                            <div className="section-img "></div>
                            <div className="section-title">Cơ xương khớp 3</div>
                        </div>
                        <div className="section-child handbook-img">
                            <div className="section-img "></div>
                            <div className="section-title">Cơ xương khớp 4</div>
                        </div>
                        <div className="section-child handbook-img">
                            <div className="section-img "></div>
                            <div className="section-title">Cơ xương khớp 5</div>
                        </div>
                        <div className="section-child handbook-img">
                            <div className="section-img "></div>
                            <div className="section-title">Cơ xương khớp 6</div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
