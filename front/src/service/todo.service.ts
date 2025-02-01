import { serverUrl } from "../constants";
import Todo from "../types/todos";
import showToast from "../utils/toast";

const TodoService = {
  getTodos: async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const response = await fetch(`${serverUrl}/todo?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      showToast(data.message, "failure");
      throw new Error(data.message);
    }

    showToast(data.message, "success");
    return data.data as Todo[];
  },

  createTodo: async (title: string, description: string) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const response = await fetch(`${serverUrl}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, userId: id, description }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      showToast(data.message, "failure");
      throw new Error(data.message);
    }

    showToast(data.message, "success");
    return data;
  },

  updateTodo: async (todo: Omit<Todo, "createdAt">) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${serverUrl}/todo?id=${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todo),
    });

    const data = await response.json();

    if (response.status !== 200) {
      showToast(data.message, "failure");
      throw new Error(data.message);
    }

    showToast(data.message, "success");
    return data;
  },

  deleteTodo: async (id: number) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${serverUrl}/todo?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      showToast(data.message, "failure");
      throw new Error(data.message);
    }

    showToast(data.message, "success");
    return data;
  },
};

export default TodoService;
