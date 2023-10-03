import React, { ChangeEventHandler, FocusEventHandler } from "react";
import styleClasses from "./CheckboxInput.module.scss";

interface ICheckboxInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  value: boolean | null | undefined;
  defaultChecked?: boolean;
  isValueValid?: boolean;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  readOnly?: boolean;
  required?: boolean;
}

function CheckboxInput(props: ICheckboxInputProps) {
  return (
    <div
      className={`${styleClasses.control} ${
        props.isValueValid === false ? styleClasses.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.children}</label>
      <input
        type="checkbox"
        id={props.id}
        name={props.name}
        checked={props.value ?? undefined}
        onChange={props.onChange}
        onBlur={props.onBlur}
        readOnly={props.readOnly ?? false}
        required={props.required}
        defaultChecked={props.defaultChecked}
      />
    </div>
  );
}

export default CheckboxInput;
