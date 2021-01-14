import ApiSource from "../data/api-source";
import Cookies from 'cookies'

export function withAuthServerSideProps(getServerSidePropsFunc?: Function){
  
  return async (context: any) => {
      const cookies = new Cookies(context.req, context.res);
      const tokenFromCookie =  cookies.get('token');
      let user = null;
      if (tokenFromCookie) {
        user = await getUser(context, tokenFromCookie);
        // Set a cookie
        cookies.set('user', JSON.stringify(user), {
            httpOnly: true,
        });
      }

      if (!user) {
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

async function  getUser(content: any, token: string) {
  let result;
   try {
     result = await ApiSource.getUser(token);
   } catch (error) {
     console.log(error);
     return null;
   }
   return result.data;
}
