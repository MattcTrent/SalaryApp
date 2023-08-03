import React, { ChangeEventHandler, FocusEventHandler } from "react";
import styleClasses from "./CurrencyInput.module.css";

interface ICurrencyInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  type: string;
  value?: number | null;
  defaultValue?: number | undefined;
  validationMessage?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  readOnly?: boolean;
  required?: boolean;
}

const currency = "£";

function CurrencyInput(props: ICurrencyInputProps) {
  const isValueValid = props.validationMessage ? false : true;

  return (
    <div
      className={`${styleClasses.control} ${
        isValueValid === false ? styleClasses.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.children}</label>
      <div className={styleClasses.controlInput}>
        <span className={styleClasses.adornment}>{currency}</span>
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value ?? undefined}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readOnly ?? false}
          required={props.required}
          step="0.01"
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

export default CurrencyInput;
