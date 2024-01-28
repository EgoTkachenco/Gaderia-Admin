import Head from 'next/head';
import { Contacts } from '../components/Contacts';

const products = () => {
  return (
    <>
      <Head>
        <title>Зворотний зв'язок</title>
      </Head>
      <Contacts />
    </>
  );
};

export default products;
