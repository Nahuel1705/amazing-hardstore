import '@testing-library/jest-dom';
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import {ProductOverview, ProductProps} from '../components/ProductOverview';
import {CartContextProvider} from '../context/CartContext/CartContextProvider';

const renderLoginForm = (
  {props, hasContext}: {props?: Partial<ProductProps>; hasContext?: boolean} = {props: {}, hasContext: false}
) => {
  const defaultProps: ProductProps = {
    product: {
      productId: 10,
      name: 'AMD Ryzen 5 5600X',
      brand: 'AMD',
      model: '5600X',
      price: 17000,
    },
  };

  if (hasContext) {
    render(<ProductOverview {...defaultProps} {...props} />, {
      wrapper: ({children}) => <CartContextProvider>{children}</CartContextProvider>,
    });
  }

  return render(<ProductOverview {...defaultProps} {...props} />);
};

describe('<ProductOverview />', () => {
  test('Should render', async () => {
    const {findByTestId, getByText} = renderLoginForm();

    const productOverview = await findByTestId('product-overview');
    const productImage = await findByTestId('product-image');

    expect(productOverview).toBeInTheDocument(); //could be redundant???
    expect(productImage).toBeInTheDocument(); //could be redundant???
    expect(getByText('AMD Ryzen 5 5600X'));
    expect(getByText('$ 17.000,00'));
  });

  // test('Add to cart button should work', async () => {
  //   const {findByTestId} = renderLoginForm({hasContext: true});

  //   const productOverview = await findByTestId('product-overview');
  // });
});
