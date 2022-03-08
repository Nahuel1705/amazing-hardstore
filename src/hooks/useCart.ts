import {useContext} from 'react';
import {CartContext} from '../context/CartContext/CartContext';
import {cartClient} from '../services/cartClient';
import Product from '../types/ProductType';

export const useCart = () => {
  const {cartState, cartDispatch} = useContext(CartContext);

  const fetchCartData = async () => {
    cartDispatch({type: 'START_LOADING_CART'});
    try {
      const response = await cartClient.getCartItems();
      if (response.status !== 200) {
        console.error(`ERROR\n\tRequest filed with status code ${response.status}: ${response.statusText}`);
        cartDispatch({type: 'END_LOADING_CART'});
      } else {
        cartDispatch({type: 'SET_CART_PRODUCTS', payload: response.data as Product[]});
      }
    } catch (error) {
      console.error('UNEXPECTED ERROR\n\tRequest filed due to', error);
      cartDispatch({type: 'END_LOADING_CART'});
    }
  };

  const addToCart = async (product: Product) => {
    cartDispatch({type: 'START_ADDING_A_PRODUCT'});
    try {
      const response = await cartClient.postCartItem(product);
      if (response.status !== 200) {
        console.error(`ERROR:\n\tRequest filed with status code ${response.status}: ${response.statusText}`);
        cartDispatch({type: 'END_ADDING_A_PRODUCT'});
      } else {
        cartDispatch({type: 'SET_CART_PRODUCTS', payload: response.data as Product[]});
      }
    } catch (error) {
      console.error('UNEXPECTED ERROR:\n\t, error');
      cartDispatch({type: 'END_ADDING_A_PRODUCT'});
    }
  };

  return {
    ...cartState,
    productsInCart: cartState.cartProducts.length,
    addToCart,
    fetchCartData,
  };
};
