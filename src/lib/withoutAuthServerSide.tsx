import ApiSource from "../data/api-source";
import Cookies from 'cookies';
var cookie = require('cookie-signature');

export function withoutAuthServerSideProps(getServerSidePropsFunc?: Function){
  
  return async (context: any) => {
      const cookies = new Cookies(context.req, context.res);
      const tokenFromCookie =  cookies.get('token') ?? '';

      const tokenUnsignFromCookie = cookie.unsign(tokenFromCookie, process.env.NEXT_PUBLIC_COOKIE_SIGNATURE_PASSWORD);

      let user = null;

      if (tokenUnsignFromCookie) {
          context.res.writeHead(302, {
            Location: '/',
          });
          context.res.end();
      }

      if(getServerSidePropsFunc){
          return {props: {user, data: await getServerSidePropsFunc(context, user)}};
      }
      return {props: {user, data: {props: {user}}}};
    }
}
