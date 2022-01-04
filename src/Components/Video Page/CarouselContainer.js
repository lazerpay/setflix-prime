import React from 'react';
import Styles from '../../Styles/Video Page/carouselcontainer.module.css';
import SwiperComp from '../../Components/User Home/Swiper Carousel/SwiperComp';
import axios from 'axios';
import apiObj from '../../api.config';
import { useParams } from 'react-router-dom';

export default function CarouselContainer() {
     //grab the movie id from the url
     const { movieID } = useParams();

    React.useEffect(() => {
        fetchSimilarMovies();
    }, [movieID])

    //array to hold the list of similar movies
    const [similarMovieArray, setSimilarMovieArray] = React.useState([]);

    //functon to fetch the list of movies similar to the one being played
    function fetchSimilarMovies() {
        axios.get(`${apiObj.baseURL}/movie/${movieID}/similar?api_key=${apiObj.key}&language=en-US`)
        .then(res => {
            setSimilarMovieArray(res.data.results);
        })
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.header}>
                You may also like
            </div>
            <SwiperComp movieArray={similarMovieArray}/>
        </div>
    )
}