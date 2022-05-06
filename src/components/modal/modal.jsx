import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

const modalsContainer = document.querySelector('#modals');

const Modal = (props) => {
  const { title, closePopup, onEscKeydown, children } = props;
  useEffect(()=> {
    document.addEventListener('keydown', onEscKeydown);

    return((() => {
      document.removeEventListener('keydown', onEscKeydown);
    }));
  }, []);

  return ReactDOM.createPortal(
      <ModalOverlay onClick={closePopup}>
        <div className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}>
          <header className={modalStyles.header}>
            <h3 className='text text_type_main-large'>
              {title}
            </h3>
            <CloseIcon type='primary' onClick={closePopup} />
          </header>
          {children}
        </div>
      </ModalOverlay>,
    modalsContainer
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  closePopup: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
