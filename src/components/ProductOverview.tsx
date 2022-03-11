import {Button} from './Button';

import {FaCartPlus} from 'react-icons/fa';

import testImage from '../assets/img/test_image.png';
import '../assets/styles/Product.css';
import {formatPrice} from '../utils/formatPrice';
import {useCart} from '../hooks/useCart';
import IProduct from '../types/ProductType';

export type ProductProps = {
  product: IProduct;
};

export const ProductOverview = ({product}: ProductProps) => {
  const {name, price} = product;

  const {addToCart} = useCart();

  return (
    <div className="product" data-testid="product-overview">
      <div className="product-image-container">
        <img src={testImage} alt="test_image.png" width={300} height={300} data-testid="product-image" />
      </div>
      <div className="product-overview">
        <hr />
        <span className="product-name">{name}</span>
        <div className="add-to-cart-section">
          <span className="product-price">{formatPrice(price)}</span>
          <Button
            onclick={e => addToCart(product)}
            lable="Add to cart"
            separator
            icon={<FaCartPlus />}
            data-testid="add-to-cart-button"
          />
        </div>
      </div>
    </div>
  );
};
