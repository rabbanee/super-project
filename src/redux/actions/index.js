import cookie from 'js-cookie';
import ApiSource from '../../data/api-source';
let cookieSignature = require('cookie-signature');

export const auth = (type, token) => {
  return {
    type,
    token
  }
}

export const login =  (token) => {
  return  (dispatch) => {
<<<<<<< HEAD
    cookie.set('token', token, { 
      sameSite: 'Strict'
=======
    var tokenWithSignature = cookieSignature.sign(token, process.env.NEXT_PUBLIC_COOKIE_SIGNATURE_PASSWORD);
    cookie.set('token', tokenWithSignature, { 
      sameSite: 'strict',
>>>>>>> f1e3ee81877eccc64a7adf1e3b211eebf55abc25
    });
    dispatch(auth('LOGIN', tokenWithSignature));
  }
}

export const getUser =  (token) => {
 return  (dispatch) => {
   let result;
   try {
     result = ApiSource.getUser(token);
   } catch (error) {
     console.log(error);
     return;
   }
   console.log(result);
  //  const user = result.data;
  //  dispatch('SET_USER', auth(user));
 }
}