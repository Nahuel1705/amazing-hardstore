import React from 'react';
import {Button} from '../components/Button';
import {useCreateProductForm} from '../hooks/useCreateProductForm';
import NumberFormat from 'react-number-format';

import './styles/CreateProduct.css';

export const CreateProduct = () => {
  const {
    handleChange,
    formState: {values, errorFields, isSubmiting},
  } = useCreateProductForm();
  console.log(values.price);
  console.log(errorFields);

  return (
    <form className="create-product-form" autoComplete="off" onSubmit={e => e.preventDefault()}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" onChange={event => handleChange({event})} value={values.name} />
        {errorFields.name && <small>{errorFields.name}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="brand">Brand:</label>
        <input type="text" name="brand" onChange={event => handleChange({event})} value={values.brand} />
        {errorFields.brand && <small>{errorFields.brand}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="model">Model:</label>
        <input type="text" name="model" onChange={event => handleChange({event})} value={values.model} />
        {errorFields.model && <small>{errorFields.model}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        {/* INFO: https://github.com/s-yadav/react-number-format */}
        <NumberFormat
          thousandSeparator={true}
          prefix={'$ '}
          value={values.price > 0 ? values.price : ''}
          mask="_"
          onValueChange={inputValues => handleChange({pair: {name: 'price', value: inputValues.value}})}
        />
        {errorFields.price && <small>{errorFields.price}</small>}
      </div>
      <Button lable="Create Product" onclick={e => e} />
    </form>
  );
};
