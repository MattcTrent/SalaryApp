import React, { ChangeEventHandler, FocusEventHandler } from "react";
import styleClasses from "./SelectInput.module.css";
import { NameValueObj } from "../../../../Models/UtilModels";

interface ISelectInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  value?: string | undefined;
  defaultValue?: string | undefined;
  values: NameValueObj[];
  validationMessage?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  readOnly?: boolean;
  required?: boolean;
}

function SelectInput(props: ISelectInputProps) {
  const isValueValid = props.validationMessage ? false : true;

  return (
    <div
      className={`${styleClasses.control} ${
        isValueValid === false ? styleClasses.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.children}</label>
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.readOnly}
        required={props.required}
        defaultValue={props.defaultValue}
      >
      <option key={'EmptyOption-'+props.id} value="">
      </option>
        {props.values.map((option) => (
          <option key={option.value} value={option.value}>
            {option.displayName}
          </option>
        ))}
      </select>
      {props.validationMessage && (
        <label style={{ color: "red", fontSize: "0.75rem" }}>
          {props.validationMessage}
        </label>
      )}
    </div>
  );
}

export default SelectInput;
