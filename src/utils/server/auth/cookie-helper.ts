export class CookieHelper {
  static resetCookie(cookie: any) {
    cookie.set('token', '');
    cookie.set('user', '');
  }

  static setUserCookie(cookie: any, user: string) {
    cookie.set('user', user, {
      sameSite: 'strict',
      httpOnly: true,
    });
  }

  static setTokenCookie(cookie: any, token: string) {
    cookie.set('token', token, {
      sameSite: 'strict',
      httpOnly: true,
    });
  }
}