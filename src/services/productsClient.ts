import http from '../http-common';

export const RESULTS_PER_PAGE: number = 8;

export const productsClient = {
  getProducts: () => http.get('/products'),
  goToPageByNumber: (page: number = 1) => http.get(`/products?_page=${page}&_limit=${RESULTS_PER_PAGE}`),
  goToPageByURL: (url: string = '/products?_page=1') => http.get(url),
};
