const initialState = {
  typeValue: ' ',
  list: [
    // {
    //   content: "learn css",
    //   id: "1"
    // },
    // {
    //   content: "learn JS",
    //   id: "2"
    // }
  ],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TYPE_INPUT': {
      return {
        ...state,
        typeValue: action.newValue,
      };
    }
    case 'ADD_TO_DO': {
      return {
        ...state,
        typeValue: '',
        list: [...state.list, action.newTodo],
      };
    }
    case 'DEL_TO_DO': {
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      };
    }
    default:
      return state;
  }
};

export default appReducer;
