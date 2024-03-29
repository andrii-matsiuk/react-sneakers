import React from "react";
import { AppContext } from "../App";

const Info = ({ title, image, description }) => {
    const { setCartOpened } = React.useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="cartImage" />
            <h2>{title}</h2> 
            <p className="opacity-6">{description}</p>
            <button className="greenButton" onClick={() => {setCartOpened(false)}}>
                <img src="img/arrow.svg" alt="arrow" />
                Back to shop
            </button>
        </div>
    )
}

//Cart is empty
//Add at least one pair of sneackers to make the order
///img/empty-cart.jpg 

export default Info;