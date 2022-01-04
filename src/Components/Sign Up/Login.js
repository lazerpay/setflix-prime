import React from 'react';
import Styles from '../../Styles/Sign Up/login.module.css';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const authValue = React.useContext(AuthContext);
    const history = useHistory();

    const [userObject, setUserObject] = React.useState({
        useremail: "",
        password: "",
    })
    const [loading, setLoading] = React.useState(false);
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

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await authValue.login(userObject.useremail, userObject.password)
            history.push("/user");
        }
        catch {
            let error = "Failed to log in"
            showError(error);
        }
        setUserObject({
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
                        Log into your account
                    </div>

                    <form className={Styles.form} onSubmit={handleSubmit}>

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
                            }}>
                        </input>

                        <button type="submit" className={Styles.btn} style={{
                            pointerEvents: loading ? "none" : "default",
                            background: loading ? "#fff" : "var(--yellow)",
                        }}>
                            {loading && <ClipLoader
                                color={loaderColor}
                                loading={loading}
                                css={override}
                                size={20}
                            ></ClipLoader>}
                            {!loading && "Log in"}
                        </button>

                        <div className={Styles.signupLink}>
                            New User?
                            <span>
                                <Link to="/signup">Sign up</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);