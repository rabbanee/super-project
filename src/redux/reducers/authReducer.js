const initialState = {
  user: {},
  token: '',
  isUserLoggedIn: false,
};

const authReducer = (state = initialState, { type, token }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        token: token,
        isUserLoggedIn: true,
      };
    default:
      return state;
  }
}

export default authReducer;