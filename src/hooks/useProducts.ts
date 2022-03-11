import {useReducer} from 'react';
import {parseLinkHeader} from '../utils/parseHeaderLink';

import {HeaderLinks} from '../http-common';
import {productsClient, RESULTS_PER_PAGE as productsPerPage} from '../services/productsClient';
import {getParamsFromURL} from '../utils/getParamsFromURL';

import {AxiosResponse} from 'axios';
import Product from '../types/ProductType';

type PaginationInfo = {
  currentPage: number;
  pagesAmount: number;
};

type ProductState = {
  isLoading: boolean;
  currentData: Product[];
  paginationInfo: PaginationInfo;
  paginationLinks: HeaderLinks;
};

type SetDataPayloadType = {
  responseURL: string;
  totalEntries: number;
  data: Product[];
  links?: string;
};

type ProductActions = {type: 'SET_DATA'; payload: SetDataPayloadType} | {type: 'START_LOADING'} | {type: 'END_LOADING'};

const INITIAL_STATE: ProductState = {
  isLoading: false,
  currentData: [],
  paginationInfo: {currentPage: 0, pagesAmount: 0},
  paginationLinks: {first: '', last: ''},
};

const productsReducer = (state: ProductState, action: ProductActions): ProductState => {
  switch (action.type) {
    case 'START_LOADING':
      return {...state, isLoading: true};
    case 'SET_DATA':
      const {responseURL, totalEntries, data, links} = action.payload;
      const {page} = getParamsFromURL(responseURL, ['page']);
      const pagesAmount = Math.ceil(totalEntries / productsPerPage);
      return {
        ...state,
        currentData: data,
        paginationInfo: {currentPage: page, pagesAmount},
        isLoading: false,
        ...(links && {paginationLinks: parseLinkHeader(links)}),
      };
    case 'END_LOADING':
      return {...state, isLoading: false};
    default:
      return state;
  }
};

export const useProducts = () => {
  const [{isLoading, paginationLinks, paginationInfo, currentData}, dispatch] = useReducer(
    productsReducer,
    INITIAL_STATE
  );

  const errorLogs = {
    firstPage: 'Oops! Something went wronw trying to get the first page of Products\n',
    nextPage: 'Oops! Something went wronw trying to get the next page of Products\n',
    previousPage: 'Oops! Something went wronw trying to get the previous page of Products\n',
    lastPage: 'Oops! Something went wronw trying to get the last page of Products\n',
  };

  const processResponse = (response: AxiosResponse): void => {
    if (response.data.length > 0) {
      dispatch({
        type: 'SET_DATA',
        payload: {
          responseURL: response.request.responseURL,
          totalEntries: parseInt(response.headers['x-total-count']) || 0,
          data: response.data,
          links: response.headers.link,
        },
      });
    } else {
      dispatch({type: 'END_LOADING'});
    }
  };

  const navigateTo = async (url: string, errorLog: string) => {
    dispatch({type: 'START_LOADING'});
    try {
      await productsClient.goToPageByURL(url).then(processResponse);
    } catch (error) {
      console.error(errorLog, error);
      dispatch({type: 'END_LOADING'});
    }
  };

  const fetchFirstData = async () => {
    dispatch({type: 'START_LOADING'});
    try {
      await productsClient.goToPageByNumber(1).then(processResponse);
    } catch (error) {
      console.error(errorLogs.firstPage, error);
      dispatch({type: 'END_LOADING'});
    }
  };

  return {
    currentData,
    isLoading,
    paginationInfo,
    firstPage: () => navigateTo(paginationLinks.first, errorLogs.firstPage),
    previousPage: () => navigateTo(paginationLinks.prev || paginationLinks.first, errorLogs.previousPage),
    nexPage: () => navigateTo(paginationLinks.next || paginationLinks.last, errorLogs.nextPage),
    lastPage: () => navigateTo(paginationLinks.last, errorLogs.lastPage),
    fetchFirstData,
  };
};
