import ApiSource from '@data/api-source'
import Cookies from 'js-cookie';
import CookieSignature from 'cookie-signature';
import { CookieHelper } from '@utils/auth/cookie-helper';

export const showAlert = (alert) => {
  return {
    type: 'SHOW_ALERT',
    alert,
  }
}

export const closeAlert = () => {
  return {
    type: 'CLOSE_ALERT'
  }
}

// export const getUser = async (user) => {
//   let response;
//   const tokenFromCookie = Cookies.get('token') ?? '';
//   return async (dispatch) => {
//     try {
//       response = await ApiSource.getUser(tokenFromCookie);
//     } catch (error) {
//       CookieHelper.resetCookie(Cookies);
//       console.log(error);
//       return null;
//     }
//     return response.data;
//   }
// };

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
};

export const setPermissions = (list) => {
  return {
    type: 'SET_PERMISSION',
    list,
    isValid: true,
  }
};

export const setUser = (user) => {
  // console.log(user);
  return {
    type: 'SET_USER',
    user: {
      ...user,
      isValid: true,
    },
  }
};

export const login = ({ email, password }) => {
  let response;
  return async (dispatch) => {
    try {
      response = await ApiSource.login(email, password);
    } catch (error) {
      return error;
    }
    let data = response.data.user_data;

    const user = {
      name:  data.name,
      email:  data.email,
      role:  data.role,
      imageId: data.image_id,
    };
    const token = data.token;
    CookieHelper.setTokenCookie(Cookies, token, data.expires_at);
    dispatch(auth('LOGIN', {
      user,
      token,
    }));
    return response;
  }
}


export const auth = (type, auth) => {
  return {
    auth,
    type,
  }
}