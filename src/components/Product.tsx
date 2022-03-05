import IProduct from '../types/ProductType';
import {Button} from './Button';

import {FaCartPlus} from 'react-icons/fa';

import testImage from '../assets/img/test_image.png';
import '../assets/styles/Product.css';
import {formatPrice} from '../utils/formatPrice';
import {useGlobalContext} from '../hooks/useGlobalContext';

interface ProductProps {
  product: IProduct;
}

export const Product = ({product}: ProductProps) => {
  const {name, price} = product;

  const {addToCart} = useGlobalContext();

  return (
    <div className="product">
      <div className="product-image-container">
        <img src={testImage} alt="test_image.png" width={300} height={300} />
      </div>
      <div className="product-overview">
        <hr />
        <span className="product-name">{name}</span>
        <div className="add-to-cart-section">
          <span className="product-price">{formatPrice(price)}</span>
          <Button onclick={e => addToCart(product)} lable="Add to cart" separator icon={<FaCartPlus />} />
        </div>
      </div>
    </div>
  );
};
