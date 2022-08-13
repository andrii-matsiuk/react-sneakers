import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from "../hooks/useCart";

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="logo" />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Best sneakers shop</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li className="mr-30 cu-p" onClick={props.onClickCart}>
                    <img width={18} height={18} src="/img/cart.svg" />
                    <span>{totalPrice} USD</span>
                </li>
                <li className="mr-20 cu-p" >
                    <Link to="/favorites">
                        <img width={18} height={18} src="/img/fav.svg" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/img/user.svg" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;