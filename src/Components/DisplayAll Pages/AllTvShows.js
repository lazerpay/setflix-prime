import React from 'react';
import Styles from '../../Styles/DisplayAll/alltvshows.module.css';
import Navbar from '../User Home/Navbar';
import lottie from 'lottie-web';
import { Link, useHistory } from 'react-router-dom';



export default function AllTvShows() {
    const animeContainer = React.useRef(null);
    const history = useHistory();
    
    React.useEffect(() => {
        lottie.loadAnimation({
            container: animeContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../lottie.json'),
        })
    }, [])
    
    window.addEventListener('popstate', () => {
        history.push(-1);
    })
    
    return (
        <>
            <Navbar />
            <div className={Styles.animeContainer} ref={animeContainer}></div>
            <h1 className={Styles.center}>Coming Soon!</h1>
        </>
    )
}
