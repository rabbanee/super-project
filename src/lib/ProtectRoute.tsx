import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import ApiSource from '@data/api-source';
import cookieSignature from 'cookie-signature';
import { CookieSignatureHelper } from '@utils/auth/cookie-signature-helper';

export function ProtectRoute(Component: any) {
  return (...props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const router = useRouter();
    const tokenFromCookie = Cookies.get('token');

    const getPermissions = async () => {
      console.log(tokenFromCookie);
      // console.log(CookieSignatureHelper.unsignCookie(tokenFromCookie));
      // dispatch(auth('LOGIN', {
      //   isValidating: true
      // }));
      let permissions;
      try {
        permissions = await ApiSource.getPermissions(tokenFromCookie);
      } catch (error) {
        console.log(error);
      }
      console.log(permissions);
      
    };

    useEffect(() => {
      if (!tokenFromCookie) router.push('/login');
      getPermissions();
    }, [auth]);
    return (<Component {...props}/>)
  }
}