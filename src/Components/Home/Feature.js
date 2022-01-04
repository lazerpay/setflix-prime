import React from 'react';
import Styles from '../../Styles/Home/feature.module.css';


export default function Feature({ mid, image, header, body }) {
    return (
        <div className={Styles.container} style={{
            flexDirection: window.innerWidth <= 1024 ? "column" : mid && window.innerWidth >= 1024 ? "row-reverse" : "row"

        }}>
            <img className={Styles.image} src={image} alt="Setflix Prime"></img>
            <div className={Styles.content}>
                <div className={Styles.header}>{header}</div>
                <div className={Styles.body}>{body}</div>
            </div>
        </div>
    )
}
