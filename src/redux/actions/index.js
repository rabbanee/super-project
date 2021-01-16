
import cookie from 'js-cookie';
import ApiSource from '../../data/api-source';

export const auth = (type, token) => {
  return {
    type,
    token
  }
}

export const login =  (token) => {
  return  (dispatch) => {
    cookie.set('token', token, { 
      sameSite: 'strict',
    });
    dispatch(auth('LOGIN', token));
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