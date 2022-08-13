import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

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
      try {
        setIsLoading(true);
        
        //
        const [ cartItemsResponse, favItemsResponse, itemsResponse ] = await Promise.all([
          axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/cart'),
          axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/favorites'),
          axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/items')
        ]);

        // // отримання даних по чезрі кожним із запитів
        // //отримання товарів доданих в корзину на сервері
        // const cartItemsResponse = await axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/cart');
        // //отримання товарів доданих у вибране
        // const favItemsResponse = await axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/favorites');
        // // отримання товарів із сервера через бібліотеку axios 
        // const itemsResponse = await axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/items');

        setIsLoading(false);

        setCartItems(cartItemsResponse.data);
        setFavorites(favItemsResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Error while loading start page. Try again later.');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    try {
      // якщо знайшли передайний товар в корзині, повторно не додаємо, а видаляємо
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/cart/${findItem.id}`);
      }
      else {
        //додаємо вибраний товар на бекенд в корзину з допомогою бібліотеки axios
        const { data } = await axios.post('https://62d99d305d893b27b2ea75e5.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, data]); // аналогія в реакт метода пуш для масиву, коли хочемо додати обєкт в нього
      }
    } catch (error) {
      alert('Coulndt add/remove item to/from cart');
      console.error(error);
    }
  }

  const onRemoveItem = async (obj) => {
    try {
      await axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } catch (error) {
      alert('Couldnt remove item from cart. Try again later.');
      console.error(error);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      console.log(obj);
      if (favorites.find((favObj) => Number(favObj.article) === Number(obj.article))) {
        await axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/favorites/${obj.id}`);
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
      console.error(error);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id)); // аналогічно запису added={true}. Метод some вертає true якщо умова виконується, якщо ні - false
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="" exact>
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

        <Route path="favorites" exact>
          <Favorites />
        </Route>

        <Route path="orders" exact>
          <Orders />
        </Route>

      </div>
    </AppContext.Provider>
  )
}

export default App;
