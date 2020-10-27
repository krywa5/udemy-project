import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import bemCssModules from 'bem-css-modules';

import { default as ModalStyles } from './Modal.module.scss';

const style = bemCssModules(ModalStyles);

const Modal = ({ children, handleOnClose, isOpen, shouldBeCloseOnOutsideClick }) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    const { current: modal } = modalRef;

    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      modal.showModal();
    } else if (previousActiveElement.current) {
      modal.close();
      previousActiveElement.current.focus();
    }

  }, [isOpen]);

  useEffect(() => {
    const { current: modal } = modalRef;

    const handleCancel = e => {
      e.preventDefault();
      handleOnClose();
    };

    modal.addEventListener('cancel', handleCancel);

    return () => { // odmontowanie lsitenera gdy komponent jest wyłączony
      modal.removeEventListener('cancel', handleCancel);
    }
  }, [handleOnClose]);



  const handleOutsideClick = e => {
    const { current } = modalRef;

    if (shouldBeCloseOnOutsideClick && e.target === current) {
      handleOnClose();
    }
  }

  return ReactDOM.createPortal(( // portal umożliwia generowanie wybranych elementów w innym miejscu niż #app
    <dialog className={style()} ref={modalRef} onClick={handleOutsideClick}>
      {children}
    </dialog>
  ), document.body);
}

export default Modal;