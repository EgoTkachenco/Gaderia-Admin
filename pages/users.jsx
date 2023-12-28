import Head from 'next/head';
import { Users } from '../components/users/Users';

const users = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users />
    </>
  );
};

export default users;
