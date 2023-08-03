import React, { ChangeEventHandler, FocusEventHandler } from "react";
import styleClasses from "./StringInput.module.css";

interface StringInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  type: string;
  value?: string;
  defaultValue?: string;
  validationMessage?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

function StringInput(props: StringInputProps) {
  const isValueValid = props.validationMessage ? false : true;
  return (
    <div
      className={`${styleClasses.control} ${
        isValueValid === false ? styleClasses.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.children}</label>
      <div className={styleClasses.controlInput}>
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value ?? undefined}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readOnly ?? false}
          disabled={props.disabled ?? false}
          required={props.required}
          defaultValue={props.defaultValue}
        />
      </div>
      {props.validationMessage && (
        <label style={{ color: "red", fontSize: "0.75rem" }}>
          {props.validationMessage}
        </label>
      )}
    </div>
  );
}

export default StringInput;
