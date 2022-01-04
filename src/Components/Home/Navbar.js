import React from 'react';
import Styles from '../../Styles/Home/navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className={Styles.container}>
            <div className={Styles.logo}>
                Setflix <span>Prime</span>
            </div>
            <Link className={Styles.link} to="/signup">
                Sign Up
            </Link>
        </div>
    )
}
