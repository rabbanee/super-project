const initialState = {
  isOpen: false,
  title: '',
  description: '',
  type: 'success',
  timeout: 5000,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        
      };
    case 'ERROR':
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