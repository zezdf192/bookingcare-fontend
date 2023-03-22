import React from 'react';
import { connect } from 'react-redux';
import HeaderHome from './HeaderHome/HeaderHome';
import BannerHome from './BannerHome/BannerHome';
import Specialty from './SectionHome/Specialty';
import MedicalFacility from './SectionHome/MedicalFacility';
import OutstandingDoctor from './SectionHome/OutstandingDoctor';
import About from './SectionHome/About';
import HandBook from './SectionHome/HandBook';
import FooterHome from './FooterHome/FooterHome';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './HomePage.scss';

function HomePage() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 4,
    };
    return (
        <div>
            <HeaderHome />
            <BannerHome />
            <Specialty settings={settings} />
            <MedicalFacility settings={settings} />
            <OutstandingDoctor settings={settings} />
            <HandBook settings={settings} />
            <About />
            <FooterHome />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
