import React from "react";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  onCloseClick: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={`${styles.modalContainer} ${props.className ?? ""}`}>
      {props.children}
      <Button type="button" onClick={props.onCloseClick}>
        Close
      </Button>
    </div>
  );
};

export default Modal;
