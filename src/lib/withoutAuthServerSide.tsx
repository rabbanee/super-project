import Cookies from 'cookies';
import { CookieHelper } from '../utils/auth/cookie-helper';
let cookie = require('cookie-signature');

export function withoutAuthServerSideProps(getServerSidePropsFunc?: Function){
  
  return async (context: any) => {
      const cookies = new Cookies(context.req, context.res);
      const tokenFromCookie =  cookies.get('token') ?? '';

      const tokenUnsignFromCookie = cookie.unsign(tokenFromCookie, process.env.COOKIE_SIGNATURE_PASSWORD);

      let user = null;

      if (tokenUnsignFromCookie) {
          context.res.writeHead(302, {
            Location: '/',
          });
          context.res.end();
      }

      CookieHelper.resetCookie(cookies);


      if(getServerSidePropsFunc){
          return {props: {user, data: await getServerSidePropsFunc(context, user)}};
      }
      return {props: {user, data: {props: {user}}}};
    }
}
