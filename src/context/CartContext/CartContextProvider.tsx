import {useReducer} from 'react';
import {CartContext, CartContextProps} from './CartContext';
import {CartContextReducer} from './CartContextReducer';
import {CartContextStateType} from './CartContextStateType';

const INITIAL_STATE: CartContextStateType = {
  isCartLoading: false,
  isAddingProduct: false,
  cartProducts: [],
};

type CartContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const CartContextProvider = ({children}: CartContextProviderProps) => {
  const [cartState, dispatch] = useReducer(CartContextReducer, INITIAL_STATE);

  const cartContext: CartContextProps = {
    cartState,
    cartDispatch: dispatch,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};
