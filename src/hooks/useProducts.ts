import {useEffect, useState} from 'react';
import {parseLinkHeader} from '../utils/parseHeaderLink';

//fetching
import {HeaderLinks} from '../http-common';
import {
  getProducts,
  goToPageByNumber,
  goToPageByURL,
  RESULTS_PER_PAGE as productsPerPage,
} from '../services/productsDataService';
import {getParamsFromURL} from '../utils/getParamsFromURL';

//types
import {AxiosResponse} from 'axios';
import Product from '../types/ProductType';

type PaginationInfo = {
  currentPage: number;
  pagesAmount: number;
};

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [paginationLinks, setPaginationsLinks] = useState<HeaderLinks>({
    first: '',
    last: '',
    currentPage: 0,
    pagesAmount: 0,
  });
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({currentPage: 0, pagesAmount: 0});
  const [currentData, setCurrentData] = useState<Product[]>([]);

  const errorLogs = {
    firstPage: 'Oops! Something went wronw trying to get the first page of Products\n',
    nextPage: 'Oops! Something went wronw trying to get the next page of Products\n',
    previousPage: 'Oops! Something went wronw trying to get the previous page of Products\n',
    lastPage: 'Oops! Something went wronw trying to get the last page of Products\n',
  };

  const processResponse = (response: AxiosResponse): void => {
    const {page} = getParamsFromURL(response.request.responseURL, ['page']);
    const totalEntries = parseInt(response.headers['x-total-count']) || 0;

    setPaginationInfo({currentPage: page, pagesAmount: Math.ceil(totalEntries / productsPerPage)});
    setCurrentData(response.data);
    setPaginationsLinks({...parseLinkHeader(response.headers.link)});
  };

  const navigateTo = async (url: string, errorLog: string) => {
    setIsLoading(true);
    try {
      await goToPageByURL(url).then(processResponse);
    } catch (error) {
      console.error(errorLog, error);
    }
    setIsLoading(false);
  };

  const fetchFirstData = async () => {
    setIsLoading(true);

    try {
      await goToPageByNumber(1).then(processResponse);
    } catch (error) {
      console.error(errorLogs.firstPage, error);
    }

    setIsLoading(false);
  };

  const getAll = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts().then(res => res);
      setIsLoading(false);

      if (response.status !== 200) {
        console.error(
          `Oops! Something went wronw trying to get all Products\nStatus code:${response.status}\nError:${response.statusText}`
        );
      }
      setCurrentData(response.data);
    } catch (error) {
      console.error('Oops! Something went wronw trying to get all Products', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFirstData();
  }, []);

  return {
    currentData,
    isLoading,
    paginationInfo,
    firstPage: () => navigateTo(paginationLinks.first, errorLogs.firstPage),
    previousPage: () => navigateTo(paginationLinks.prev || paginationLinks.first, errorLogs.previousPage),
    nexPage: () => navigateTo(paginationLinks.next || paginationLinks.last, errorLogs.nextPage),
    lastPage: () => navigateTo(paginationLinks.last, errorLogs.lastPage),
    getAll,
  };
};
