import React from 'react';
import Styles from '../../Styles/Search/searchpage.module.css';
import Navbar from '../../Components/User Home/Navbar';
import MovieComp from './MovieComp';
import apiObj from '../../api.config';
import axios from 'axios';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';


export default function SearchPage() {
    
    const history = useHistory();
    const [movieArray, setMovieArray] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const [isSearched, setIsSearched] = React.useState(false);
    
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

    const showError = (err) => {
        toast.error(err, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSearched(true);
        if (query.length === 0) {
            showError("Input can't be empty");
            return
        }
        setLoading(true);
        axios.get(`${apiObj.searchURL}?api_key=${apiObj.key}&query=${query}&language=en-US`)
            .then(res => {
                setLoading(false);
                setMovieArray(res.data.results);
            })
    }


    return (
        <div className={Styles.container}>
            <Navbar />
            <ToastContainer />
            <form className={Styles.form} onSubmit={handleSubmit}>
                <input
                    className={Styles.input}
                    placeholder="Enter a movie name..."
                    onChange={e => setQuery(e.target.value)}
                ></input>
                <button className={Styles.btn} style={{
                    pointerEvents: loading ? "none" : "default",
                    opacity: loading ? "0.5" : "1",
                }}> Search </button>
            </form>
            {(movieArray.length === 0 && !loading &&!isSearched) &&
                <div className={Styles.otherContainer}>
                    <h2> Search a movie </h2>
                </div>
            }
            {loading &&
                <div className={Styles.loaderContainer}>
                    <ScaleLoader
                        color={loaderColor}
                        loading={loading}
                        css={override}
                        size={22}
                    ></ScaleLoader>
                </div>
            }
            {(movieArray.length === 0 && !loading &&isSearched) &&
                <div className={Styles.noResContainer}>
                    <h3>No results found for your query</h3>
                    <p>Check your keywords</p>
                </div>
            }
            {(movieArray.length !== 0 && !loading &&isSearched) &&
                <MovieComp movie={movieArray[0]} />
            }
        </div>
    )
}
