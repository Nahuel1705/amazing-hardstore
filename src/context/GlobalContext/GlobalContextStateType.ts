import Product from '../../types/ProductType';

export type GlobalContextStateType = {
  productsInCart: number;
  cartItems: Product[];
};
