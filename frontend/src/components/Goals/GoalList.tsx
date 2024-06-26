import GoalItem from "./GoalItem";
import "./GoalList.css";
import { Goal } from "@/types/GoalModels";

interface IGoalListProps {
  items: Goal[];
  onDeleteItem: (id: number) => void;
}

export default function GoalList(props: IGoalListProps) {
  return (
    <ul className="goal-list">
      {props.items.map((goal) => (
        <GoalItem key={goal.id} id={goal.id} onDelete={props.onDeleteItem}>
          {goal.text}
        </GoalItem>
      ))}
    </ul>
  );
}
