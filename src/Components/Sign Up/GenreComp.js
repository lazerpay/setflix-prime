import React from 'react';
import Styles from '../../Styles/Sign Up/genrecomp.module.css';

export default function GenreComp({ ref, name, compID, passedArray, clickFunc }) {
    const [checked, setChecked] = React.useState(false);

    const handleClick = (e) => {
        setChecked(!checked);
        e.target.checked = checked;
        if (e.target.checked === false) {
            let clonedArray = [...passedArray]
            clonedArray.push(e.target.id);
            clickFunc(clonedArray);
        }
        else if (e.target.checked === true) {
            let filteredArray = passedArray.filter(elem => elem!==e.target.id);
            clickFunc(filteredArray);
        }
    }

    const cssClickStyles = {
        boxShadow: checked ? "0px 0px 10px 3px rgba(54, 215, 183, 0.5)" : "10px 10px 20px -8px rgba(0, 0, 0, 0.5)",
        background: checked ? "rgba(54, 215, 183, 0.2)" : "rgba(255, 255, 255, 0.1)",
        color: checked ? "rgba(54, 215, 183, 1)" : "rgba(255, 255, 255, 0.5)",
        fontWeight: checked ? "600" : "normal"
    }

    return (
        <div
            className={Styles.container}
            id={compID}
            ref={ref}
            checked={checked}
            onClick={handleClick}
            style={cssClickStyles}>
            {name}
        </div>
    )
}