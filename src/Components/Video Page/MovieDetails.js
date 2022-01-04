import React from 'react';
import Styles from '../../Styles/Video Page/moviedetails.module.css';
import axios from 'axios';
import apiObj from '../../api.config';
import { useParams } from 'react-router-dom';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from '../../Context/AuthProvider';
import db from '../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';


export default function MovieDetails() {

    const authValue = React.useContext(AuthContext);
    const [fav, setFav] = React.useState(false);

    //grab the movie id from the url
    const { movieID } = useParams();

    React.useEffect(() => {
        checkFavs();
    }, []);

    React.useEffect(() => {
        fetchMovieDetails();
        fetchCast();
    }, [movieID]);

    //VARIABLE ASSIGNMENTS
    //the object which will hold the movie details 
    const [movieObj, setMovieObj] = React.useState({
        title: "",
        imdb: "",
        plot: "",
        released: "",
        genres: [],
        id: "",
    });
    //the array which will hold the cast of the movie
    const [cast, setCast] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [favLoading, setFavLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [loaderColor, setLoaderColor] = React.useState("#ff0066");
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;

    function checkFavs() {
        let favsArray = [];
        setFavLoading(true);
        db.collection('users').doc(authValue.currentUser.uid).get()
        .then(doc => {
            favsArray = doc.data().favs;
            setFavLoading(false);
            if(favsArray.indexOf(movieID) !== -1) {
                setFav(true);
            }
            else if(favsArray.indexOf(movieID) === -1) {
                setFav(false);
            }
        })
    }

    //function to fetch movie details
    function fetchMovieDetails() {
        try {
            setLoading(true);
            axios.get(`${apiObj.baseURL}/movie/${movieID}?api_key=${apiObj.key}`)
                .then(res => {
                    setLoading(false);
                    //if vote_average = 0, then rating will be considered as N/A
                    let rating = "";
                    if (res.data.vote_average === 0) {
                        rating = "N/A";
                    }
                    else {
                        rating = res.data.vote_average;
                    }

                    setMovieObj({
                        title: res.data.title,
                        imdb: rating,
                        plot: res.data.overview,
                        released: res.data.release_date,
                        genres: res.data.genres,
                        id: res.data.id
                    })
                })
        } catch {
            setError(true);
        }
    }

    //function to fetch the cast of the movie
    function fetchCast() {
        axios.get(`${apiObj.baseURL}/movie/${movieID}/credits?api_key=${apiObj.key}&language=en-US`)
            .then(res => {
                setCast(res.data.cast);
            })
    }

    const showInfo = (msg) => {
        toast.info(msg, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    //function to handle add to favs functionality
    function handleClick() {
        let clonedArray = [];
        db.collection('users').doc(authValue.currentUser.uid).get()
            .then(doc => {
                clonedArray = doc.data().favs;
            })
            .then(() => {
                if (!fav) {
                    showInfo("Added to favorites");
                    clonedArray.push(movieID);
                    db.collection('users').doc(authValue.currentUser.uid).update({
                        favs: clonedArray,
                    })
                }
                else if (fav) {
                    showInfo("Removed from favorites");
                    let filteredArray = clonedArray.filter(elem => elem != movieID)
                    db.collection('users').doc(authValue.currentUser.uid).update({
                        favs: filteredArray,
                    })
                }
            })
        setFav(!fav);
    }


    return (
        <div className={Styles.container}>
            <ToastContainer />
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
                <>
                    <div className={Styles.favBtn} onClick={handleClick}>
                        {favLoading && <ClipLoader
                            color="red"
                            loading={favLoading}
                            css={override}
                            size={22}
                        ></ClipLoader>}
                        {!favLoading &&
                            <>
                                <i
                                    className="fas fa-heart"
                                    style={{
                                        color: "red",
                                        display: fav ? "inline-block" : "none",
                                    }}
                                ></i>
                                <i
                                    className="far fa-heart"
                                    style={{
                                        display: fav ? "none" : "inline-block",
                                    }}
                                ></i>
                            </>
                        }
                    </div>

                    <div className={Styles.movieName}>
                        {movieObj.title}
                    </div>

                    <div className={Styles.imdb}>
                        IMDB: <span> {movieObj.imdb}</span>
                    </div>

                    <div className={Styles.plot}>
                        {movieObj.plot}
                    </div>

                    <div className={Styles.castContainer}>
                        <div className={Styles.castHeader}>
                            Cast:
                        </div>
                        <div className={Styles.castNames}>
                            {cast.map((item, index) => {
                                let data = "";
                                //the name of the last member of the cast should not be followed by a comma since it is the end of the cast list
                                if (index === cast.length - 1) {
                                    data = item.original_name
                                }
                                else {
                                    data = item.original_name + ", "
                                }
                                return (
                                    <span key={index}>{data}</span>
                                )
                            })}
                        </div>
                    </div>

                    <div className={Styles.released}>
                        Released: <span> {movieObj.released}</span>
                    </div>

                    <div className={Styles.genresContainer}>
                        <div className={Styles.genreHeader}>Genres: </div>
                        <div className={Styles.genreNames}>
                            {movieObj.genres.map((item, index) => {
                                let data = "";
                                //the name of the last genre should not be followed by a comma since it is the end of the genre list
                                if (index === movieObj.genres.length - 1) {
                                    data = item.name
                                }
                                else {
                                    data = item.name + ", "
                                }
                                return (
                                    <span key={index}>{data}</span>
                                )
                            })}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
