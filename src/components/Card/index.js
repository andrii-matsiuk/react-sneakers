import React from 'react';
import styles from './Card.module.scss';

function Card({id, onPlus, onAddFavorite, title, price, imageUrl, favorited = false}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    
    const onClickPlus = () => {
        onPlus({title, price, imageUrl});
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        onAddFavorite({id, title, price, imageUrl});
        setIsFavorite(!isFavorite);
    }

    React.useEffect(() => {
        
    }, [isAdded]);
    
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img 
                    onClick={onClickFavorite}
                    src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                    alt="unliked"
                />
            </div>
            <img width={133} height={112} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Price:</span>
                    <b>{price} USD</b>
                </div>
                <img 
                    className={styles.plus}
                    onClick={onClickPlus}
                    src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"}
                    alt="plus"
                />
            </div>
        </div>)
}

 export default Card;