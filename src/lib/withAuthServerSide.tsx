import ApiSource from "../data/api-source";
import Cookies from 'cookies'
import { CookieHelper } from "../utils/auth/cookie-helper";
import { CookieSignatureHelper } from "@utils/auth/cookie-signature-helper";
import { User } from "@interface/User";
let cookie = require('cookie-signature');

export function withAuthServerSideProps(getServerSidePropsFunc?: Function){
  
  return async (context: any) => {
      const cookies = new Cookies(context.req, context.res);
      const tokenFromCookie =  cookies.get('token') ?? '';
      const userFromCookie =  cookies.get('user') ?? '';
       
      const userUnsignFromCookie = CookieSignatureHelper.unsignCookie(userFromCookie);
      const tokenUnsignFromCookie = CookieSignatureHelper.unsignCookie(tokenFromCookie);
      let user = null;
      
      if(!tokenUnsignFromCookie) {
        CookieHelper.resetCookie(cookies);
        context.res.writeHead(302, {
          Location: '/login',
        });
        context.res.end();
      }
      
      if (!userUnsignFromCookie && !user) {
        user = await getUser(tokenUnsignFromCookie);
        // Set a signature cookie
        let userSignature = CookieSignatureHelper.signCookie(JSON.stringify(user));
        console.log(userSignature);
        
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
        user = JSON.parse(userUnsignFromCookie);
      }

      let permissions = await getPermission(tokenUnsignFromCookie, context, cookies);

      if(getServerSidePropsFunc){
          return {
            props: {
              user,
              permissions,
              data: await getServerSidePropsFunc(context, user, permissions)
            },
          };
      }
      return {
        props: {  
          user,
          permissions,
          data: {
            props: {
              user,
              permissions
            }
          }
        }
      };
    }
}

async function getPermission(token: string, context, cookies) {
  let response = null;
  try {
    response = await ApiSource.getPermissions(token);
  } catch (error) {
    console.log('failed to getPermissions', error?.response?.status);
    if (error?.response?.status === 401) {
      CookieHelper.resetCookie(cookies);
      context.res.writeHead(302, {
        Location: '/login',
      });
      context.res.end();
    }
    return null;
  }
  return response.data;
}

async function getUser(token: string) {
  let result;
   try {
     result = await ApiSource.getUser(token);
   } catch (error) {
     console.log('failed to getUser', error);
     return null;
   }
    const imageId = result.data.user.image_id;
    delete result.data.user.image_id;
    const user: User = {
      ...result.data.user,
      imageId,
    };
   return user;
}
