import "../assets/css/modal.css";
import { MouseEvent, ReactElement } from "react";

export interface ModalProps {
  open: unknown;
  modalLable: string | ReactElement;
  children: string | ReactElement | ReactElement[] | React.ReactNode;
  custom_modal?: unknown;
  onClose: Function;
}
function Modal({
  open,
  modalLable,
  children,
  custom_modal,
  onClose,
}: ModalProps) {
  const handleClose = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (e.currentTarget.className === "modalContainer") {
      onClose();
    }
    return null;
  };

  if (open) {
    return (
      <div className="modalContainer" onClick={handleClose}>
        <div className={`modal ${custom_modal}`}>
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
