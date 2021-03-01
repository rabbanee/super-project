const initialState = {
  user: {},
  token: '',
  permissions: {},
  navItems: {},
  isValidating: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.auth,
      };
    case 'SET_AUTH':
      return {
        ...state,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default authReducer;