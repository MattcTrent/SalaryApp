import styles from "./TD.module.css";

interface TDProps {
  children?: React.ReactNode;
}

const TD = (props: TDProps) => {
  return <td className={styles.cell}>{props.children}</td>;
};

export default TD;
