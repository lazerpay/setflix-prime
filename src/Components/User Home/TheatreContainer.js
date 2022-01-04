import React from 'react';
import Styles from '../../Styles/User Home/theatrecontainer.module.css';
import SwiperComp from './Swiper Carousel/SwiperComp';
import { Link } from 'react-router-dom';

export default function TheatreContainer({ theatreMovies }) {
    const key = 2;

    return (
        <div className={Styles.container}>
            <h2 className={Styles.header}>
                In theatres
            </h2>
            <Link to="/theatre" className={Styles.link}>View all</Link>
            <SwiperComp key={key} movieArray={theatreMovies} />
        </div>
    )
}