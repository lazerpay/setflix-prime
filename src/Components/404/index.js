import React from 'react';
import Styles from '../../Styles/404/error.module.css';
import lottie from 'lottie-web';
import { Link, useHistory } from 'react-router-dom';

export default function ErrorIndex() {

    const animeContainer = React.useRef(null);
    const history = useHistory();

    window.addEventListener('popstate', () => {
        history.push(-1);
    })

    React.useEffect(() => {
        lottie.loadAnimation({
            container: animeContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../404lottie.json'),
        })
    }, [])

    return (
        <div className={Styles.container}>
            <div className={Styles.animeContainer} ref={animeContainer}></div>
            <Link to="/" className={Styles.center}>Go home</Link>
        </div>
    )
}
