const initialState = {
  name:  '',
  email:  '',
  role:  '',
  imageId: '',
  isValid: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
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