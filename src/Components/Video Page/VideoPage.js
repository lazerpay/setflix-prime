import React from 'react';
import Styles from '../../Styles/Video Page/videopage.module.css';
import Navbar from '../../Components/User Home/Navbar';
import VideoComp from './VideoComp';
import MovieDetails from './MovieDetails';
import CarouselContainer from './CarouselContainer';
import Footer from '../../Components/Footer';
import { useParams, useHistory } from 'react-router-dom';


export default function VideoPage() {
    //grab the movie id from the url
    const { movieID } = useParams();
    const history = useHistory();


    React.useEffect(() => {
        scrollToTop();
    }, [movieID]);

    window.addEventListener('popstate', () => {
        history.push(-1);
    })

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <div className={Styles.container}>
            <Navbar />
            <VideoComp />
            <MovieDetails />
            <CarouselContainer />
            <Footer />
        </div>
    )
}