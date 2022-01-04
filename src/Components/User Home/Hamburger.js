import React, { useState } from 'react';
import Styles from '../../Styles/User Home/hamburger.module.css';
import { Link } from 'react-router-dom';


export default function Hamburger() {
    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(true);
    }

    function handleHideShow() {
        setShow(false);
    }

    return (
        <div className={Styles.container}>
            <i className="fas fa-bars" onClick={handleShow}></i>
            <div className={Styles.menu} style={{
                "display": show ? "flex" : "none"
            }}>
                <i className="fas fa-times" onClick={handleHideShow}></i>
                <Link to="/movies/all" className={Styles.link}>Movies</Link>
                <Link to="/tv" className={Styles.link}>TV Shows</Link>
                <Link to="/account" className={Styles.link}>Account</Link>
            </div>
        </div>
    )
}
