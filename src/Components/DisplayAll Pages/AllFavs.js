import React from 'react';
import Styles from '../../Styles/DisplayAll/allfavs.module.css';
import Navbar from '../User Home/Navbar';
import MovieComponent from './MovieComponent';
import Footer from '../Footer';
import { AuthContext } from '../../Context/AuthProvider';
import { css } from "@emotion/react";
import { Link, useHistory } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";
import db from '../../firebase.config';
import axios from 'axios';
import apiObj from '../../api.config';

export default function AllFavs() {

    React.useEffect(() => {
        scrollToTop();
        fetchFavs();
    }, [])

    const authValue = React.useContext(AuthContext);
    const history = useHistory();
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

    let favArray = [];

    //function to fetch the favorite movie IDs of the user from the db, and then the movies corresponding to that IDs from the api
    function fetchFavs() {
        setLoading(true);
        db.collection('users').doc(authValue.currentUser.uid).get()
            .then(doc => {
                setLoading(false);
                favArray = doc.data().favs;
                favArray.forEach(item => {
                    axios.get(`${apiObj.baseURL}/movie/${item}?api_key=${apiObj.key}`)
                        .then(res => {
                            setMovieArray(prev => [
                                ...prev,
                                res.data,
                            ])

                        })
                })
            })
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <div className={Styles.container}>
            <Navbar />
            <h2 className={Styles.center}>Your favorites</h2>
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
            {(!loading && movieArray.length === 0) &&
                <div className={Styles.noFavContainer}>
                    <h2>You have no favorite movies yet</h2>
                    <Link to="/movies/all" className={Styles.link}>
                        Browse movies
                    </Link>
                </div>
            }
            {(!loading && movieArray.length !== 0) &&
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
