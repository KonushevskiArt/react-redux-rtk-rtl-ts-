import React from 'react';
import style from './style.module.scss';

interface IModalProps {
  closeHandler: () => void;
  children?: React.ReactNode;
}

const Modal = ({ closeHandler, children }: IModalProps) => {
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div className={style.modal} data-testid="overlay" onClick={closeHandler}>
      <div className={style.modalContent} data-testid="modal-content" onClick={clickHandler}>
        {children}
        <svg
          onClick={closeHandler}
          className={style.icon}
          width="20"
          height="20"
          fill="var(--text-color-white)"
          data-testid="modal-close"
        >
          <use xlinkHref="sprite.svg#close-ic"></use>
        </svg>
      </div>
    </div>
  );
};

export default Modal;
