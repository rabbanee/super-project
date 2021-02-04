const initialState = {
  isOpen: false,
  title: '',
  description: '',
  type: '',
  timeout: 5000,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        description: '',
        ...action.alert,
        isOpen: true,
      };
    case 'CLOSE_ALERT':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}

export default alertReducer;