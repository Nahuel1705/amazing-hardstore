import {Link, Outlet} from 'react-router-dom';

import {MdSearch} from 'react-icons/md';
import {IoMdCart} from 'react-icons/io';

import './assets/styles/App.css';
import {useCart} from './hooks/useCart';
import {useEffect} from 'react';

function App() {
  const {productsInCart, isAddingProduct, fetchCartData} = useCart();
  console.log('render app');

  useEffect(() => {
    if (!isAddingProduct) {
      //if has finished adding the product
      fetchCartData(); //get the updated cart data
    }
  }, [isAddingProduct]);

  return (
    <>
      <header className="header">
        <Link to="/" className="logo-container">
          Amazing
          <br />
          Hardstore
        </Link>
        <form className="nav-bar-search" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Search..." />
          <button>
            <MdSearch />
          </button>
        </form>
        <Link to="/cart" className="shopping-cart">
          <span className="products-counter">{productsInCart}</span>
          <IoMdCart />
        </Link>
      </header>
      <Link to="/products" className="goto-button">
        Go to: "products"
      </Link>
      <main className="main-section">
        <Outlet />
      </main>
      <footer className="footer-section">Made By: Nahuel Moreno</footer>
    </>
  );
}

export default App;
