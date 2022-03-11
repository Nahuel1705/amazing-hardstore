import {useReducer} from 'react';
import Product from '../types/ProductType';

type FormData = {
  name: string;
  value: string;
};

type HandleChangeParams = {pair: FormData; event?: never} | {event: React.ChangeEvent<HTMLInputElement>; pair?: never};

type FormState = {
  isSubmiting: boolean;
  isFormValid: boolean;
  values: Omit<Product, 'productId'>;
  errorFields: {
    name: string | null;
    brand: string | null;
    model: string | null;
    price: string | null;
  };
};

const INITIAL_STATE: FormState = {
  isSubmiting: false,
  isFormValid: true,
  values: {
    name: '',
    brand: '',
    model: '',
    price: 0,
  },
  errorFields: {
    name: null,
    brand: null,
    model: null,
    price: null,
  },
};

const formReducer = (state: FormState, data: FormData): FormState => {
  let error = null;

  switch (data.name) {
    case 'name':
      if (data.value.length > 60) {
        error = 'Product name length must not be greater than 60 characters';
      }
      break;
    case 'brand':
      if (data.value.length > 16) error = 'Product brand length must not be greater than 16 characters';
      break;
    case 'model':
      if (data.value.length > 16) error = 'Product model length must not be greater than 16 characters';
      break;
    case 'price':
      console.log(data);

      const parsedPrice = parseInt(data.value);

      if (Number.isNaN(parsedPrice)) error = 'Please enter a valid price';
      if (parsedPrice < 0) error = 'Product price must be greater than $0';
      break;
    default:
      return {...state};
  }

  return {
    ...state,
    errorFields: {...state.errorFields, [data.name]: error},
    values: {...state.values, [data.name]: data.value},
  };
};

export const useCreateProductForm = () => {
  const [formState, setFormState] = useReducer(formReducer, INITIAL_STATE);

  const handleChange = ({pair, event}: HandleChangeParams) => {
    const {name, value} = !pair ? event.target : pair;
    setFormState({name, value});
  };

  return {
    handleChange,
    formState,
  };
};
