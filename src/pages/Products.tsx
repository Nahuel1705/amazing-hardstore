import {Button} from '../components/Button';
import {Product} from '../components/Product';
import {useProducts} from './hooks/useProducts';
import {BiArrowToLeft, BiArrowToRight, BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi';

import './styles/Products.css';

export const Products = () => {
  const products = useProducts();
  return (
    <div className="product-page-layout">
      <div className="products-layout">
        {products.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          products.currentData.map((product, index) => <Product key={index} product={product} />)
        )}
      </div>
      <hr />
      <div className="navigation-buttons">
        <Button onclick={products.firstPage} icon={<BiArrowToLeft />} fontSize="2rem" />
        <Button onclick={products.previousPage} icon={<BiLeftArrowAlt />} fontSize="2rem" />
        <strong>{`Página ${products.paginationInfo.currentPage} de ${products.paginationInfo.pagesAmount}`}</strong>
        <Button onclick={products.nexPage} icon={<BiRightArrowAlt />} fontSize="2rem" />
        <Button onclick={products.lastPage} icon={<BiArrowToRight />} fontSize="2rem" />
      </div>
    </div>
  );
};
