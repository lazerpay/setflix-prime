import React from 'react';
import Styles from '../../Styles/User Home/trendingcontainer.module.css';
import SwiperComp from './Swiper Carousel/SwiperComp';
import { Link } from 'react-router-dom';


export default function TrendingContainer({ trendingMovies }) {
    const key = 1;

    return (
        <div className={Styles.container}>
            <h2 className={Styles.header}>
                Trending
            </h2>
            <Link to="/trending" className={Styles.link}>View all</Link>
            <SwiperComp key={key} movieArray={trendingMovies} />
        </div>
    )
}
