import Head from 'next/head';
import { Orders } from '../components/orders/Orders';

const orders = () => {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Orders />
    </>
  );
};

export default orders;
