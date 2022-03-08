import http from '../http-common';
import Product from '../types/ProductType';

export const cartClient = {
  getCartItems: () => http.get('/cart'),
  postCartItem: (payload: Product) => http.post('/cart', payload),
  deleteCartItem: (id: number) => http.delete(`/cart/${id}`),
};
