import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
export default function Modal({
  title,
  className,
  onClose,
  children,
}: {
  title?: any | undefined;
  className?: String | undefined;
  onClose?: (() => void) | undefined;
  children: ReactNode;
}) {
  useEffect(
    () => {
      document.body.classList.add('body-modal');

      return () => {
        document.body.classList.remove('body-modal');
      };
    },
    //eslint-disable-next-line
    []
  );

  return ReactDOM.createPortal(
    <>
      <div className='modal-container'>
        <div className='modal-blocker'></div>
        <div className={'modal-content ' + className}>
          <div className='modal-content-header'>
            <div className='header-text'>{title}</div>
            {onClose !== undefined && (
              <FontAwesomeIcon
                className='close-icon'
                icon={faTimes as IconProp}
                onClick={onClose}
              />
            )}
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal') as HTMLElement
  );
}
