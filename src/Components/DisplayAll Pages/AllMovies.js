import React from 'react';
import Navbar from '../User Home/Navbar';
import CarouselContainer from '../User Home/CarouselContainer';
import Footer from '../Footer';
import Styles from '../../Styles/DisplayAll/allmovies.module.css';
import axios from 'axios';
import apiObj from '../../api.config';
import { Link, useHistory } from 'react-router-dom';


export default function AllMovies() {
    
    React.useEffect(() => {
        fetchGenresList();
    }, [])
    
    const history = useHistory();
    //VARIABLE ASSIGNMENTS
    //the array which will hold the official list of all available genres fetched from the api
    const [genresList, setGenresList] = React.useState([]);
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

    return (
        <div className={Styles.container}>
            <Navbar />
            <h2 className={Styles.center}>All Genres</h2>
            {genresList.map(item => {
                return <CarouselContainer key={item.id} genreID={item.id} header={item.name} />
            })}
            <Footer />
        </div>
    )
}
