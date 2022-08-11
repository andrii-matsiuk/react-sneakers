import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // // отримання даних методом fetch
    // fetch('https://62d99d305d893b27b2ea75e5.mockapi.io/items')
    // .then((res) => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setItems(json);
    // });

    async function fetchData() {
      setIsLoading(true);
      //отримання товарів доданих в корзину на сервері
      const cartItemsResponse = await axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/cart');
      //отримання товарів доданих у вибране
      const favItemsResponse = await axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/favorites');
      // отримання товарів із сервера через бібліотеку axios 
      const itemsResponse = await axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartItemsResponse.data);
      setFavorites(favItemsResponse.data);
      setItems(itemsResponse.data);
    };

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      // якщо знайшли передайний товар в корзині, повторно не додаємо, а видаляємо
      if (cartItems.find((item) => Number(item.article) === Number(obj.article))) {
        setCartItems((prev) => prev.filter((item) => Number(item.article) !== Number(obj.article)));
        axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/cart/${obj.article}`);
      }
      else {
        //додаємо вибраний товар на бекенд в корзину з допомогою бібліотеки axios
        axios.post('https://62d99d305d893b27b2ea75e5.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]); // аналогія в реакт метода пуш для масиву, коли хочемо додати обєкт в нього
      }
    } catch (error) {
      alert('Coulndt add item to cart');
    }
  }

  const onRemoveItem = (obj) => {
    axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/cart/${obj.id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.article) !== Number(obj.article)));
  }

  const onAddToFavorite = async (obj) => {
    try {
      console.log(obj);
      if (favorites.find((favObj) => Number(favObj.article) === Number(obj.article))) {
        axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.article) !== Number(obj.article)));
        console.log('removed from fav');
      }
      else {
        const { data } = await axios.post('https://62d99d305d893b27b2ea75e5.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
        console.log('added to fav');
      }
    } catch (error) {
      alert('Couldnt add item to favorite');
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (article) => {
    return cartItems.some((obj) => Number(obj.article) === Number(article)); // аналогічно запису added={true}. Метод some вертає true якщо умова виконується, якщо ні - false
  }

  return (
    <AppContext.Provider value={ {items, cartItems,  favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems} }>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites />
        </Route>

      </div>
    </AppContext.Provider>
  )
}

export default App;
