import React, { useState } from "react";

import Button from "./UI/Button";
import styles from "./GoalInput.module.scss";
import { toast } from "react-toastify";

interface IGoalInputProps {
  onAddGoal: (goal: string) => void;
}

export default function GoalInput(props: IGoalInputProps) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValue] = useState(true);

  function goalInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.trim().length > 0) {
      setIsValue(true);
    }

    setEnteredValue(event.target.value);
  }

  function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (enteredValue.trim().length === 0) {
      setIsValue(false);
      return toast.error("Text required for new goal.");
    }

    props.onAddGoal(enteredValue);

    ClearForm();
  }

  function ClearForm() {
    setEnteredValue("");
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        <input
          type="text"
          onChange={goalInputChangeHandler}
          value={enteredValue}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
}
