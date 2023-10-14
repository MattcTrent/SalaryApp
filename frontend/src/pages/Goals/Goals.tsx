import { useState } from "react";

import GoalList from "@/components/Goals/GoalList";
import GoalInput from "@/components/Goals/GoalInput";
import "./Goals.css";
import { Goal } from "@/types/GoalModels";

export default function GoalsPage() {
  const [courseGoals, setCourseGoals] = useState<Goal[]>([]);

  function getNextId(): number {
    let latestExpense: Goal = { id: 0, text: "" };
    if (courseGoals.length > 0) {
      latestExpense = courseGoals.reduce((prevGoal: Goal, nextGoal: Goal) =>
        (prevGoal?.id?.valueOf() || 0) > (nextGoal?.id?.valueOf() || 0)
          ? prevGoal
          : nextGoal
      );
    }

    return (latestExpense?.id || 0) + 1;
  }

  function addGoalHandler(enteredText: string) {
    setCourseGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: getNextId() });
      return updatedGoals;
    });
  }

  function deleteItemHandler(goalId: number) {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  }

  let content = (
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = <GoalList items={courseGoals} onDeleteItem={deleteItemHandler} />;
  }

  return (
    <div className="goal-Container">
      <section id="goal-form">
        <GoalInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">
        {content}
        {/* {courseGoals.length > 0 && (
          <GoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>
    </div>
  );
}
