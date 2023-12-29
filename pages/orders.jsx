import Head from 'next/head';
import { Orders } from '../components/orders/Orders';

const orders = () => {
  return (
    <>
      <Head>
        <title>Замовлення</title>
      </Head>
      <Orders />
    </>
  );
};

export default orders;
