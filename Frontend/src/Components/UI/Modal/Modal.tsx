import React, { MouseEventHandler } from "react";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  onCloseClick: MouseEventHandler;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={`${styles.modalContainer} ${props.className ?? ""}`}>
      {props.children}
      <Button colourStyle="negative" type="button" onClick={props.onCloseClick}>
        Close
      </Button>
    </div>
  );
};

export default Modal;
