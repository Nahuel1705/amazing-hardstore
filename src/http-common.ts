import axios from 'axios';
import {api, port} from './api';

export default axios.create({
  baseURL: `http://${api}:${port}`,
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
});

export type HeaderLinks = {
  currentPage: number;
  pagesAmount: number;
  first: string;
  last: string;
  prev?: string;
  next?: string;
};
