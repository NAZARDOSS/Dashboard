import React from "react";
import ToDoListHome from "./ToDoListHome";


export default function List() {
    const tasks = [
      { id: 1, text: "Read a documentation", completed: false, deadline: ""},
      { id: 2, text: "Remake css", completed: false, deadline: "" },
      { id: 3, text: "Send for approval", completed: false, deadline: "" },
    ];
  
    return (
      <div>
        <ToDoListHome tasks={tasks} selectedDate={new Date()} />
      </div>
    );
}