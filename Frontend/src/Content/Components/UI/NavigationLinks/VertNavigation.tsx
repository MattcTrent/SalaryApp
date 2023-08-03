import styles from "./VertNavigation.module.css";
import React from "react";
import Navigation from "./Navigation";

interface VertNavigationProps {
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

function VertNavigation(props: VertNavigationProps) {
  const className = `${props.className ? props.className : styles.navLink}`;
  const activeClassName = `${
    props.activeClassName ? props.activeClassName : styles.active
  }`;
  const liClassName = `${
    props.liClassName ? props.liClassName : styles.navItem
  }`;

  return (
    <Navigation
      path={props.path}
      onClick={props.onClick}
      className={className}
      classNameAddition={props.classNameAddition}
      activeClassName={activeClassName}
      activeClassNameAddition={props.activeClassNameAddition}
      liClassName={liClassName}
      liClassNameAddition={props.liClassNameAddition}
      end={props.end}
      disabled={props.disabled}
      isButton={props.isButton}
    >
      {props.children}
    </Navigation>
  );
}

export default VertNavigation;
