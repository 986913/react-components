import React from 'react';
import './todolist.css';

const Header = () => {
  return <h2>To-do List </h2>;
};
class Input extends React.Component {
  handleOnChange = (e) => {
    const { changeTypeText, currentItem } = this.props;
    changeTypeText(e.target.value, currentItem);
  };
  render() {
    const { typeValue } = this.props;
    return (
      <input type='text' value={typeValue} onChange={this.handleOnChange} />
    );
  }
}
class Button extends React.Component {
  handleOnClick = () => {
    const {
      typeValue,
      addTodo,
      delTodo,
      editTodo,
      saveEdit,
      cancelEdit,
      orginalList,
      text,
      currentItem,
    } = this.props;
    switch (text) {
      case 'add':
        addTodo({
          content: typeValue,
          id: Math.random() * 100,
          isEdit: false,
        });
        break;
      case 'delete':
        delTodo(currentItem);
        break;
      case 'edit':
        editTodo(currentItem);
        break;
      case 'save':
        saveEdit(currentItem);
        break;
      case 'cancel':
        cancelEdit(currentItem, orginalList);
        break;
      default:
        return '';
    }
  };

  btnColor = () => {
    const { text } = this.props;
    switch (text) {
      case 'add':
        return 'addBtn';
      case 'delete':
        return 'deleteBtn';
      case 'edit':
        return 'editBtn';
      case 'save':
        return 'saveBtn';
      case 'cancel':
        return 'cancelBtn';
      default:
        return '';
    }
  };
  render() {
    const { text } = this.props;
    return (
      <button className={this.btnColor()} onClick={this.handleOnClick}>
        {text}
      </button>
    );
  }
}
const Item = ({ item }) => {
  return (
    <div>
      <li key={item.id}> {item.content}</li>
    </div>
  );
};
class List extends React.Component {
  render() {
    const { list, delTodo, editTodo, changeTypeText, saveEdit, cancelEdit } =
      this.props;
    return (
      <ul>
        {list.map((item) => {
          return (
            <div key={item.id} className='itemContainer'>
              {item.isEdit ? (
                <Input
                  currentItem={item}
                  typeValue={item.content}
                  changeTypeText={changeTypeText}
                />
              ) : (
                <Item item={item} />
              )}

              {item.isEdit ? (
                <>
                  <Button text='save' currentItem={item} saveEdit={saveEdit} />
                  <Button
                    text='cancel'
                    currentItem={item}
                    orginalList={list}
                    cancelEdit={cancelEdit}
                  />
                </>
              ) : (
                <Button text='edit' editTodo={editTodo} currentItem={item} />
              )}

              <Button text='delete' delTodo={delTodo} currentItem={item} />
            </div>
          );
        })}
      </ul>
    );
  }
}

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      listData: [],
      originalTodoText: '',
    };
  }

  changeTypeText = (newTypeValue, item) => {
    if (item) {
      const newList = this.state.listData.map((each) => {
        if (each.content === item.content) each.content = newTypeValue;
        return each;
      });
      this.setState({
        listData: newList,
      });
    } else {
      this.setState({
        inputText: newTypeValue,
      });
    }
  };

  addTodo = (newItem) => {
    if (newItem.content) {
      this.setState({
        listData: [...this.state.listData, newItem],
        inputText: '',
      });
    } else alert('please type to do');
  };

  delTodo = (item) => {
    this.setState({
      listData: this.state.listData.filter((each) => each.id !== item.id),
    });
  };

  editTodo = (item) => {
    const newList = this.state.listData.map((each) => {
      if (each.id === item.id) {
        each.isEdit = true;
        this.setState({
          originalTodoText: item.content,
        });
      }
      return each;
    });

    this.setState({
      listData: newList,
    });
  };

  saveEdit = (item) => {
    const newList = this.state.listData.map((each) => {
      if (each.id === item.id) each.isEdit = false;
      return each;
    });

    this.setState({
      listData: newList,
    });
  };

  cancelEdit = (item, originalText) => {
    const newList = this.state.listData.map((each) => {
      if (each.id === item.id) {
        each.content = this.state.originalTodoText;
        each.isEdit = false;
      }
      return each;
    });

    this.setState({
      listData: newList,
    });
  };

  render() {
    const { listData, inputText } = this.state;
    return (
      <div className='App'>
        <Header />

        <div>
          <Input typeValue={inputText} changeTypeText={this.changeTypeText} />
          <Button text='add' typeValue={inputText} addTodo={this.addTodo} />
        </div>

        <List
          list={listData}
          delTodo={this.delTodo}
          editTodo={this.editTodo}
          cancelEdit={this.cancelEdit}
          saveEdit={this.saveEdit}
          changeTypeText={this.changeTypeText}
        />
      </div>
    );
  }
}
