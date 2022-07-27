import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
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
  }, []);

  const onAddToCart = (obj) => {
    // пошук елемента в масиві вже доданих в корзину
    let itemFound = cartItems.find(item => item.title === obj.title);
    
    if (itemFound===undefined) {
      //додаємо вибраний товар на бекенд в корзину з допомогою бібліотеки axios
      axios.post('https://62d99d305d893b27b2ea75e5.mockapi.io/cart', obj);
      /////
      setCartItems(prev => [... prev, obj]); // аналогія в реакт метода пуш для масиву, коли хочемо додати обєкт в нього    
    }
    else {
      setCartItems(cartItems.filter(p => p.title !== itemFound.title));
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62d99d305d893b27b2ea75e5.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id)); 
  }

  const onChangeSearchInput = (event) => {
    //console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveItem} /> }
       
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Search: "${searchValue}"` : 'All sneakers'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {
            items
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index)=>(
                <Card
                  key={index} 
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onClickFavorite={()=>console.log('add to fav')}
                  onPlus={(obj) => onAddToCart(obj)}
                />
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App;
