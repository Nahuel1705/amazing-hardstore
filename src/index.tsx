import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App';
import {CartContextProvider} from './context/CartContext/CartContextProvider';
import {Cart} from './pages/Cart';
import {CreateProduct} from './pages/CreateProduct';
import {Home} from './pages/Home';
import {NoMatch} from './pages/NoMatch';
import {Products} from './pages/Products';

ReactDOM.render(
  <CartContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CartContextProvider>,
  document.getElementById('root')
);
