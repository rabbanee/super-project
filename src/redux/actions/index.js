import cookie from 'js-cookie';

export const auth = (type, token) => {
  return {
    type,
    token
  }
}

export const login = (token) => {
  return (dispatch) => {
    cookie.set('token', token, { 
      sameSite: 'Strict'
    });
    dispatch(auth('LOGIN', token));
  }
}

// export const getUser = async (token) => {
//  return async (dispatch) => {
//    let result;
//    try {
//      result = ((await Axios.get(`${config.BASE_URL}users/detail`, { headers: { 'Authorization': `Bearer ${token}` } }))).data;
//    } catch (error) {
//      console.log(error);
//      return;
//    }
//    const user = result.data;
//    dispatch('LOGIN', auth(user));
//  }
// }