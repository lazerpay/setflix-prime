import React from 'react';
import Styles from '../../Styles/Home/featuresection.module.css';
import Feature from './Feature';
import Anywhere from '../../Assets/anywhere.png';
import Entertainment from '../../Assets/entertainment.png';
import Offline from '../../Assets/offline.png';
import { Link } from 'react-router-dom';

export default function FeatureSection() {
    const isMid = true;

    return (
        <div className={Styles.container}>
            <Feature
                mid={!isMid}
                image={Anywhere}
                header="Watch on multiple devices"
                body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
            />
            <Feature
                mid={isMid}
                image={Entertainment}
                header="Great Entertainment"
                body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
            />
            <Feature
                mid={!isMid}
                image={Offline}
                header="Download and watch offline"
                body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
            />
            <Link className={Styles.btn} to="/signup">Get Started</Link>
        </div>
    )
}
