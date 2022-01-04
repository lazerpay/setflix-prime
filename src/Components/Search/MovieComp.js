import React from 'react';
import Styles from '../../Styles/Search/moviecomp.module.css';
import Poster from '../../Assets/TopSection Image.jpg';
import { Link } from 'react-router-dom';
import apiObj from '../../api.config';

export default function MovieComp({ movie }) {

    const url = `/movie/watch/${movie.id}`;
    const posterSrc = `${apiObj.imgURL}w500/${movie.poster_path}`

    return (
        <div className={Styles.container}>
            <h2 className={Styles.center}>Results</h2>
            <div className={Styles.movieDetailsContainer}>
                <div className={Styles.posterContainer}>
                    <Link to={url} className={Styles.link}>
                        <img src={posterSrc} alt="Poster Image" className={Styles.poster}></img>
                    </Link>
                </div>

                <div className={Styles.detailsContainer}>
                    <h2 className={Styles.title}>{movie.title}</h2>
                    <p className={Styles.date}>{movie.release_date}</p>
                    <Link to={url} className={Styles.desktopLink}>
                        Watch now
                    </Link>
                </div>
            </div>
        </div>
    )
}
