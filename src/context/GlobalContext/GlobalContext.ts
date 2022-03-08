import {createContext} from 'react';
import {GlobalContextStateType} from './GlobalContextStateType';
import Product from '../../types/ProductType';

// Actually I don't need this context and is not
// been provided to the app, however I decide
// to keep it in case that I need it later in other features
export type GlobalContextProps = {
  globalContextState: GlobalContextStateType;
  addToCart: (product: Product) => void;
};

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);
