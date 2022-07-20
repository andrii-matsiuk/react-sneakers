function Drawer() {
    return (
        <div style={{ display: 'none' }} className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Cart<img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" /></h2>

                <div className="items">
                    <div className="cartItem d-flex align-center mb-20">
                        <img className="mr-20" width={70} height={70} src="/img/sneakers/1.jpg" alt="" />
                        <div className="mr-20">
                            <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                            <b>1205 USD</b>
                        </div>
                        <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                    </div>
                    <div className="cartItem d-flex align-center mb-20">
                        <img className="mr-20" width={70} height={70} src="/img/sneakers/1.jpg" alt="" />
                        <div className="mr-20">
                            <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                            <b>1205 USD</b>
                        </div>
                        <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                    </div>
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