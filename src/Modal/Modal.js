import React, { Fragment, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; /* key is here */
import './modal.css';

export const Modal = ({ children, isOpen = false, onClose }) => {
  const contentRef = useRef();

  useEffect(() => {
    const closeModal = (e) => {
      if (contentRef.current.contains(e.target)) return; //你点击了modal content本身,不做任何行动
      onClose(); //你点击了overlay,关闭modal
    };

    document.addEventListener('mousedown', closeModal);
    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Fragment>
      {createPortal(
        <>
          <div className='overlay' />
          <div className='modal' ref={contentRef} role='dialog'>
            <p>{children}</p>
            <button onClick={onClose}>close</button>
          </div>
        </>,
        document.getElementById('modal-root')
      )}
    </Fragment>
  );
};
