import Head from 'next/head';
import { Login } from '../components/Login';

const login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  );
};

export default login;
