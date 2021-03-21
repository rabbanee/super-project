export const initialState = {
  list: [
    {
      id: 1,
      name: "",
      guard_name: "",
      pivot: {},
      updated_at: "",
      created_at: "",
    }
  ],
  isValid: false,
};

const permissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PERMISSION':
      return {
        ...state,
        list: action.list,
        isValid: action.isValid,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default permissionsReducer;