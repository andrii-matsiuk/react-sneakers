function Drawer({onClose, items=[]}) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Cart<img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" /></h2>

                <div className="items">
                    {items.map((obj) => (
                        <div className="cartItem d-flex align-center mb-20">
                            <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt="" />
                            <div className="mr-20">
                                <p className="mb-5">{obj.title}</p>
                                <b>{obj.price} USD</b>
                            </div>
                            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
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
            </div>
        </div>
    )
}

export default Drawer;