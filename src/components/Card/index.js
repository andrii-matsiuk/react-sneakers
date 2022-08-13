import React, { useState } from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import { AppContext } from '../../App';

function Card({
    article, 
    id,
    onPlus, 
    onAddFavorite, 
    title, 
    price, 
    imageUrl, 
    favorited = false, 
    loading = false,
}) {
    const obj = { article, id, parentId: id, title, price, imageUrl };

    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus(obj);
    }

    const onClickFavorite = () => {
        onAddFavorite({ article, id, title, price, imageUrl });
        setIsFavorite(!isFavorite);
    }


    return (
        <div className={styles.card}>
            {
                loading ? (<ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 250"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="9" ry="9" width="150" height="90" />
                    <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="122" rx="5" ry="5" width="80" height="15" />
                    <rect x="0" y="158" rx="5" ry="5" width="80" height="25" />
                    <rect x="116" y="150" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
                ) : (
                    // фрагмент в Реакт для того щоб не створювати додатковий елемент div
                    <> 
                        <div className={styles.favorite}>
                            <img
                                onClick={onClickFavorite}
                                src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                                alt="unliked"
                            />
                        </div>
                        <img width='100%' height={135} src={imageUrl} alt="sneakers" />
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Price:</span>
                                <b>{price} USD</b>
                            </div>
                            {onPlus && <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"}
                                alt="plus"
                            />}
                        </div>
                    </>
                    )
            }

        </div>)
}

export default Card;