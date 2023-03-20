import { connect } from 'react-redux';
import { TodoList } from '../TodoList';
import { changeTypeValue } from '../actions/input_actions';
import { addTodo, delTodo } from '../actions/list_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    typeValue: state.typeValue,
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTypeValue: (newTypeValue) => {
      dispatch(changeTypeValue(newTypeValue));
    },
    addTodo: (newItem) => {
      dispatch(addTodo(newItem));
    },
    delTodo: (currentItem) => {
      dispatch(delTodo(currentItem));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
