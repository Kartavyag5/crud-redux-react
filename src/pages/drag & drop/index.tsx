import React, { useState } from "react";
import "./grid.css";

interface Task {
  id: string;
  title: string;
  status: string;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "task1", title: "Task 1", status: "todo" },
    { id: "task2", title: "Task 2", status: "todo" },
    { id: "task3", title: "Task 3", status: "inProgress" },
    { id: "task4", title: "Task 4", status: "inProgress" },
    { id: "task5", title: "Task 5", status: "done" },
    { id: "task6", title: "Task 6", status: "done" },
  ]);

  const StatusArr = ["todo", "inProgress", "done"];

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: string
  ) => {
    const taskId = event.dataTransfer.getData("text");
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    event.dataTransfer.setData("text", taskId);
  };

  const renderTasks = (status: string) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    return filteredTasks.map((task) => (
      <div
        key={task.id}
        className="kanban-task"
        draggable
        onDragStart={(event) => onDragStart(event, task.id)}
      >
        {task.title}
      </div>
    ));
  };

  return (
    <div className="kanban-board">
      {StatusArr.map((status) => (
        <div className="kanban-column">
          <div className="kanban-column-header">{status}</div>
          <div
            className="kanban-column-content"
            onDrop={(event) => onDrop(event, status)}
            onDragOver={(event) => event.preventDefault()}
          >
            {renderTasks(status)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
