import React from 'react';
import store from './store/store';
import { updateTypeInput } from './actions/typeInputAction';
import { addTodo, delTodo } from './actions/ListAction';

const Item = ({ item, delTodo }) => {
  const onClickHandle = () => {
    delTodo(item.id);
  };
  return <li onClick={onClickHandle}>{item.content}</li>;
};

const List = ({ list, delTodo }) => {
  return (
    <ul>
      {list.map((item) => {
        return <Item key={item.id} item={item} delTodo={delTodo} />;
      })}
    </ul>
  );
};

const TypeInputAndBtn = ({ typeValue, updateTypeValue, addTodo }) => {
  const handleOnChange = (e) => {
    updateTypeValue(e.target.value);
  };
  const handleOnClick = () => {
    addTodo({
      content: typeValue,
      id: Math.random() * 100,
    });
  };
  return (
    <div>
      <input type='text' value={typeValue} onChange={handleOnChange} />
      <button onClick={handleOnClick}> Add </button>
    </div>
  );
};

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   typeValue: "",
    //   list: mockList
    // };

    // state data from store.
    this.state = store.getState();
  }

  componentDidMount() {
    // after reducer return a new state, then component will update UI by subscribe store
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange = () => {
    this.setState(store.getState());
  };
  // updateTypeValue = (newValue) => {
  //   this.setState({
  //     typeValue: newValue
  //   });
  // };
  // addTodo = (newTodo) => {
  //   console.log(newTodo);
  //   this.setState({
  //     list: [...this.state.list, newTodo],
  //     typeValue: ""
  //   });
  // };
  render() {
    const { typeValue, list } = this.state;
    return (
      <div className='App'>
        <TypeInputAndBtn
          typeValue={typeValue}
          updateTypeValue={updateTypeInput}
          addTodo={addTodo}
          // updateTypeValue={this.updateTypeValue}
          // addTodo={this.addTodo}
        />
        <List list={list} delTodo={delTodo} />
      </div>
    );
  }
}
