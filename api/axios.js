import Axios from 'axios';

const TOKEN_NAME = process.env.TOKEN_COOKIE_NAME || 'gdrtkn';

const axios = Axios.create({ baseURL: 'https://gaderia.biz/api' });

export const setToken = (token = '', tokenName = TOKEN_NAME) => {
  const expires = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 365
  ).toUTCString();
  document.cookie = `${tokenName}=${token}; path=/; expires=${expires}`;
};

export const getToken = (tokenName = TOKEN_NAME) => {
  var nameEQ = tokenName + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const eraseToken = (tokenName = TOKEN_NAME) =>
  (document.cookie = `${tokenName}=; path=/; Max-Age=0`);

export const securedFetchOptions = (
  tokenName = TOKEN_NAME,
  token = getToken(tokenName)
) => ({
  headers: {
    Authorization: 'Bearer ' + token,
  },
});

export default axios;
