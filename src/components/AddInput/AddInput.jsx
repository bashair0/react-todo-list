import { useState } from "react";
import "./AddInput.css";

export default function AddInput({ addTodo }) {
  const [inputData, setInputData] = useState({ todo: "" });

  const handleChange = (evt) => {
    setInputData((currentData) => {
      return {
        ...currentData,
        [evt.target.name]: [evt.target.value],
      };
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTodo(inputData);
    setInputData({ todo: "" });
  };
  return (
    <form action="post" onSubmit={handleSubmit} className="Form">
      <input
        className="AddInput"
        type="text"
        placeholder="Create a new todo..."
        id="todo"
        name="todo"
        value={inputData.todo}
        onChange={handleChange}
      />
    </form>
  );
}
