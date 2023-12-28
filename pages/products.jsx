import Head from 'next/head';
import { Products } from '../components/products/Products';

const products = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Products />
    </>
  );
};

export default products;
