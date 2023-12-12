// import { Content } from '../components/home/content';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const { push } = useRouter();
  useEffect(() => push('/products'), []);
  return null;
};

export default Home;
