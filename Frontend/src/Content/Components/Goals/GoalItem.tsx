import React from "react";
import { toast } from "react-toastify";

import "./GoalItem.css";

interface IGoalItemProps {
  id: number;
  onDelete: (id: number) => void;
  children: React.ReactNode;
}

export default function GoalItem(props: IGoalItemProps) {
  const deleteHandler = () => {
    toast.success("Goal Deleted!");
    props.onDelete(props.id);
  };

  return (
    <li className="goal-item" onClick={deleteHandler}>
      {props.children}
    </li>
  );
}
