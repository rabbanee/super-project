import ApiSource from "../data/api-source";
import Cookies from 'cookies'
import { CookieHelper } from "../utils/server/auth/cookie-helper";
import { SignatureCookieHelper } from "../utils/server/auth/signature-cookie-helper";
let cookie = require('cookie-signature');

export function withAuthServerSideProps(getServerSidePropsFunc?: Function){
  
  return async (context: any) => {
      const cookies = new Cookies(context.req, context.res);
      const tokenFromCookie =  cookies.get('token') ?? '';
      const userFromCookie =  cookies.get('user') ?? '';
       
      const userUnsignFromCookie = SignatureCookieHelper.unsignCookie(cookie, userFromCookie);
      const tokenUnsignFromCookie = SignatureCookieHelper.unsignCookie(cookie, tokenFromCookie);
      let user = null;
      
      if(!tokenUnsignFromCookie) {
        user = await getUser(tokenFromCookie);
        if (user === null) {
          CookieHelper.resetCookie(cookies);
          context.res.writeHead(302, {
            Location: '/login',
          });
          context.res.end();
        } 

        let userSignature = SignatureCookieHelper.signCookie(cookie, JSON.stringify(user));
        let tokenSignature =  SignatureCookieHelper.signCookie(cookie, tokenFromCookie);
        CookieHelper.setTokenCookie(cookies, tokenSignature);
        CookieHelper.setUserCookie(cookies, userSignature);
      }
     
      
      if (!userUnsignFromCookie && !user) {
        user = await getUser(tokenUnsignFromCookie);
        // Set a signature cookie
        let userSignature = SignatureCookieHelper.signCookie(cookie, JSON.stringify(user));
        CookieHelper.setUserCookie(cookies, userSignature);
      } 
      
      if (!user && !userUnsignFromCookie) {
        CookieHelper.resetCookie(cookies);
        context.res.writeHead(302, {
          Location: '/login',
        });
        context.res.end();
      }

      if (!user) {
        user = userUnsignFromCookie;
      }

      if(getServerSidePropsFunc){
        console.log(getServerSidePropsFunc);
          return {
            props: {
              user,
              data: await getServerSidePropsFunc(context, user)
            },
          };
      }
      return {
        props: {  
          user,
          data: {
            props: {user}
          }
        }
      };
    }
}

async function  getUser(token: string) {
  let result;
   try {
     result = await ApiSource.getUser(token);
   } catch (error) {
     console.log(error);
     return null;
   }
   return result.data;
}
