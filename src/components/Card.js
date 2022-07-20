function Card() {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart-unliked.svg" alt="unliked" />
            </div>
            <img width={133} height={112} src="/img/sneakers/1.jpg" alt="sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Price:</span>
                    <b>199 USD</b>
                </div>
                <button className="button">
                    <img width={11} height={11} src="/img/add.svg" />
                </button>
            </div>
        </div>)
}

 export default Card;