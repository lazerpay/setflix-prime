import React from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/scrollbar/scrollbar.min.css"
import apiObj from '../../../api.config';
import axios from 'axios';
import "./styles.css";


// import Swiper core and required modules
import SwiperCore, {
    Pagination, Navigation, Scrollbar
} from 'swiper/core';


// install Swiper modules
SwiperCore.use([Pagination, Navigation, Scrollbar]);


export default function SwiperComp({ movieArray }) {

    return (
        <>
            <Swiper slidesPerView={2.3} spaceBetween={16} freeMode={true} loop={false} loopFillGroupWithBlank={true}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    "768": {
                        "slidesPerView": 5.3,
                        "spaceBetween": 20
                    },
                    "1024": {
                        "slidesPerView": 6.3,
                        "spaceBetween": 30
                    },
                    "1150": {
                        "slidesPerView": 7.3,
                        "spaceBetween": 7,
                    }
                }}
                className="mySwiper">
                {movieArray.map(item => {
                    //the movie poster url
                    let imageSrc = `${apiObj.imgURL}w500/${item.poster_path}`;

                    //FOR MOBILE DEVICES AND TABLETS
                    let title = "";
                    //the string which holds the name of the movie has been sliced to the first 30 characters
                    if (item.title.length > 30 && window.innerWidth < 768) {
                        title = item.title.slice(0, 31) + " ...";
                    }
                    else {
                        title = item.title;
                    }
                   //this variable stores the url to the video page of a particular movie
                    let url = `/movie/watch/${item.id}`

                    return (
                        <SwiperSlide key={item.id}>
                            <Link to={url}>
                                <img src={imageSrc} alt="Tmdb Pic here"></img>
                            </Link>
                            <p className="name">{title}</p>
                            <p className="date">{item.release_date}</p>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}