import React, { Fragment } from 'react';
import { Modal } from './Modal';

export class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleToggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    return (
      <Fragment>
        <button onClick={this.handleToggle}> showModal</button>
        {this.state.show && (
          <Modal>
            <div className='overlay' />
            <div className='modal'>
              modal
              <button onClick={this.handleToggle}>close</button>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}
