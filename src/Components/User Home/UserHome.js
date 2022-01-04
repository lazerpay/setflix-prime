import React from 'react';
import Styles from '../../Styles/User Home/userhome.module.css';
import TopSection from './TopSection';
import CarouselContainer from './CarouselContainer';
import TrendingContainer from './TrendingContainer';
import TheatreContainer from './TheatreContainer';
import Footer from '../../Components/Footer';
import axios from 'axios';
import apiObj from '../../api.config';
import { AuthContext } from '../../Context/AuthProvider';
import db from '../../firebase.config';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";


export default function UserHome() {
    React.useEffect(() => {
        scrollToTop();
        fetchUserGenres();
        fetchGenresList();
        fetchTrending();
        fetchTheatre();

        return
    }, []);

    //VARIABLE ASSIGNMENTS
    const authValue = React.useContext(AuthContext);
    //the array which will hold the official list of all available genres fetched from the api
    const [genresList, setGenresList] = React.useState([]);
    //the array which holds the list of ids of the genres picked by the user
    const [genreArray, setGenreArray] = React.useState([]);
    //the array which will contain the list of trending movies
    const [trendingArray, setTrendingArray] = React.useState([]);
    //the array which will contain the list of movies playing in theatres
    const [theatreArray, setTheatreArray] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loaderColor, setLoaderColor] = React.useState("#ff0066");
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;
    //the array which will hold the list of genre names, which is passed down to the carousel container array as headers for each container element. eg: "Action", "Comedy"      
    const genres = [];

    //FUNCTIONS
    //function to fetch the official list of all available genres and update the state variable
    function fetchGenresList() {
        axios.get(`${apiObj.baseURL}/genre/movie/list?api_key=${apiObj.key}&language=en-US`)
            .then(res => {
                setGenresList(res.data.genres);
            })
    }

    //function to fetch the array of genres picked by the user, from firebase
    function fetchUserGenres() {
        db.collection('users').doc(authValue.currentUser.uid).get()
            .then(doc => {
                setGenreArray(doc.data().picks);
            })
    }

    //function to fetch trending movies from the api
    function fetchTrending() {
        setLoading(true);
        try {
            axios.get(`${apiObj.baseURL}/movie/popular?api_key=${apiObj.key}&language=en-US&page=1`)
                .then(res => {
                    setLoading(false);
                    setTrendingArray(res.data.results);
                })
        } catch {
            console.log("Failed to fetch data");
        }
    }

    //function to fetch movies playing in theatres from the api
    function fetchTheatre() {
        setLoading(true);
        try {
            axios.get(`${apiObj.baseURL}/movie/now_playing?api_key=${apiObj.key}&language=en-US&page=1`)
                .then(res => {
                    setLoading(false);
                    setTheatreArray(res.data.results);
                })
        } catch {
            console.log("Failed to fetch data");
        }
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    //match the ids contained in the genreArray with the genre ids fetched from the api. When found a match, push the name of the genre (which will act as the header of the carousel container) into the genres array 
    genreArray.forEach(item => {
        let id = item;
        genresList.forEach(item => {
            if (item.id == id) {
                genres.push(item.name);
            }
        })
    })

    return (
        <>
            <div className={Styles.container}>
                <TopSection />
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
                {!loading && <TrendingContainer trendingMovies={trendingArray} />}
                {!loading && <TheatreContainer theatreMovies={theatreArray} />}
                {genreArray.map((item, index) => {
                    return (
                        <CarouselContainer
                            key={index}
                            header={genres[index]}
                            genreID={item}
                        />)
                })}
                <Footer />
            </div>
        </>
    )
}
