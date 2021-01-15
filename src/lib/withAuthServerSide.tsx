import ApiSource from "../data/api-source";
import Cookies from 'cookies'
var cookie = require('cookie-signature');

export function withAuthServerSideProps(getServerSidePropsFunc?: Function){
  
  return async (context: any) => {
      const cookies = new Cookies(context.req, context.res);
      const tokenFromCookie =  cookies.get('token') ?? '';
      const userFromCookie =  cookies.get('user') ?? '';

      const tokenUnsignFromCookie = cookie.unsign(tokenFromCookie, process.env.NEXT_PUBLIC_COOKIE_SIGNATURE_PASSWORD);
      const userUnsignFromCookie = cookie.unsign(userFromCookie, process.env.NEXT_PUBLIC_COOKIE_SIGNATURE_PASSWORD);

      let user = null;
      
      if(!tokenUnsignFromCookie) {
          user = await getUser(context, tokenUnsignFromCookie);

          cookies.set('token', '');
          cookies.set('user', '');
          context.res.writeHead(302, {
            Location: '/login',
          });
          context.res.end();
      }

      if (!userUnsignFromCookie) {
        console.log('masuk? !userUnsignFromCookie');
        
        user = await getUser(context, tokenUnsignFromCookie);
        
        // Set a signature cookie
        let userSignature = cookie.sign(JSON.stringify(user), 'daffaganteng');
        
       cookies.set('user', userSignature, {
          sameSite: 'Strict',
          httpOnly: true,
        });
      } else {
        user = userUnsignFromCookie;
      }
      
      console.log('ini user',user);
      console.log('ini userUnsignFromCookie',userUnsignFromCookie);
      if (!user) {
        cookies.set('token', '');
        cookies.set('user', '');
        context.res.writeHead(302, {
          Location: '/login',
        });
        context.res.end();
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

async function  getUser(context: any, token: string) {
  let result;
   try {
     result = await ApiSource.getUser(token);
   } catch (error) {
     console.log(error);
     return null;
   }
   return result.data;
}
