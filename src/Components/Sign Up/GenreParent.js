import React from 'react';
import Styles from '../../Styles/Sign Up/genreparent.module.css';
import GenreComp from './GenreComp';
import axios from 'axios';
import apiObj from '../../api.config';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Context/AuthProvider';
import db from '../../firebase.config';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


function GenreParent() {
    //VARIABLE ASSIGNMENTS
    const authValue = React.useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();
    //the array which will hold the official list of all available genres fetched from the api
    const [genresList, setGenresList] = React.useState([]);
    //the array which will hold the list of ids of genres picked by the user
    const [genreArray, setGenreArray] = React.useState([]);

    const { isNewUser } = location.state;

    React.useEffect(() => {
        fetchGenresList();
        if (isNewUser) {
            showSuccess();
        }
    }, []);

    const [loading, setLoading] = React.useState(false);
    const [loaderColor, setLoaderColor] = React.useState("#36d7b7");
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;

    window.addEventListener('popstate', () => {
        history.go(1);
    })

    //FUNCTIONS
    //function to fetch the official list of all available genres and update the state variable
    function fetchGenresList() {
        axios.get(`${apiObj.baseURL}/genre/movie/list?api_key=${apiObj.key}&language=en-US`)
            .then(res => {
                setGenresList(res.data.genres);
            })
    }

    const showSuccess = () => {
        toast.success("Account created successfully!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    const showError = () => {
        toast.error("Please pick atleast one genre", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        })
    }

    const showInfo = () => {
        toast.info("Please pick atleast one genre to complete your account setup", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        })
    }

    const handleComplete = () => {
        if (genreArray.length === 0) {
            showError();
        }
        else {
            setLoading(true);
            db.collection('users').doc(`${authValue.currentUser.uid}`).update({
                picks: genreArray,
            }).then(() => {
                setLoading(false);
                if(isNewUser) {
                    history.push("/user");
                }
                else if(!isNewUser) {
                    history.push("/account");
                }
            })
        }
    }

    return (
        <div className={Styles.container}>
            <ToastContainer />
            <div className={Styles.wrapper}>
                <h2 className={Styles.center}>Pick your genres</h2>
                <div className={Styles.genreContainer}>
                    {genresList.map(item => {
                        return (
                            <GenreComp
                                key={item.id}
                                name={item.name}
                                compID={item.id}
                                passedArray={genreArray}
                                clickFunc={(updatedArray) => setGenreArray(updatedArray)}
                            ></GenreComp>
                        )
                    })}
                </div>
                <button className={Styles.btn} onClick={handleComplete} style={{
                    pointerEvents: loading ? "none" : "default",
                    background: loading ? "#fff" : "var(--yellow)",
                }}>
                    {loading && <ClipLoader
                        color={loaderColor}
                        loading={loading}
                        css={override}
                        size={22}
                    ></ClipLoader>}
                    {!loading && "Complete"}
                </button>
            </div>
        </div>
    )
}

export default withRouter(GenreParent);