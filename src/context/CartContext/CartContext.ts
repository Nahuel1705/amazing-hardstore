import {createContext} from 'react';
import {CartContextActions} from './CartContextReducer';
import {CartContextStateType} from './CartContextStateType';

export type CartContextProps = {
  cartState: CartContextStateType;
  cartDispatch: React.Dispatch<CartContextActions>;
};

export const CartContext = createContext<CartContextProps>({} as CartContextProps);
