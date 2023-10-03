import styles from "./TH.module.scss";

interface THProps {
  children?: React.ReactNode;
  className?: string;
}

const TH = (props: THProps) => {
  const className = props.className ? props.className : styles.cell;

  return <th className={className}>{props.children}</th>;
};

export default TH;
