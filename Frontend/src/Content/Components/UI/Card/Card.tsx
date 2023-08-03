import styles from "./Card.module.css";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card(props: CardProps) {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
}
