const defaultOptions = {
  sameSite: '',
  httpOnly: false,
};

let tomorrow =  new Date();
tomorrow.setDate(new Date().getDate() + 1);

export class CookieHelper {
  static resetCookie(cookie: any) {
    cookie.remove('token');
    cookie.remove('user');
  }

  static setUserCookie(cookie: any, user: string, expires?: string) {
    cookie.set('user', user, {
      ...defaultOptions,
      expires: new Date(expires ?? tomorrow)
    });
  }

  static setTokenCookie(cookie: any, token: string, expires?: string) {
    cookie.set('token', token, {
      ...defaultOptions,
      expires: new Date(expires ?? tomorrow)
    });
  }
}