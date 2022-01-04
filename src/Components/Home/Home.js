import React from 'react';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import Footer from '../../Components/Footer';
import Styles from '../../Styles/Home/home.module.css';

export default function Home() {
    return (
        <div className={Styles.container}>
            <HeroSection />
            <FeatureSection />
            <Footer />
        </div>
    )
}
