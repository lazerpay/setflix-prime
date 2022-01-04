import React from 'react';
import Styles from '../Styles/footer.module.css';

export default function Footer() {
    return (
        <div className={Styles.container}>
            <a className={Styles.terms}>Terms of Use</a>
            <a className={Styles.policy}>Privacy Policy</a>
            <a className={Styles.originals}>Setflix Originals</a>
            <a className={Styles.faqs}>FAQs</a>
            <p className={Styles.name}>
                <span><i className="far fa-copyright"></i></span>
                Setflix Prime India 2021
            </p>
        </div>
    )
}
