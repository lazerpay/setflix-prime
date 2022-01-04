import React from 'react';
import Styles from '../../Styles/Account/account.module.css';
import { AuthContext } from '../../Context/AuthProvider';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from '../../firebase.config';
import axios from 'axios';
import apiObj from '../../api.config';


export default function Account() {

    React.useEffect(() => {
        fetchGenresList();
        fetchUserGenres();
        scrollToTop();
    }, [])

    const [username, setUsername] = React.useState("");
    const [error, setError] = React.useState("");
    const authValue = React.useContext(AuthContext);
    const [loadingUpdate, setLoadingUpdate] = React.useState(false);
    const [loadingLogout, setLoadingLogout] = React.useState(false);
    const history = useHistory();
    const [loaderColor, setLoaderColor] = React.useState("#36d7b7");
    //the array which will hold the official list of all available genres fetched from the api
    const [genresList, setGenresList] = React.useState([]);
    //the array which will hold the list of genres picked by the user
    const [userGenres, setUserGenres] = React.useState([]);
    const genreNames = [];
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;

    window.addEventListener('popstate', () => {
        history.push(-1);
    })

    //FUNCTIONS
    //function to fetch the official list of all available genres and update the state variable
    function fetchGenresList() {
        axios.get(`${apiObj.baseURL}/genre/movie/list?api_key=${apiObj.key}&language=en-US`)
            .then(res => {
                setGenresList(res.data.genres);
            })
    }

    //function to fetch the list of user-picked genres from the db
    function fetchUserGenres() {
        db.collection("users").doc(`${authValue.currentUser.uid}`).get()
            .then(res => {
                setUserGenres(res.data().picks);
            })
    }

    userGenres.forEach(item => {
        let current = item;
        genresList.forEach(item => {
            if (current == item.id) {
                genreNames.push(item.name);
            }
        })
    })

    const showSuccess = (msg) => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

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

    const showWarning = (msg) => {
        toast.warning(msg, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    function handleUpdate() {
        if (username === "") {
            showWarning("No changes were made");
            return
        }
        try {
            setLoadingUpdate(true);
            authValue.currentUser.updateProfile({
                displayName: username
            }).then(res => {
                setLoadingUpdate(false);
                showSuccess("Updated successfully");
            })
        } catch {
            setError("Failed to update");
        }
    }

    function handleLogout() {
        try {
            setLoadingLogout(true);
            authValue.logout()
                .then(res => {
                    setLoadingLogout(false);
                    history.push("/login");
                })
        } catch {
            showError("Failed to log out");
        }
    }

    return (
        <div className={Styles.wrapper}>
            <ToastContainer />
            <div className={Styles.container}>
                <Link to="/" className={Styles.logo}>
                    Setflix <span>Prime</span>
                </Link>
                <div className={Styles.nameContainer}>
                    <div className={Styles.center}>
                        Your Account
                    </div>
                    <input
                        type="text"
                        defaultValue={authValue.currentUser.displayName}
                        className={Styles.input}
                        onChange={e => {
                            if (e.target.value.indexOf(' ') >= 0) {
                                showError("Username can't contain spaces")
                                e.target.value = authValue.currentUser.displayName
                                return
                            }
                            setUsername(e.target.value)
                        }}
                    >
                    </input>
                    <button
                        className={Styles.btn}
                        onClick={handleUpdate}
                        style={{
                            pointerEvents: loadingUpdate ? "none" : "default",
                            background: loadingUpdate ? "#fff" : "var(--yellow)",
                        }}
                    >
                        {loadingUpdate && <ClipLoader
                            color={loaderColor}
                            loading={loadingUpdate}
                            css={override}
                            size={22}
                        ></ClipLoader>}
                        {!loadingUpdate && "Update Username"}
                    </button>
                </div>
            </div>

            <div className={Styles.container}>
                <div className={Styles.center}>
                    Your Picks
                </div>
                <div className={Styles.picksContainer}>
                    {genreNames.map((item, index) => {
                        return <p key={index} className={Styles.genre}>{item}</p>
                    })}
                </div>
                <Link
                    to={{
                        pathname: "/choice",
                        state: {
                            isNewUser: false,
                        }
                    }}
                    className={Styles.btn}
                >
                    Edit your picks
                </Link>
                <Link to="/user/favs" className={Styles.favLink}>
                    <span><i className="fas fa-heart" style={{
                        color: "red",
                    }}></i></span>
                    View your favorite movies list
                </Link>
            </div>

            <div className={Styles.container}>
                <p className={Styles.centerPara}>
                    You are currently logged in with :
                    <span>{authValue.currentUser.email}</span>
                </p>
                <button
                    className={Styles.redBtn}
                    onClick={handleLogout}
                >
                    {loadingLogout && <ClipLoader
                        color={loaderColor}
                        loading={loadingLogout}
                        css={override}
                        size={22}
                    ></ClipLoader>}
                    {!loadingLogout && "Logout"}
                </button>
            </div>
        </div>
    )
}