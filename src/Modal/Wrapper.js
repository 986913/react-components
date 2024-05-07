import React, { Fragment, useState } from 'react';
import { Modal } from './Modal';

export const ModalWrapper = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(!showModal);

  return (
    <Fragment>
      <button onClick={handleClick}>show modal</button>

      {/* 注意 createPortal的使用： */}
      <Modal isOpen={showModal} onClose={handleClick}>
        modal body text
      </Modal>
    </Fragment>
  );
};
