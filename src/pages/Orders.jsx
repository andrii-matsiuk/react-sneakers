import React from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { AppContext } from "../App";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); //окремий параметр для загрузки товарів із "фаворитів"
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://62d99d305d893b27b2ea75e5.mockapi.io/orders');
        const result = data.reduce((prev, obj) => [...prev, ...obj.items], []);
        setOrders(result);
        setIsLoading(false);
      } catch (error) {
        alert('Couldnt load previous orders.');
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Orders</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(4)] : orders).map((item, index) => (
          <Card
            key={index}
            onAddFavorite={(item) => onAddToFavorite(item)}
            loading={isLoading}
            {...item}
          />
        ))
        }
      </div>
    </div>
  )
}

export default Orders;