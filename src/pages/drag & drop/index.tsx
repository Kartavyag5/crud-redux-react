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
      <div className="kanban-column">
        <div className="kanban-column-header">To Do</div>
        <div
          className="kanban-column-content"
          onDrop={(event) => onDrop(event, "todo")}
          onDragOver={(event) => event.preventDefault()}
        >
          {renderTasks("todo")}
        </div>
      </div>
      <div className="kanban-column">
        <div className="kanban-column-header">In Progress</div>
        <div
          className="kanban-column-content"
          onDrop={(event) => onDrop(event, "inProgress")}
          onDragOver={(event) => event.preventDefault()}
        >
          {renderTasks("inProgress")}
        </div>
      </div>
      <div className="kanban-column">
        <div className="kanban-column-header">Done</div>
        <div
          className="kanban-column-content"
          onDrop={(event) => onDrop(event, "done")}
          onDragOver={(event) => event.preventDefault()}
        >
          {renderTasks("done")}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
