import React from 'react';
import Styles from '../../Styles/User Home/navbar2.module.css';
import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';


export default function Navbar2() {
    return (
        <div className={Styles.container}>
            <div className={Styles.left}>
                <Link className={Styles.logo} to="/">
                    Setflix <span>Prime</span>
                </Link>
            </div>

            <div className={Styles.right}>
                <i className="fas fa-search"></i>
                <Hamburger />
                <div className={Styles.linkContainer}>
                <Link to="/search" className={Styles.search}>Search</Link>
                    <Link to="/movies/all">Movies</Link>
                    <Link to="/tv">TV Shows</Link>
                    <Link className={Styles.account} to="/account">
                        <i className="fas fa-user-circle"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}