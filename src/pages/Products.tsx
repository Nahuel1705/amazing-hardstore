import {Product} from '../components/Product';
import {useProducts} from './hooks/useProducts';

import './styles/Products.css';

export const Products = () => {
  const products = useProducts();
  return (
    <>
      <div className="products-layout">
        {products.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          products.currentData.map((product, index) => <Product key={index} product={product} />)
        )}
        <div>
          <button onClick={products.firstPage}>First</button>
          <button onClick={products.previousPage}>Previous</button>
          <button onClick={products.nexPage}>Next</button>
          <button onClick={products.lastPage}>Last</button>
        </div>
      </div>
    </>
  );
};
