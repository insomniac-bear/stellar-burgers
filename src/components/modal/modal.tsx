import { FC, ReactNode, SyntheticEvent, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalsContainer = document.querySelector("#modals");

interface IModal {
  title: string;
  closePopup: () => void;
  children: ReactNode;
}

const Modal: FC<IModal> = ({ title, closePopup, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", onEscKeyPress);

    return () => {
      document.removeEventListener("keydown", onEscKeyPress);
    };
  }, []);

  const onModalClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
  };

  const onEscKeyPress = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      closePopup();
    }
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={closePopup}>
      <div
        className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}
        onClick={onModalClick}
      >
        <header className={modalStyles.header}>
          <h3 className="text text_type_main-large">{title}</h3>
          <CloseIcon type="primary" onClick={closePopup} />
        </header>
        {children}
      </div>
    </ModalOverlay>,
    modalsContainer!
  );
};

export default Modal;
