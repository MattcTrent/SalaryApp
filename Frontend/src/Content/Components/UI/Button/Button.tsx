import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onMouseOut?: MouseEventHandler;
  className?: string;
  classNameAddition?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`${props.className ? props.className : styles.button} ${
        props.classNameAddition
      }`}
      type={props.type}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
