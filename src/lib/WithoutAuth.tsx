import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ApiSource from '@data/api-source';
import { CookieHelper } from '@utils/auth/cookie-helper';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@actions/index';
import { User } from '@interface/User';
import Loading from '@elements/Loading';

const WithoutAuth = (Component: any) => {
  return (...props) => {
    const router = useRouter();
    const tokenFromCookie = Cookies.get('token');
    const user = useSelector(state => state.user);
    const dispatch: Function = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
      let response;
      setIsLoading(true);
      try {
        response = await ApiSource.getUser(tokenFromCookie);
      } catch (error) {
        CookieHelper.resetCookie(Cookies);
        setIsLoading(false);
        console.log(error);
        return null;
      }
      const data = response.data;
      const user: User = {
        name:  data.user.name,
        email:  data.user.email,
        role:  data.user.role,
        imageId: data.user.image_id,
      };
      await dispatch(setUser(user));
      await router.push('/');
      setIsLoading(false);
    }

    useEffect(() => {
      if (!tokenFromCookie) {
        setIsLoading(false);
        return;
      }
      
      if (!user.isValid) {
        getUser();
        return;
      }
      
      if (user.isValid && tokenFromCookie) {
        router.push('/');
      }

    }, [user.isValid, tokenFromCookie]);
    
    if (isLoading) {
      return (
        <Loading />
      )
    } else {
      return (<Component {...props}/>)
    }

  }
};

export default WithoutAuth;