import styles from "./ExpenseDate.module.css";

export default function ExpenseDate(props: { date: Date }) {
  const month = new Date(props.date).toLocaleString("en-UK", { month: "long" });
  const day = new Date(props.date).toLocaleString("en-UK", { day: "2-digit" });
  const year = new Date(props.date).getFullYear();

  return (
    <div className={styles.expenseDate}>
      <div className={styles.month}>{month}</div>
      <div className={styles.year}>{year}</div>
      <div className={styles.day}>{day}</div>
    </div>
  );
}
