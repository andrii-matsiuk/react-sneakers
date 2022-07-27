function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Cart<img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" /></h2>

                {items.length > 0 ?
                    (<div>
                        <div className="items">
                            {items.map((obj) => (
                                <div className="cartItem d-flex align-center mb-20">
                                    <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt="" />
                                    <div className="mr-20">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} USD</b>
                                    </div>
                                    <img className="removeBtn" onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg" alt="remove" />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Summary:</span>
                                    <div></div>
                                    <b>1205 USD</b>
                                </li>
                                <li>
                                    <span>Tax 5%:</span>
                                    <div></div>
                                    <b>205 USD</b>
                                </li>
                            </ul>
                            <button className="greenButton">Order<img src="/img/arrow.svg" alt="arrow" /></button>
                        </div>
                    </div>)
                :
                    (<div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="empty-cart" />
                        <h2>Cart is empty</h2>
                        <p className="opacity-6">Add at least one pair of sneackers to make the order</p>
                        <button className="greenButton" onClick={onClose}>
                            <img src="/img/arrow.svg" alt="arrow" />
                            Back to shop
                        </button>
                    </div>
                    )
                }

            </div>
        </div>
    )
}

export default Drawer;