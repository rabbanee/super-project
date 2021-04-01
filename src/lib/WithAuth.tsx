import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ApiSource from '@data/api-source';
import { CookieHelper } from '@utils/auth/cookie-helper';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@interface/User';
import { setPermissions, setUser } from '@actions/index';
import Loading from '@elements/Loading';
import Error from 'next/error';
import findPermissionByName from '@utils/findPermissionByName';

const WitAuth = (Component: any, permissionName: string = '') => {
  return (...props) => {
    const router = useRouter();
    const tokenFromCookie = Cookies.get('token');
    const user = useSelector(state => state.user);
    const permissions = useSelector(state => state.permissions);
    const dispatch: Function = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
      let response;
      setIsLoading(true);
      try {
        response = await ApiSource.getUser(tokenFromCookie);
      } catch (error) {
        CookieHelper.resetCookie(Cookies);
        router.push('/login');
        console.log(error);
        return null;
      }
      // router.push('/');
      const data = response.data;
      const user: User = {
        name:  data.user.name,
        email:  data.user.email,
        role:  data.user.role,
        imageId: data.user.image_id,
      };
      dispatch(setUser(user));
      setIsLoading(false);
    }
    
    const getPermission = async () => {
      setIsLoading(true);
      let response;
      try {
        response = await ApiSource.getPermissions(tokenFromCookie);
      } catch (error) {
        console.log('failed to getPermissions', error?.response?.status);
        if (error?.response?.status === 401) {
          CookieHelper.resetCookie(Cookies);
          router.push('/login');
        }
        return null;
      }
      // console.log(response.data);
      dispatch(setPermissions(response.data));
      setIsLoading(false);
      return response.data;
    }

    useEffect(() => {
      // console.log('permissionName: ', permissionName);
      if (!tokenFromCookie) {
        CookieHelper.resetCookie(Cookies);
        router.push('/login');
        setIsLoading(false);
        return;
      }
      if (!user.isValid) {
        getUser();
        return;
      }
      if (tokenFromCookie && user.isValid && !permissions.isValid) {
        getPermission();
      }
    }, [user.isValid, tokenFromCookie, permissions.isValid]);

    if ((isLoading && !user.isValid) || (isLoading && !permissions.isValid)) {
      return (
        <Loading />
      )
    }

    if ((tokenFromCookie && user.isValid && permissions.isValid) && (findPermissionByName(permissions.list, permissionName) || !permissionName.trim())) {
      return (<Component {...props}/>)
    }
    return (
      <Error statusCode={404} />
    );
  }
};

export default WitAuth;