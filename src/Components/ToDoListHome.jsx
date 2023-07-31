import React, { useState, useCallback, useMemo } from "react";
import Calendar from "./Calendar";
import styles from "./ToDoList.scss";
import { parse } from "date-fns";

export default function ToDoListHome({ tasks }) {
  const [todos, setTodos] = useState(tasks);
  const [newTodoText, setNewTodoText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDeleteTask = useCallback((taskId) => {
    setTodos((prevTodos) => prevTodos.filter((task) => task.id !== taskId)); //delete создать confirm
  }, []);

  const handleTaskComplete = useCallback((taskId) => {
    setTodos((prevTodos) =>
      prevTodos.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task //сортировка по checkbox filter?
      )
    );
  }, []);

  const addTodo = useCallback(() => { //создание формы
    if (!newTodoText.trim()) return;

    const newTodo = { 
      id: Date.now(),
      text: newTodoText,
      completed: false,
      deadline: parse(
        selectedDate.toLocaleDateString(),
        "dd.MM.yyyy",
        new Date()
      ).getTime(),
    };

    setTodos((todos) => [...todos, newTodo]);
    setNewTodoText("");
  }, [newTodoText, selectedDate]);

  const sortedTasks = useMemo(() => { // сортировка 
    let completedTasks = [];
    let uncompletedTasks = [];

    todos.forEach((task) => {
      if (task.completed) {
        completedTasks.push(task);
      } else {
        uncompletedTasks.push(task);
      }
    });

    // const now = Date.now();
    const sortByDeadline = (a, b) => a.deadline - b.deadline;
    const sortByDateCreated = (a, b) => a.createdAt - b.createdAt;

    const sortedUncompleted = uncompletedTasks
      .sort(sortByDeadline)
      .sort(sortByDateCreated);

    const sortedCompleted = completedTasks
      .sort(sortByDeadline)
      .sort(sortByDateCreated);

    return [...sortedUncompleted, ...sortedCompleted];
  }, [todos]);

  return (
    <div>
      <h1>My Tasks</h1>
      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskComplete(task.id)}
              />
              {task.text}
            </label>
            <div
              className={`deadline ${
                task.deadline < Date.now() ? "red" : ""
              }`}
            >
              {new Date(task.deadline).toLocaleDateString() ===
              "Invalid Date"
                ? ""
                : new Date(task.deadline).toLocaleDateString()}
            </div>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Calendar
        className
        value={selectedDate}
        onChange={(selectedDate) => setSelectedDate(selectedDate)}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="Name of your plan"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
