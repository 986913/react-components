import React from 'react';

class Button extends React.Component {
  handleOnClick = () => {
    const { typeValue, addTodo, text, currentItem, delTodo } = this.props;
    switch (text) {
      case 'add':
        addTodo({
          id: Math.random() * 10,
          content: typeValue,
          isEdit: false,
        });
        return;
      case 'delete':
        delTodo(currentItem);
        return;
      default:
        return '';
    }
  };
  render() {
    const { text } = this.props;
    return <button onClick={this.handleOnClick}> {text} </button>;
  }
}
const Header = () => <h2> To-do List </h2>;
class Input extends React.Component {
  handleOnchange = (e) => {
    const { changeTypeValue } = this.props;
    changeTypeValue(e.target.value);
  };

  handleOnKeyDown = (e) => {
    const { addTodo, typeValue } = this.props;
    if (e.keyCode === 13) {
      addTodo({
        id: Math.random() * 10,
        content: typeValue,
        isEdit: false,
      });
    }
  };
  render() {
    const { typeValue } = this.props;
    return (
      <input
        value={typeValue}
        onChange={this.handleOnchange}
        onKeyDown={this.handleOnKeyDown}
      />
    );
  }
}
class Item extends React.Component {
  render() {
    const { item } = this.props;
    return <li key={item.id}>{item.content}</li>;
  }
}
class List extends React.Component {
  render() {
    const { list, delTodo } = this.props;
    return (
      <ul>
        {list.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <Item key={item.id} item={item} />
              <Button text='delete' currentItem={item} delTodo={delTodo} />
            </React.Fragment>
          );
        })}
      </ul>
    );
  }
}

export class TodoList extends React.Component {
  render() {
    const { typeValue, list, changeTypeValue, addTodo, delTodo } = this.props;
    return (
      <div className='App'>
        <Header />
        <div>
          <Input
            typeValue={typeValue}
            changeTypeValue={changeTypeValue}
            addTodo={addTodo}
          />
          <Button text='add' typeValue={typeValue} addTodo={addTodo} />
        </div>
        <List list={list} delTodo={delTodo} />
      </div>
    );
  }
}
