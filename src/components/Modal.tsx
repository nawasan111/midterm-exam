import "../assets/css/modal.css";
import { MouseEvent, ReactElement } from "react";

export interface ModalProps {
  isOpen: boolean;
  modalLable: string | ReactElement;
  children: string | ReactElement | ReactElement[] | React.ReactNode;
  custom_modal?: string;
  onClose: Function;
}
function Modal({
  isOpen,
  modalLable,
  children,
  custom_modal,
  onClose,
}: ModalProps) {
  const handleClose = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    // @ts-ignore
    if (e.target.className === "modalContainer") {
      onClose();
    }
    return null;
  };

  if (isOpen) {
    return (
      <div className="modalContainer" onClick={handleClose}>
        <div className={`modalyo ${custom_modal}`}>
          <div className="modal__head">
            <h2>{modalLable}</h2>
            <span className="modal__close" onClick={() => onClose()}>
              x
            </span>
          </div>
          {children}
        </div>
      </div>
    );
  }
  return <></>;
}

export default Modal;
