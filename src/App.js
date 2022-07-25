import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://62d99d305d893b27b2ea75e5.mockapi.io/items')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setItems(json);
    });
  }, []);

  const onAddToCart = (obj) => {
    // пошук елемента в масиві вже доданих в корзину
    let itemFound = cartItems.find(item => item.title === obj.title);
    //console.log(cartItems.find(item => item.title === obj.title));
    if (itemFound===undefined) {
      setCartItems(prev => [... prev, obj]); // аналогія в реакт метода пуш для масиву, коли хочемо додати обєкт в нього    
    }
    else {
      setCartItems(cartItems.filter(p => p.title !== itemFound.title));
    }
  }

  const onChangeSearchInput = (event) => {
    //console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} /> }
       
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
