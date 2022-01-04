import React from 'react';
import Navbar from './Navbar';
import Styles from '../../Styles/Home/herosection.module.css';
import HeroImage from '../../Assets/HeroImage2 - Android.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HeroSection() {

    return (
        <div className={Styles.container}>
            <Navbar />
            <div className={Styles.subContainer}>
                <img className={Styles.image} src={HeroImage}></img>
                <div className={Styles.content}>
                    <div className={Styles.header}>
                        Welcome to Setflix Prime
                    </div>
                    <div className={Styles.subHeader}>
                        Join Prime to watch award-winning shows and series in 4k and beyond
                    </div>
                    <Link className={Styles.btn} to="/signup">
                        <span><i className="fas fa-play-circle"></i>  </span>
                        Start watching
                    </Link>
                </div>
            </div>
        </div>
    )
}