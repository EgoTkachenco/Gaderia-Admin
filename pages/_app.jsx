import '../styles/globals.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { Layout } from '../components/layout/layout';
import { AuthContext } from '../contexts/AuthContext';
import useAuth from '../components/hooks/useAuth';

function MyApp({ Component, pageProps }) {
  const { inited, isLogged, user, log, relog } = useAuth();

  return (
    <NextThemesProvider defaultTheme="system" attribute="class">
      <AuthContext.Provider value={{ isLogged, user, log, relog }}>
        <NextUIProvider>
          <Layout>{inited && <Component {...pageProps} />}</Layout>
        </NextUIProvider>
      </AuthContext.Provider>
    </NextThemesProvider>
  );
}

export default MyApp;
