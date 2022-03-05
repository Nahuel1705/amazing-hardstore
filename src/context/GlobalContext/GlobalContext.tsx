import {createContext} from 'react';
import {GlobalContextState} from '../../types/GlobalContext';
import Product from '../../types/ProductType';

export type GlobalContextProps = {
  globalContextState: GlobalContextState;
  addToCart: (product: Product) => void;
};

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);
