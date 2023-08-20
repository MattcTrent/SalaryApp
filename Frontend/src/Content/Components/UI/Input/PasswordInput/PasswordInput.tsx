import React, { ChangeEventHandler, FocusEventHandler, useState } from "react";
import styleClasses from "./PasswordInput.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IPasswordInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  value?: number | string | null;
  defaultValue?: string | undefined;
  validationMessage?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

function PasswordInput(props: IPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const isValueValid = props.validationMessage ? false : true;

  return (
    <div
      className={`${styleClasses.control} ${
        props.readOnly !== true && isValueValid === false
          ? styleClasses.invalid
          : ""
      }`}
    >
      <label htmlFor={props.id}>{props.children}</label>
      <div className={styleClasses.controlInput}>
        <input
          type={showPassword ? "text" : "password"}
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
        {!((props.readOnly ?? false) || (props.disabled ?? false)) && (
          <button
            className={styleClasses.visibilityButton}
            type="button"
            onClick={handleClickShowPassword}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        )}
        {props.validationMessage && (
          <label style={{ color: "red", fontSize: "0.75rem" }}>
            {props.validationMessage}
          </label>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
