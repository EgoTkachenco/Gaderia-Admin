import Head from 'next/head';
import { Contacts } from '../components/Contacts';

const products = () => {
  return (
    <>
      <Head>
        <title>Контакти</title>
      </Head>
      <Contacts />
    </>
  );
};

export default products;
