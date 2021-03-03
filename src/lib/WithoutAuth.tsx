import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import ApiSource from '@data/api-source';
import { CookieHelper } from '@utils/auth/cookie-helper';
import { useDispatch, useSelector } from 'react-redux';

const WithoutAuth = (Component: any) => {
  return (...props) => {
    // const dispatch = useDispatch();
    const router = useRouter();
    const tokenFromCookie = Cookies.get('token');
    const user = useSelector(state => state.user);
    const dispatch: Function = useDispatch();

    const getUser = async () => {
      let response;
      try {
        response = await ApiSource.getUser(tokenFromCookie);
      } catch (error) {
        CookieHelper.resetCookie(Cookies);
        console.log(error);
        return null;
      }
      // router.push('/');
      console.log(response.data);
    }

    useEffect(() => {
      if (!tokenFromCookie) {
        return;
      }
      if (user.isValid) {
        router.push('/');
        return;
      }
      getUser();
    }, [user.isValid, tokenFromCookie]);
    return (<Component {...props}/>)
  }
};

export default WithoutAuth;