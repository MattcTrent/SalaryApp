import React, { useState } from "react";
import styles from "./SectionHeading.module.scss";
import { IoMdCreate } from "react-icons/io";
import Button from "../Button/Button";

interface SectionHeadingProps {
  children: React.ReactNode;
  generateButtons?: () => JSX.Element[];
}

export default function SectionHeading(props: SectionHeadingProps) {
  const [showButtons, setShowButtons] = useState<boolean>(false);

  function mouseOverHandler(event: React.MouseEvent<HTMLDivElement>) {
    if (showButtons === false) {
      setShowButtons(true);
    }
  }

  function mouseOutHandler(event: React.MouseEvent<HTMLDivElement>) {
    if (showButtons === true) {
      setShowButtons(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{props.children}</h1>
      <div
        className={styles.buttonDiv}
        onMouseEnter={mouseOverHandler}
        onMouseLeave={mouseOutHandler}
      >
        {props.generateButtons && (
          <Button classNameAddition={styles.newButton}>
            <IoMdCreate size={20} /> New
            {showButtons && (
              <div className={styles.navButtons}>{props.generateButtons()}</div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
