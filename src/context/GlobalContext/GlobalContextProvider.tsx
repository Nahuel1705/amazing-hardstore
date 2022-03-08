import {useReducer} from 'react';
import {GlobalContextStateType} from './GlobalContextStateType';
import {GlobalContext} from './GlobalContext';
import {GlobalContextReducer} from './GlobalContextReducer';
import Product from '../../types/ProductType';

const INITIAL_STATE: GlobalContextStateType = {
  productsInCart: 0,
  cartItems: [],
};

type GlobalContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const GlobalContextProvider = ({children}: GlobalContextProviderProps) => {
  const [globalContextState, dispatch] = useReducer(GlobalContextReducer, INITIAL_STATE);

  const contextValue = {
    globalContextState,
    addToCart: (product: Product) => {
      dispatch({type: 'addToCart', payload: product});
    },
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
