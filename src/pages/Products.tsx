import {Product} from '../components/Product';
import {useProducts} from './hooks/useProducts';

import './styles/Products.css';

export const Products = () => {
  const products = useProducts();
  return (
    <div className="products-layout">
      {/* <button onClick={e => products.load()}>Get products</button> */}
      {products.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        products.currentData.map((product, index) => <Product key={index} product={product} />)
      )}
    </div>
  );
};
