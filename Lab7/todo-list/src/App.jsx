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
  const [lastInsertedId, setLastInsertedId] = useState("");

  function locateTask(id, location) {
    const locatedTaskList = tasks.map((task) => {
      if (id === task.id) return { ...task, location };
      return task;
    });
    setTasks(locatedTaskList);
  }

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapURL = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    const smsBody = encodeURIComponent(`My location: ${latitude}, ${longitude}\n${mapURL}`);
    const smsURL = `sms:?&body=${smsBody}`;

    locateTask(lastInsertedId, { latitude, longitude, error: "", mapURL, smsURL });
  };

  const error = () => {
    locateTask(lastInsertedId, {
      latitude: "##",
      longitude: "##",
      error: "unable-to-retrieve",
      mapURL: "#",
      smsURL: "#",
    });
  };

  const geoFindMe = () => {
    if (!navigator.geolocation) {
      locateTask(lastInsertedId, {
        latitude: "##",
        longitude: "##",
        error: "not-supported",
        mapURL: "#",
        smsURL: "#",
      });
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  function addTask(name) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const id = "todo-" + nanoid();

    const newTask = {
      id,
      name: trimmed,
      completed: false,
      photo: false,
      location: { latitude: "##", longitude: "##", error: "##", mapURL: "#", smsURL: "#" },
    };

    setLastInsertedId(id);
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

  function photoedTask(id) {
    console.log("photoedTask", id);
    const photoedTaskList = tasks.map((task) => {
      if (id === task.id) return { ...task, photo: true };
      return task;
    });
    setTasks(photoedTaskList);
  }

  const filteredTasks = useMemo(() => tasks.filter(FILTER_MAP[filter]), [tasks, filter]);

  const taskList = filteredTasks.map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      location={task.location}
      photoedTask={photoedTask}
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

          <Form addTask={addTask} geoFindMe={geoFindMe} />

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