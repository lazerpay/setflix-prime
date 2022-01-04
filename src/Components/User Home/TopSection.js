import React, { useEffect, useState } from 'react';
import Styles from '../../Styles/User Home/topsection.module.css';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiObj from '../../api.config';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";


export default function TopSection() {

    useEffect(() => {
        fetchTop();
    }, [])

    const [poster, setPoster] = useState("");
    const [backdrop, setBackdrop] = useState("");
    const [movieURL, setMovieURL] = useState("");
    const [movieObj, setMovieObj] = useState({
        title: "",
        plot: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [loaderColor, setLoaderColor] = React.useState("#ff0066");
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;

    // Fetch the WATCH NOW movie
    const fetchTop = () => {
        try {
            setLoading(true);
            //select a random page
            let randomPage = Math.floor(Math.random() * 50) + 1;
            axios.get(`${apiObj.baseURL}/movie/popular?api_key=${apiObj.key}&language=en-US&page=${randomPage}`)
                .then(res => {
                    setLoading(false);
                    //store the result in an array (a single array contains a list of 20 movies)
                    let moviesArray = res.data.results;
                    //select a random movie from the list of 20 movies and store it in "movie" variable
                    let randomIndex = Math.floor(Math.random() * moviesArray.length);
                    let movie = moviesArray[randomIndex];
                    //The URL for directing the user to the particular movie he clicks
                    let url = `/movie/watch/${movie.id}`;
                    setMovieURL(url);

                    //The URL of the movie poster
                    let imageSrcMobile = `${apiObj.imgURL}w500/${movie.poster_path}`;
                    setPoster(imageSrcMobile);

                    //The URL of the movie backdrop
                    let imageSrcDesktop = `${apiObj.imgURL}original/${movie.backdrop_path}`;
                    setBackdrop(imageSrcDesktop);

                    //Store the details of the movie in the movieObj state variable
                    let title = ""
                    if(movie.title.length > 50) {
                        title = movie.title + "..."
                    }
                    else{
                        title = movie.title;
                    }

                    let plot = ""
                    if(movie.overview.length > 400) {
                        plot = movie.overview.slice(0, 401) + "..."
                    }
                    else{
                        plot = movie.overview
                    }
                    setMovieObj({
                        title: title,
                        plot: plot,
                    })
                })
        } catch {
            console.log("Failed to fetch data");
        }
    }

    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.mobileContainer}>
                    <Navbar />
                    <h2 className={Styles.header}>watch now</h2>

                    <div className={Styles.imageContainer}>
                        {loading &&
                            <div className={Styles.loaderContainer}>
                                <ScaleLoader
                                    color={loaderColor}
                                    loading={loading}
                                    css={override}
                                    height={60}
                                    width={10}
                                    radius={3}
                                ></ScaleLoader>
                            </div>}
                        {!loading &&
                            <Link to={movieURL}>
                                <img className={Styles.image} src={poster} alt="We got Image"></img>
                            </Link>
                        }
                    </div>
                </div>

                <div className={Styles.desktopContainer}>
                    <Navbar2 />
                    {loading &&
                        <div className={Styles.loaderContainer}>
                            <ScaleLoader
                                color={loaderColor}
                                loading={loading}
                                css={override}
                                height={60}
                                width={10}
                                radius={3}
                            ></ScaleLoader>
                        </div>}
                    {!loading &&
                        <img src={backdrop} alt="Backdrop here" className={Styles.backdrop}></img>
                    }
                    <div className={Styles.overlay}>
                        <div className={Styles.details}>
                            <h1 className={Styles.name}>
                                {movieObj.title}
                            </h1>
                            <p className={Styles.plot}>
                                {movieObj.plot}
                            </p>
                            <Link className={Styles.btn} to={movieURL}>
                                <i className="fas fa-play"></i>
                                Watch Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
