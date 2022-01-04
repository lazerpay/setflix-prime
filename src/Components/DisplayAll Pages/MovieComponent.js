import React from 'react';
import Styles from '../../Styles/DisplayAll/moviecomponent.module.css';
import { Link } from 'react-router-dom';
import apiObj from '../../api.config';

export default function MovieComponent({ item }) {
    //the movie poster url
    let imageSrc = `${apiObj.imgURL}w500/${item.poster_path}`;
    //the url for the video page
    let movieURL = `/movie/watch/${item.id}`;

    let title = "";
    //if the title of the movie is more than 20 chars long, shorten it
    if(item.title.length > 20) {
        title = item.title.slice(0, 21) + " ...";
    }else{
        title = item.title;
    }

    return (
        <div className={Styles.container}>
            <Link to={movieURL}>
                <img className={Styles.image} src={imageSrc} alt="poster-image"></img>
            </Link>
            <div className={Styles.detailsContainer}>
                <h3 className={Styles.title}>{title}</h3>
                <p className={Styles.date}>{item.release_date}</p>
            </div>
        </div>
    )
}
