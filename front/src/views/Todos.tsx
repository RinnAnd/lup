import { FC, useEffect, useState } from "react";
import Todo from "../types/todos";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import TodoService from "../service/todo.service";
import DraggableCard from "../components/DraggableCard";
import TodoForm from "../components/TodoForm";
import { BiPlus } from "react-icons/bi";
import { useStore } from "../store/store";
import useSession from "../hooks/useSession";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Todos: FC = () => {
  const { checkSession, logout } = useSession();
  const in_progress = useStore((state) => state.in_progress);
  const completed = useStore((state) => state.completed);
  const setTodos = useStore((state) => state.setTodos);
  const navigate = useNavigate();

  const username = localStorage.getItem("name");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await TodoService.getTodos();

      const inProgressTodos = [];
      const completedTodos = [];

      for (let i = 0; i < response.length; i++) {
        if (response[i].isCompleted) {
          completedTodos.push(response[i]);
        } else {
          inProgressTodos.push(response[i]);
        }
      }

      setTodos({
        in_progress: inProgressTodos,
        completed: completedTodos,
      });
    };

    checkSession();
    fetchTodos();
  }, [setTodos]);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  async function handleDragDrop(results: any) {
    setIsDragging(false);

    const { source, destination } = results;

    if (!destination) return;

    if (destination.droppableId == source.droppableId) return;

    if (destination.droppableId == "completed") {
      const todo = in_progress[source.index];
      setTodos({
        in_progress: in_progress.filter((_, index) => index !== source.index),
        completed: [...completed, { ...todo, isCompleted: true }],
      });

      await TodoService.updateTodo({
        ...todo,
        isCompleted: true,
        completedAt: new Date().toISOString(),
      });
    }

    if (destination.droppableId == "in_progress") {
      const todo = completed[source.index];
      setTodos({
        in_progress: [...in_progress, { ...todo, isCompleted: false }],
        completed: completed.filter((_, index) => index !== source.index),
      });

      await TodoService.updateTodo({
        ...todo,
        isCompleted: false,
        completedAt: null,
      });
    }
  }

  const [formTodo, setFormTodo] = useState<Todo | null>(null);
  const [modal, setModal] = useState(false);

  async function deleteTodo(id: number) {
    await TodoService.deleteTodo(id);

    setTodos({
      in_progress: in_progress.filter((todo) => todo.id !== id),
      completed: completed.filter((todo) => todo.id !== id),
    });
  }

  if (in_progress.length === 0 && completed.length === 0) {
    return (
      <div className="flex flex-col items-center h-screen w-screen">
        {modal && (
          <TodoForm
            type={formTodo ? "edit" : "add"}
            todo={formTodo}
            close={() => {
              setModal(false);
              setFormTodo(null);
            }}
          />
        )}
        <div className="flex items-center w-full p-8 justify-around">
        <h1 className="font-bold text-3xl">
          Hi, {username}. Welcome to your Todos kanban.
        </h1>
        <div className="flex gap-4">
          <Button variant="secondary"
            onClick={logout}
          >Log out</Button>
        </div>
      </div>
        <p className="text-lg">Seems like you don't have any todos yet.</p>
        <button
          className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-sky-400"
          onClick={() => setModal(true)}
        >
          Start adding
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      {modal && (
        <TodoForm
          type={formTodo ? "edit" : "add"}
          todo={formTodo}
          close={() => {
            setModal(false);
            setFormTodo(null);
          }}
        />
      )}
      <div className="flex items-center w-full p-8 justify-around">
        <h1 className="font-bold text-3xl">
          Hi, {username}. Welcome to your Todos kanban.
        </h1>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/dashboard")}>
            Go to dashboard
          </Button>
          <Button variant="secondary"
            onClick={logout}
          >Log out</Button>
        </div>
      </div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragDrop}>
        <div className="flex items-center justify-center gap-4 h-full">
          <div className="flex flex-col items-center h-full w-[21rem]">
            <div className="flex justify-center w-full items-center relative">
              <h1 className="text-3xl font-bold">My Todos</h1>
              <button
                className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-md absolute right-2 bottom-0.5 cursor-pointer hover:bg-sky-400"
                onClick={() => setModal(true)}
              >
                <BiPlus />
              </button>
            </div>
            <Droppable droppableId="in_progress">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`h-full w-full rounded-md ${
                    isDragging ? "bg-neutral-950 border-sky-600 border" : ""
                  }`}
                >
                  {in_progress.map((todo, index) => (
                    <Draggable
                      draggableId={todo.id.toString()}
                      index={index}
                      key={todo.id}
                    >
                      {(provided) => (
                        <DraggableCard
                          provided={provided}
                          title={todo.title}
                          description={todo.description}
                          isCompleted={todo.isCompleted}
                          setForm={() => {
                            setFormTodo(todo);
                            setModal(true);
                          }}
                          remove={() => deleteTodo(todo.id)}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex flex-col items-center h-full w-[21rem]">
            <h1 className="text-3xl font-bold">Completed</h1>
            <Droppable droppableId="completed">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`h-full w-full rounded-md ${
                    isDragging ? "bg-neutral-950 border-green-700 border" : ""
                  }`}
                >
                  {completed.map((todo, index) => (
                    <Draggable
                      draggableId={todo.id.toString()}
                      index={index}
                      key={todo.id}
                    >
                      {(provided) => (
                        <DraggableCard
                          provided={provided}
                          title={todo.title}
                          description={todo.description}
                          isCompleted={todo.isCompleted}
                          setForm={() => {
                            setFormTodo(todo);
                            setModal(true);
                          }}
                          remove={() => deleteTodo(todo.id)}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Todos;
