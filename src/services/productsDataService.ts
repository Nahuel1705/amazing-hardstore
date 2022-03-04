import http from '../http-common';

export const RESULTS_PER_PAGE: number = 8;

export const getProducts = () => http.get('/products');

export const goToPageByNumber = (page: number = 1) => http.get(`/products?_page=${page}&_limit=${RESULTS_PER_PAGE}`);

export const goToPageByURL = (url: string = '/products?_page=1') => http.get(url);
