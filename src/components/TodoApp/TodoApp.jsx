import { useState, useEffect } from "react";
import "./TodoApp.css";
import { v4 as uuid } from "uuid";
import sun from "../../assets/images/icon-sun.svg";
import moon from "../../assets/images/icon-moon.svg";
import del from "../../assets/images/icon-cross.svg";

import Header from "../Header/Header";
import AddInput from "../AddInput/AddInput";
import CheckButton from "../CheckButton/CheckButton";
import LeftItems from "../LeftItems/LeftItems";

export default function Todo() {
  const [lightTheme, setLightTheme] = useState(false);
  const [todos, setTodos] = useState([
    { id: uuid(), todo: "Complete online Javascript course", completed: true },
    { id: uuid(), todo: "Jog around the park 3x", completed: false },
    { id: uuid(), todo: "10 minutes meditation", completed: false },
    { id: uuid(), todo: "read for 1 hour", completed: false },
    { id: uuid(), todo: "pick up groceries", completed: false },
    {
      id: uuid(),
      todo: "complete Todo App on Frontend Mentor",
      completed: false,
    },
  ]);
  const [filter, setFilter] = useState("all");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handles
  const handleWindowResize = () => setWindowWidth(window.innerWidth);

  const handleFilter = (filterType) => setFilter(filterType);
  const filteredTodos =
    filter === "completed"
      ? todos.filter((i) => i.completed)
      : filter === "uncompleted"
      ? todos.filter((i) => !i.completed)
      : todos;

  const handleToggleTheme = () => {
    setLightTheme(!lightTheme);
  };

  const addTodo = (item) => {
    setTodos((currentTodos) => {
      return [...currentTodos, { ...item, id: uuid(), completed: false }];
    });
  };

  const handleChecked = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    });
  };

  const handleDeletion = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  document.body.style.backgroundColor = lightTheme
    ? "var(--v-light-greyish-blue)"
    : "var(--v-dark-blue)";
  if (!lightTheme && windowWidth <= "600") {
    document.body.classList.add("bg-mobile-dark");
    document.body.classList.remove("bg-desktop-dark");
    document.body.classList.remove("bg-desktop-light");
    document.body.classList.remove("bg-mobile-light");
  } else if (!lightTheme && windowWidth > "600") {
    document.body.classList.add("bg-desktop-dark");
    document.body.classList.remove("bg-desktop-light");
    document.body.classList.remove("bg-mobile-light");
    document.body.classList.remove("bg-mobile-dark");
  } else if (lightTheme && windowWidth <= "600") {
    document.body.classList.add("bg-mobile-light");
    document.body.classList.remove("bg-desktop-dark");
    document.body.classList.remove("bg-mobile-dark");
    document.body.classList.remove("bg-desktop-light");
  } else if (lightTheme && windowWidth > "600") {
    document.body.classList.add("bg-desktop-light");
    document.body.classList.remove("bg-desktop-dark");
    document.body.classList.remove("bg-mobile-light");
    document.body.classList.remove("bg-mobile-dark");
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={lightTheme ? "light-theme" : "dark-theme"}>
      <div className="TodoApp">
        <nav className="TodoNav flex">
          <Header header="Todo"></Header>
          <button type="button" onClick={handleToggleTheme}>
            <img src={lightTheme ? moon : sun} />
          </button>
        </nav>
        <main>
          <div className="TodoInput flex">
            <CheckButton></CheckButton>

            <AddInput addTodo={addTodo}></AddInput>
          </div>
          <div className="TodoList">
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="TodoItem flex">
                <CheckButton
                  checked={todo.completed}
                  style={{
                    backgroundImage: todo.completed
                      ? "var(--clr-bg-gradient)"
                      : "none",
                  }}
                  handleChange={() => handleChecked(todo.id)}></CheckButton>
                <p
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed
                      ? "var(--completed-text-color)"
                      : "var(--text-color)",
                  }}
                  key={todo.id}>
                  {todo.todo}
                </p>
                <button type="button" onClick={() => handleDeletion(todo.id)}>
                  <img src={del} />
                </button>
              </div>
            ))}
          </div>
        </main>
        <footer className="TodoFooter flex">
          <LeftItems num={todos.filter((i) => !i.completed).length}></LeftItems>
          <div className="CTA flex">
            <button
              type="button"
              style={{ color: filter == "all" && "var(--primary-blue)" }}
              onClick={() => handleFilter("all")}>
              All
            </button>
            <button
              type="button"
              style={{
                color: filter == "uncompleted" && "var(--primary-blue)",
              }}
              onClick={() => handleFilter("uncompleted")}>
              Active
            </button>
            <button
              type="button"
              style={{ color: filter == "completed" && "var(--primary-blue)" }}
              onClick={() => handleFilter("completed")}>
              completed
            </button>
          </div>
          <button type="button" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </footer>
      </div>
    </div>
  );
}
