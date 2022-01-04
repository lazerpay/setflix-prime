import React from 'react';
import Styles from '../../Styles/Sign Up/signup.module.css';
import { AuthContext } from '../../Context/AuthProvider';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from '../../firebase.config';


export default function Signup() {
    const authValue = React.useContext(AuthContext);
    const history = useHistory();

    //the user object holds all info about the user
    const [userObject, setUserObject] = React.useState({
        username: "",
        useremail: "",
        password: "",
    })

    const [loading, setLoading] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState("Account created successfully");
    const [loaderColor, setLoaderColor] = React.useState("#36d7b7");
    //the overriding css for the clip loader
    const override = css`
        display: block;
        margin: 0 auto;
    `;

    window.addEventListener('popstate', () => {
        history.push("/");
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

    //async function to handle submit form
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await authValue.signup(userObject.useremail, userObject.password)
                .then(user => {
                    user.user.updateProfile({
                        displayName: userObject.username
                    })
                    db.collection('users').doc(`${user.user.uid}`).set({
                        picks: [],
                        favs: [],
                    })
                })
            history.push({
                pathname: "/choice",
                state: {
                    isNewUser: true,
                }
            });
        }
        catch {
            let error = ""
            if (userObject.password.length < 6) {
                error = "Password must be at least 6 characters"
            }
            else {
                error = "Failed to create your account"
            }
            showError(error);
        }
        setUserObject({
            username: "",
            useremail: "",
            password: "",
        })
        setLoading(false);
    }

    return (

        <div className={Styles.wrapper}>
            <ToastContainer />
            <div className={Styles.container}>
                <Link to="/" className={Styles.logo}>
                    Setflix <span>Prime</span>
                </Link>
                <div className={Styles.formContainer}>
                    <div className={Styles.center}>
                        Sign Up to join Prime
                    </div>

                    <form className={Styles.form} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className={Styles.input}
                            placeholder="Username"
                            value={userObject.username}
                            required
                            onChange={e => {
                                if (e.target.value.indexOf(' ') >= 0) {
                                    showError("Username can't contain spaces");
                                    e.target.value = ""
                                }
                                setUserObject(prev => ({
                                    ...prev,
                                    username: e.target.value,
                                }))
                            }}>
                        </input>

                        <input
                            type="email"
                            className={Styles.input}
                            placeholder="Email"
                            value={userObject.useremail}
                            required
                            onChange={e => {
                                setUserObject(prev => ({
                                    ...prev,
                                    useremail: e.target.value,
                                }))
                            }}>
                        </input>

                        <input
                            type="password"
                            className={Styles.input}
                            placeholder="Password"
                            value={userObject.password}
                            required
                            onChange={e => {
                                setUserObject(prev => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }}
                            onFocus={() => showInfo("Password must be at least 6 characters")}
                        >
                        </input>

                        <button type="submit" className={Styles.btn} style={{
                            pointerEvents: loading ? "none" : "default",
                            background: loading ? "#fff" : "var(--yellow)",
                        }}>
                            {loading && <ClipLoader
                                color={loaderColor}
                                loading={loading}
                                css={override}
                                size={22}
                            ></ClipLoader>}
                            {!loading && "Sign Up"}
                        </button>

                        <div className={Styles.loginLink}>
                            Already have an account?
                            <span>
                                <Link to="/login">Log in</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
