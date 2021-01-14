import cookie from 'js-cookie';
import ApiSource from '../../data/api-source';

export const auth = (type, token) => {
  return {
    type,
    token
  }
}

<<<<<<< HEAD
export const login =  (token) => {
  return  (dispatch) => {
=======
export const login = (token) => {
  return (dispatch) => {
>>>>>>> 09eddb48b5a76324bdc1fd4ddf2e0845aafa187f
    cookie.set('token', token, { 
      sameSite: 'Strict'
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