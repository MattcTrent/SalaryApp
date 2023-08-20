import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={`${styles.modalContainer} ${props.className ?? ""}`}>
      {props.children}
    </div>
  );
};

export default Modal;
