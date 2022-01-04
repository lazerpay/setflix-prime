import React from 'react';
import Styles from '../../Styles/DisplayAll/allgenre.module.css';
import Navbar from '../User Home/Navbar';
import MovieComponent from './MovieComponent';
import Footer from '../Footer';
import axios from 'axios';
import apiObj from '../../api.config';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link, useHistory } from 'react-router-dom';



export default function AllTrending() {
    
    React.useEffect(() => {
        scrollToTop();
        fetchMovies();
    }, [])
    
    const history = useHistory();
    //VARIABLE ASSIGNMENTS
    //the array which will hold the array of movies
    const [movieArray, setMovieArray] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loaderColor, setLoaderColor] = React.useState("#ff0066");
    //the overriding css for the clip loader
    const override = css`
    display: block;
    margin: 0 auto;
    `;
    window.addEventListener('popstate', () => {
        history.push(-1);
    })
    
    //function to fetch trending movies from the api
    function fetchMovies() {
        for (let i = 0; i < 5; i++) {
            setLoading(true);
            axios.get(`${apiObj.baseURL}/movie/popular?api_key=${apiObj.key}&language=en-US&page=${i + 1}`)
                .then(res => {
                    setLoading(false);
                    res.data.results.map(item => {
                        setMovieArray(prev => [
                            ...prev,
                            item,
                        ])
                    })
                })
        }
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <div className={Styles.container}>
            <Navbar />
            <h2 className={Styles.center}>All Trending</h2>
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
                </div>
            }
            {!loading &&
                <div className={Styles.movieContainer}>
                    {movieArray.map(item => {
                        return <MovieComponent key={item.id} item={item} />
                    })}
                </div>
            }
            <Footer />
        </div>
    )
}