const initialState = {
  typeValue: '',
  list: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TYPE_VALUE':
      return {
        ...state,
        typeValue: action.newTypeValue,
      };
    case 'ADD_TO_DO':
      return {
        ...state,
        typeValue: '',
        list: [...state.list, action.newItem],
      };
    case 'DELETE_TO_DO':
      return {
        ...state,
        list: [...state.list].filter(
          (item) => item.id !== action.currentItem.id
        ),
      };
    default:
      return state;
  }
};

export default appReducer;
