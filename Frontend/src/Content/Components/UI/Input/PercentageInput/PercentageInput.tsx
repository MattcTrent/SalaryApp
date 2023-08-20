import React, { ChangeEventHandler, FocusEventHandler } from "react";
import styleClasses from "./PercentageInput.module.scss";

interface IPercentageInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  type: string;
  value: number | null;
  defaultValue?: number | undefined;
  validationMessage?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  readOnly?: boolean;
  required?: boolean;
}

function PercentageInput(props: IPercentageInputProps) {
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
          required={props.required}
          defaultValue={props.defaultValue}
        />
        <span className={styleClasses.adornment}>%</span>
      </div>
      {props.validationMessage && (
        <label style={{ color: "red", fontSize: "0.75rem" }}>
          {props.validationMessage}
        </label>
      )}
    </div>
  );
}

export default PercentageInput;
