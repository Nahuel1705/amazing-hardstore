import {GlobalContextStateType} from './GlobalContextStateType';
import Product from '../../types/ProductType';

type GlobalContextActions = {type: 'addToCart'; payload: Product} | {type: 'removeFromCart'; payload: {id: number}};

export const GlobalContextReducer = (
  state: GlobalContextStateType,
  action: GlobalContextActions
): GlobalContextStateType => {
  switch (action.type) {
    case 'addToCart':
      return {
        ...state,
        productsInCart: state.productsInCart + 1,
        cartItems: [...state.cartItems, action.payload],
      };

    case 'removeFromCart':
      return state;

    default:
      return state;
  }
};
