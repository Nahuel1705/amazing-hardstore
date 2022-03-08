import Product from '../../types/ProductType';
import {CartContextStateType} from './CartContextStateType';

export type CartContextActions =
  | {type: 'START_LOADING_CART'}
  | {type: 'END_LOADING_CART'}
  | {type: 'SET_CART_PRODUCTS'; payload: Product[]}
  | {type: 'START_ADDING_A_PRODUCT'}
  | {type: 'END_ADDING_A_PRODUCT'};

export const CartContextReducer = (state: CartContextStateType, action: CartContextActions): CartContextStateType => {
  switch (action.type) {
    case 'START_LOADING_CART':
      return {...state, isCartLoading: true};
    case 'SET_CART_PRODUCTS':
      return {...state, cartProducts: action.payload, isCartLoading: false};
    case 'END_LOADING_CART':
      return {...state, isCartLoading: false};
    case 'START_ADDING_A_PRODUCT':
      return {...state, isAddingProduct: true};
    case 'END_ADDING_A_PRODUCT':
      return {...state, isAddingProduct: false};
    default:
      return state;
  }
};
