import {useReducer} from 'react';
import {GlobalContextState} from '../../types/GlobalContext';
import {GlobalContext} from './GlobalContext';
import {GlobalContextReducer} from './GlobalContextReducer';
import Product from '../../types/ProductType';

const INITIAL_STATE: GlobalContextState = {
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
