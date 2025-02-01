import { FC, useState } from "react";
import ModalBackground from "./ModalBackground";
import Input from "./Input";
import Button from "./Button";
import Todo from "../types/todos";
import TodoService from "../service/todo.service";
import { useStore } from "../store/store";
import showToast from "../utils/toast";

type TodoFormProps = {
  type: "add" | "edit";
  todo: Todo | null;
  close: () => void;
};

const TodoForm: FC<TodoFormProps> = ({ type, todo, close }) => {
  const [localTodo, setLocalTodo] = useState<Todo | null>(todo);
  const updateTodo = useStore((state) => state.updateTodo);
  const addTodo = useStore((state) => state.addTodo);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLocalTodo(
      (prevTodo) =>
        ({
          ...prevTodo,
          [name]: value,
        } as Todo)
    );
  }

  async function handleAdd(todo: Todo) {
    if (!todo) showToast("Please fill in all fields", "failure");
    const res = await TodoService.createTodo(todo.title, todo.description);
    addTodo({
      id: res.data.id,
      title: todo.title,
      description: todo.description,
      isCompleted: false,
      createdAt: res.data.createdAt,
      completedAt: res.data.completedAt,
      userId: res.data.userId,
    });
    close();
  }

  async function handleUpdate(todo: Todo) {
    if (!todo.title || !todo.description) {
      showToast("Please fill in all fields", "failure")
      return;
    };
    updateTodo(todo);
    await TodoService.updateTodo({
      ...todo,
      title: todo.title,
      description: todo.description,
    });
    close();
  }

  return (
    <ModalBackground closeModal={() => {}}>
      <div className="bg-neutral-900 p-8 rounded-lg border gap-4 flex flex-col w-md">
        <h1>{type == "add" ? "Add a new todo" : "Update todo"}</h1>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            value={localTodo?.title}
            name="title"
            onChange={handleChange}
          />
          <Input
            placeholder="Description"
            value={localTodo?.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            onClick={
              todo
                ? () => handleUpdate(localTodo!)
                : () => handleAdd(localTodo!)
            }
          >
            {type == "add" ? "Add" : "Update"}
          </Button>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
        </div>
      </div>
    </ModalBackground>
  );
};

export default TodoForm;
