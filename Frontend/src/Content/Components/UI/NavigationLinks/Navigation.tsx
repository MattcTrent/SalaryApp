import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import buttonStyles from "../Button/Button.module.css";
import React from "react";

interface INavLinkProps {
  children: React.ReactNode;
  path: string;
  onClick?: () => void;
  className?: string;
  classNameAddition?: string;
  activeClassName?: string;
  activeClassNameAddition?: string;
  liClassName?: string;
  liClassNameAddition?: string;
  end?: boolean;
  disabled?: boolean;
  isButton?: boolean;
}

function Navigation(props: INavLinkProps) {
  const className = `${
    props.className
      ? props.className
      : props.isButton
      ? (props.disabled ? `${buttonStyles.button} ${buttonStyles.buttonDisabled}` : buttonStyles.button)
      : styles.navLink
  } ${props.classNameAddition}`;
  const activeClassName = `${
    props.activeClassName ? props.activeClassName : styles.active
  } ${props.activeClassNameAddition}`;
  const liClassName = `${
    props.liClassName ? props.liClassName : styles.navItem
  } ${props.liClassNameAddition}`;

  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <>
      {props.isButton ? (
        <>
          {props.disabled ? (
            <div className={className}>{props.children}</div>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive ? `${className} ${activeClassName}` : className
              }
              end={props.end}
              to={props.path}
              onClick={handleClick}
            >
              {props.children}
            </NavLink>
          )}
        </>
      ) : (
        <li className={liClassName}>
          {props.disabled ? (
            <div className={className}>{props.children}</div>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive ? `${className} ${activeClassName}` : className
              }
              end={props.end}
              to={props.path}
              onClick={handleClick}
            >
              {props.children}
            </NavLink>
          )}
        </li>
      )}
    </>
  );
}

export default Navigation;
