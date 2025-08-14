
import { useState, useRef , useEffect} from "react";
import "../../public/style.css";

export default function Main() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect (() => { 
    localStorage.setItem("tasks" , JSON.stringify(tasks));
  } , [tasks])

  function handelAdd(e) {
    e.preventDefault();
    if (input !== "") {
      setTasks([...tasks, { id: Date.now(), title: input, completed: false }]);
    } else {
      alert("enter your task");
    }
    setInput("")
  }

  const changeClass = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handelReset = (e) => {
    e.preventDefault();
    setTasks([]);
  };

  const handelDelete = (id) => {
    let newTasks = tasks.filter((ele) => {
      return ele.id !== id;
    });
    setTasks(newTasks);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setInput(taskToEdit.title);
    setEditId(id);

    inputRef.current.focus();
    console.log(input);
  };

  const saveEdite = (e) => {
    e.preventDefault();

    setTasks(tasks.map((t) => 
      t.id === editId ? { ...t , title: input }: t 
    ))
    setEditId(null);
    setInput("");
  };
  return (
    <div className=" box flex">
      <div className="content">
        <h1>Add Your Tasks !</h1>
        {tasks.length == 0 ? (
          <p
            style={{ margin: "2rem 1rem", fontSize: "20px", color: "#D5D7D6" }}
          >
            No Tasks ...{" "}
          </p>
        ) : (
          ""
        )}

        {tasks.map((ele) => {
          return (
            <div
              key={ele.id}
              className={ele.completed == false ? "task" : "click"}
            >
              <div className="left-side">
                <span className="icon-document-edit"></span>
                <span className="title">{ele.title}</span>
              </div>
              <div className="right-side">
                <span
                  className="icon-trash"
                  onClick={() => {
                    handelDelete(ele.id);
                  }}
                ></span>
                <span
                  className="icon-done"
                  onClick={() => {
                    changeClass(ele);
                  }}
                ></span>
                <span
                  className="icon-create"
                  onClick={() => {
                    handleEdit(ele.id);
                  }}
                ></span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="form">
        <form>
          <div>
            <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          </div>
          <div className="buttons">
            <button
            onClick={(e) => {
              editId == null ? handelAdd(e) : saveEdite(e)
            }}
          >
            {editId == null ? "Add" : "Save"}
          </button>
          <button
            onClick={(e) => {
              handelReset(e);
            }}
          >
            Reset
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
