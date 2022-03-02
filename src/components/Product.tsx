import IProduct from '../types/ProductType';
import {Button} from './Button';

import {FaCartPlus} from 'react-icons/fa';

import testImage from '../assets/img/test_image.png';
import '../assets/styles/Product.css';
import {formatPrice} from '../utils/formatPrice';

interface ProductProps {
  product: IProduct;
}

export const Product = ({product}: ProductProps) => {
  const {name, brand, model, price} = product;

  return (
    <div className="product">
      <div className="product-image-container">
        <img src={testImage} alt="test_image.png" width={300} height={300} />
      </div>
      <div className="product-overview">
        <span className="product-name">{name}</span>
        <div className="add-to-cart-section">
          <span className="product-price">{formatPrice(price)}</span>
          <Button
            onclick={e => console.log(e)}
            lable="Add to cart"
            separator
            icon={<FaCartPlus />}
          />
        </div>
      </div>
    </div>
  );
};
