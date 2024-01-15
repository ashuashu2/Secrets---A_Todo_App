import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";

function Home() {
  type todoType = {
    title: string;
  };

  const [titleData, setTitleData] = useState<todoType>({ title: "" });
  const [editTodo, setEditTodo] = useState<todoType>({ title: "" });

  const [todosData, setTodosData] = useState<any[]>([]);
  const [todosData2, setTodosData2] = useState<any[]>([]);
  const [editInput, setEditInput] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://secrets-a-todo-app.vercel.app/api/todo/getAllTodo"
      );
      setTodosData(response.data.todos);
    })();
  }, [todosData2]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitleData({ ...titleData, title: e.target.value });

  async function addSecrethandler(data: todoType) {
    if (titleData.title.length >= 1) {
      try {
        const response = await axios.post(
          "https://secrets-a-todo-app.vercel.app/api/todo/addtodo",
          data
        );
        setTitleData({ ...titleData, title: "" });
        console.log(response);
        setTodosData2(response.data.todos);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteTodoHandler(id: any) {
    try {
      const response = await axios.post(
        "https://secrets-a-todo-app.vercel.app/api/todo/deletetodo",
        {
          _id: id,
        }
      );
      setTodosData2(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTodoHandler(id: any, data: any) {
    try {
      const response = await axios.post(
        "https://secrets-a-todo-app.vercel.app/api/todo/updatetodo",
        {
          _id: id,
          updateData: data,
        }
      );
      console.log(response);
      setTodosData2(response.data.todos);
      setEditInput("")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="mx-5">
        <div className="input-group mb-3   ">
          <input
            onChange={(e) => inputChangeHandler(e)}
            type="text"
            value={titleData.title}
            className="form-control border  border-primary border-2"
            placeholder="Add a new secret "
            aria-label="Add a new secret "
            aria-describedby="basic-addon2"
          />
          <span
            className="input-group-text btn btn-primary"
            id="basic-addon2"
            onClick={() => addSecrethandler(titleData)}
          >
            Add Secret
          </span>
        </div>

        <div className=" me-auto float-start w-75 ">
          <ul className="list-group w-100 ">
            {todosData &&
              todosData.map((todo) => (
                <li className="list-group-item d-flex " key={todo._id}>
                  <div>
                    {editTodo.title === todo.title ? (
                      <div>
                        <input
                          className="flex-grow-1"
                          type="text"
                          value={editInput}
                          style={{
                            textDecoration:
                              todo.completed && editTodo.title !== todo.title
                                ? "line-through"
                                : "none",
                          }}
                          onChange={(e) => setEditInput(e.target.value)}
                        />
                        <button
                          className="btn btn-primary p-1 ms-2"
                          onClick={() => updateTodoHandler(todo._id , {title : editInput} )}
                        >
                          update
                        </button>
                      </div>
                    ) : (
                      <div
                        className="flex-grow-1"
                        style={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {todo.title}
                      </div>
                    )}
                  </div>

                  <div className="d-flex ms-3  bg-white ms-auto">
                    <button
                      className="ms-3 border border-0 bg-white fs-5"
                      onClick={() =>
                        setEditTodo({ ...editTodo, title: todo.title })
                      }
                    >
                      {<MdEdit />}
                    </button>
                    <button
                      className="ms-3 border border-0 bg-white fs-5"
                      onClick={() => deleteTodoHandler(todo._id)}
                    >
                      {<MdDelete />}
                    </button>
                    <button
                      className="ms-3 border border-0 bg-white fs-5"
                      onClick={() =>
                        updateTodoHandler(
                          todo._id,
                          todo.completed === true ? {
                            completed: false,
                          } : {
                            completed: true,
                          }
                        )
                      }
                    >
                      {<MdDone />}
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export { Home };
