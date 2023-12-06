import { useState, useEffect, useMemo } from 'react';
import { eraseToken, getToken, setToken } from '../../api/axios';
import { useRouter } from 'next/router';

const USER_STORAGE_KEY = process.env.USER_STORAGE_KEY || 'gdrsr';

const useAuth = () => {
  const router = useRouter();
  const [inited, setInited] = useState(false);
  const [user, setUser] = useState(null);

  const isLogged = useMemo(() => !!user, [user]);

  const log = (user) => {
    setToken(user.token);
    delete user.token;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setUser(user);
  };

  const relog = () => {
    if (isLogged) return Promise.resolve();

    if (!getToken()) {
      if (router.pathname !== '/login') return router.push('/login');

      return Promise.resolve();
    }

    const user = localStorage.getItem(USER_STORAGE_KEY);
    if (!user) {
      eraseToken();
      return Promise.resolve();
    }

    setUser(JSON.parse(user));
    if (router.pathname === '/login') return router.push('/');
    return Promise.resolve();
  };

  const logOut = () => {
    eraseToken();
    setUser(null);
  };

  useEffect(() => {
    if (inited) return;
    relog().then(() => {
      setInited(true);
    });
  }, []);

  return { inited, isLogged, user, log, relog, logOut };
};

export default useAuth;
