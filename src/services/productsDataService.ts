import http from '../http-common';

const RESULTS_PER_PAGE: number = 8;

export const getProducts = () => http.get('/products');

export const goToPage = (page: number | string = 1) =>
  http.get(`/products?_page=${page}&_limit=${RESULTS_PER_PAGE}`);
