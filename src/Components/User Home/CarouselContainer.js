import React from 'react';
import Styles from '../../Styles/User Home/carouselcontainer.module.css';
import SwiperComp from './Swiper Carousel/SwiperComp';
import axios from 'axios';
import apiObj from '../../api.config';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link } from 'react-router-dom';


export default function CarouselContainer({ genreID, header }) {
    React.useEffect(() => {
        fetchGenreMovies();
    }, []);

    //VARIABLE ASSIGNMENTS
    //the array which will hold the list of movie data belonging to a particular genre
    const [movieArray, setMovieArray] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [loaderColor, setLoaderColor] = React.useState("#ff0066");
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;
    //the variable containing the url for "view all" page
    const viewAllURL = `/movies/all/${genreID}`

    //FUNCTIONS
    //function to fetch the list of movies belonging to a particular genre(page:1)
    function fetchGenreMovies() {
        try {
            setLoading(true);
            axios.get(`${apiObj.discoverURL}&with_genres=${genreID}`)
                .then(res => {
                    setLoading(false);
                    setMovieArray(res.data.results);
                })
        } catch {
            setError(true);
        }
    }

    return (
        <div className={Styles.container}>
            <h2 className={Styles.header}>
                {header}
            </h2>
            <Link
                to={{
                    pathname: viewAllURL,
                    state: {
                        header,
                    }
                }}
                className={Styles.link}
            >
                View all
            </Link>
            {loading &&
                <div className={Styles.loaderContainer}>
                    <ScaleLoader
                        color={loaderColor}
                        loading={loading}
                        css={override}
                        height={40}
                        width={10}
                        radius={3}
                    ></ScaleLoader>
                </div>}
            {!loading && <SwiperComp key={genreID} movieArray={movieArray} />}
        </div>
    )
}
