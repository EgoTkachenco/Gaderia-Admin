import { createContext } from 'react';

export const AuthContext = createContext({
  isLogged: false,
  user: null,
  log: (user) => {},
  relog: () => {},
});
