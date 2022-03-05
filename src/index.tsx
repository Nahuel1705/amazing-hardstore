import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App';
import {GlobalContextProvider} from './context/GlobalContext/GlobalContextProvider';
import {AddNewProduct} from './pages/AddProduct';
import {Cart} from './pages/Cart';
import {Home} from './pages/Home';
import {NoMatch} from './pages/NoMatch';
import {Products} from './pages/Products';

ReactDOM.render(
  <GlobalContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="add-new-product" element={<AddNewProduct />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </GlobalContextProvider>,
  document.getElementById('root')
);
