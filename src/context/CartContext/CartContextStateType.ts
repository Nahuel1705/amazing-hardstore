import Product from '../../types/ProductType';

export type CartContextStateType = {
  isCartLoading: boolean;
  isAddingProduct: boolean;
  cartProducts: Product[];
};
