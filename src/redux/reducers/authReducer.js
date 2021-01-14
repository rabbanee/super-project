const initialState = {
  user: {},
  token: '',
  isUserLoggedIn: false,
};

const authReducer = (state = initialState, { type, token, user }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        token,
        isUserLoggedIn: true,
      };
    case 'SET_USER':
      return {
        ...state,
        token,
        isUserLoggedIn: true,
        user,
      };
    default:
      return state;
  }
}

export default authReducer;