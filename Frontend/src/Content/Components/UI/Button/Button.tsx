import React, { MouseEventHandler } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onMouseOut?: MouseEventHandler;
  className?: string;
  classNameAddition?: string;
  disabled?: boolean;
  colourStyle?: "positive" | "negative";
}

export default function Button(props: ButtonProps) {
  const buttonStyle = clsx(
    props.className ? props.className : styles.button,
    props.classNameAddition ?? "",
    {
      [styles.positive]: props.colourStyle === "positive",
      [styles.negative]: props.colourStyle === "negative",
    }
  );

  return (
    <button
      className={buttonStyle}
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
