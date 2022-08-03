import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // // отримання даних методом fetch
    // fetch('https://62d99d305d893b27b2ea75e5.mockapi.io/items')
    // .then((res) => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setItems(json);
    // });

    // отримання товарів із сервера через бібліотеку axios
    axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/items').then(res => {
      setItems(res.data);
    });
    
    //отримання товарів доданих в корзину на сервері
    axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    });

    //отримання товарів доданих у вибране
    axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/favorites').then(res => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    // пошук елемента в масиві вже доданих в корзину
    if (cartItems.find(item => item.title === obj.title)) {
      //додаємо вибраний товар на бекенд в корзину з допомогою бібліотеки axios
      axios.post('https://62d99d305d893b27b2ea75e5.mockapi.io/cart', obj);
      /////
      setCartItems((prev) => [...prev, obj]); // аналогія в реакт метода пуш для масиву, коли хочемо додати обєкт в нього    
    }
    else {
      setCartItems(cartItems.filter(p => p.title !== obj.title));
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
   try { 
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/favorites/${obj.id}`);  
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    }
    else {
      const {data} = await axios.post('https://62d99d305d893b27b2ea75e5.mockapi.io/favorites', obj);
      setFavorites((prev) => [...prev, data]);
    }
   } catch (error) {
     alert('Couldnt add item to favorite');
   }
  }

  const onChangeSearchInput = (event) => {
    //console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

      <Header onClickCart={() => setCartOpened(true)} />
      
      <Route path="/" exact>
        <Home 
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>

      
    </div>
  )
}

export default App;
