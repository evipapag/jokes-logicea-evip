import Cookies, { CookieSetOptions } from 'universal-cookie';

const TOKEN_COOKIE_NAME = 'token';

export const getToken = () => {
  const cookies = new Cookies();
  const cookieTokenVal = cookies.get(TOKEN_COOKIE_NAME);
  return cookieTokenVal;
};

export const generateToken = (token: any) => {
  const cookies = new Cookies();

  const expirationDate = new Date(
    new Date().getTime() + 1 * 60 * 60 * 1000 * 24
  );

  const cookieOptions: CookieSetOptions = {
    path: '/',
    expires: expirationDate,
  };

  cookies.set(TOKEN_COOKIE_NAME, token, cookieOptions);
};

export const logout = () => {
  const cookies = new Cookies();
  cookies.remove(TOKEN_COOKIE_NAME);
};
