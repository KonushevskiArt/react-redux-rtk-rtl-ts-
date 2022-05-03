import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  children?: React.ReactNode;
}

// const modalRoot = document.getElementById('portal-root') as HTMLDivElement;
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

const Portal = ({ children }: IPortalProps) => {
  const el = document.createElement('div');
  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
};

export default Portal;
