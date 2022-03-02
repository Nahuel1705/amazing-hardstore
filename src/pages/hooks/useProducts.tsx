import {AxiosResponse} from 'axios';
import {useLayoutEffect, useState} from 'react';
import {HeaderLinks} from '../../http-common';
import {getProducts, goToPageByNumber, goToPageByURL} from '../../services/productsDataService';
import Product from '../../types/ProductType';
import {parseLinkHeader} from '../../utils/parseHeaderLink';

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [paginationLinks, setPaginationsLinks] = useState<HeaderLinks>({first: '', last: ''});
  const [currentData, setCurrentData] = useState<Product[]>([]);

  const processResponse = (response: AxiosResponse) => {
    setCurrentData(response.data);
    setPaginationsLinks({...parseLinkHeader(response.headers.link)});
  };

  const fetchFirstData = async () => {
    setIsLoading(true);

    try {
      await goToPageByNumber(1).then(processResponse);
    } catch (error) {
      console.error('Oops! Something went wronw trying to get the firs page of Products\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nexPage = async () => {
    setIsLoading(true);

    try {
      await goToPageByURL(paginationLinks.next).then(processResponse);
    } catch (error) {
      console.error('Oops! Something went wronw trying to get the next page of Products\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  const previousPage = async () => {
    setIsLoading(true);

    try {
      await goToPageByURL(paginationLinks.prev).then(processResponse);
    } catch (error) {
      console.error(
        'Oops! Something went wronw trying to get the previous page of Products\n',
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const firstPage = async () => {
    setIsLoading(true);

    try {
      await goToPageByURL(paginationLinks.first).then(processResponse);
    } catch (error) {
      console.error('Oops! Something went wronw trying to get the first page of Products\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  const lastPage = async () => {
    setIsLoading(true);

    try {
      await goToPageByURL(paginationLinks.last).then(processResponse);
    } catch (error) {
      console.error('Oops! Something went wronw trying to get the last page of Products\n', error);
    } finally {
      setIsLoading(false);
    }
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

  useLayoutEffect(() => {
    fetchFirstData();
  }, []);

  return {
    currentData,
    isLoading,
    firstPage,
    previousPage,
    nexPage,
    lastPage,
    getAll,
  };
};
