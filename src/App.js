import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [{title:'Мужские Кроссовки Nike Blazer Mid Suede', price:199, imageUrl: '/img/sneakers/1.jpg'},
            {title:'Мужские Кроссовки Nike Air Max 270', price:189, imageUrl: '/img/sneakers/2.jpg'},
            ];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer/> 
      
      <Header/>

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." />
          </div>
        </div>
        <div className="d-flex">
          {
            arr.map(
              (obj)=>(
                <Card 
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  onClick={()=>console.log(obj)}/>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App;
