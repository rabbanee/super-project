import ApiSource from "../data/api-source";
import Cookies from 'cookies'
import { CookieHelper } from "../utils/auth/cookie-helper";
import { SignatureCookieHelper } from "../utils/auth/signature-cookie-helper";
import dummyUser from "@data/dummies/user";
let cookie = require('cookie-signature');

export function withAuthServerSideProps(getServerSidePropsFunc?: Function){
  
  return async (context: any) => {
      const cookies = new Cookies(context.req, context.res);
      const tokenFromCookie =  cookies.get('token') ?? '';
      const userFromCookie =  cookies.get('user') ?? '';
       
      const userUnsignFromCookie = SignatureCookieHelper.unsignCookie(cookie, userFromCookie);
      const tokenUnsignFromCookie = SignatureCookieHelper.unsignCookie(cookie, tokenFromCookie);
      let user = null;
      
      // if(!tokenUnsignFromCookie) {
      //   CookieHelper.resetCookie(cookies);
      //   context.res.writeHead(302, {
      //     Location: '/login',
      //   });
      //   context.res.end();
      // }
      
      // if (!userUnsignFromCookie && !user) {
      //   user = await getUser(tokenUnsignFromCookie);
      //   // Set a signature cookie
      //   let userSignature = SignatureCookieHelper.signCookie(cookie, JSON.stringify(user));
      //   CookieHelper.setUserCookie(cookies, userSignature);
      // } 
      
      // if (!user && !userUnsignFromCookie) {
      //   CookieHelper.resetCookie(cookies);
      //   context.res.writeHead(302, {
      //     Location: '/login',
      //   });
      //   context.res.end();
      // }

      // if (!user) {
      //   user = JSON.parse(userUnsignFromCookie);
      // }

      user = dummyUser;

      if(getServerSidePropsFunc){
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
     console.log('failed to getUser');
     return null;
   }
   return result.data;
}
