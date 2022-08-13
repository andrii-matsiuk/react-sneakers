import Info from "../Info";
import React from "react";

import axios from "axios";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Drawer({ onClose, onRemove, opened, items = [] }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoadingCart, setIsLoadingCart] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoadingCart(true);
            const { data } = await axios.post('https://62d99d305d893b27b2ea75e5.mockapi.io/orders', {items: cartItems});
            
            setOrderId(data.id);
            setIsOrderComplete(true);
            
            // в циклі видаляємо елементи із корзини на бекенді, із паузою. Метод forEach не дозволяє використовувати паузу 
            for (let i=0; i<cartItems.length; i++) {
                const element = cartItems[i];
                await axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/cart/${element.id}`);
                await delay(1000);
            }


            setCartItems([]);
        } catch (error) {
            alert('Couldnt create an order. Please try again later.');
        }
        setIsLoadingCart(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''} `}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">Cart<img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="remove" /></h2>

                {items.length > 0 ?
                    (<div className="d-flex flex-column flex">
                        <div className={styles.items}>
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt="" />
                                    <div className="mr-20">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} USD</b>
                                    </div>
                                    <img className="removeBtn" onClick={() => onRemove(obj)} src="img/btn-remove.svg" alt="remove" />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Summary:</span>
                                    <div></div>
                                    <b>{totalPrice} USD</b>
                                </li>
                                <li>
                                    <span>Tax 5%:</span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} USD</b>
                                </li>
                            </ul>
                            <button disabled={isLoadingCart} onClick={onClickOrder} className="greenButton">Order<img src="img/arrow.svg" alt="arrow" /></button>
                        </div>
                    </div>)
                    :
                    (
                        <Info
                            title={isOrderComplete ? "Your order has been sent!" : "Cart is empty"}
                            description={isOrderComplete ? `Your order #${orderId} will be get by post office` : "Add at least one pair of sneackers to make the order"}
                            image={isOrderComplete ? "img/complete-order.png" : "img/empty-cart.jpg"}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default Drawer;