import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import FilterButton from "./components/FilterButton";

function usePersistedState(key, fallbackValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : fallbackValue;
    } catch {
      return fallbackValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
  const [tasks, setTasks] = usePersistedState("tasks", props.tasks ?? []);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newTask = {
      id: "todo-" + nanoid(),
      name: trimmed,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTaskCompleted(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(id, newName) {
    const trimmed = newName.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name: trimmed } : task)),
    );
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter(FILTER_MAP[filter]);
  }, [tasks, filter]);

  const taskList = filteredTasks.map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const remainingCount = tasks.filter((t) => !t.completed).length;
  const tasksNoun = remainingCount !== 1 ? "tasks" : "task";
  const headingText = `${remainingCount} ${tasksNoun} remaining`;

  return (
    <>
      <Navbar />

      <main className="page">
        <div className="todoapp stack-large">
          <h1>Todo List</h1>

          <Form addTask={addTask} />

          <div className="filters btn-group stack-exception">
            {FILTER_NAMES.map((name) => (
              <FilterButton
                key={name}
                name={name}
                isPressed={name === filter}
                setFilter={setFilter}
              />
            ))}
          </div>

          <h2 id="list-heading">{headingText}</h2>

          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {taskList}
          </ul>
        </div>
      </main>
    </>
  );
}
