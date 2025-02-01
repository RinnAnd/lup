import { serverUrl } from "../constants";
import showToast from "../utils/toast";

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${serverUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      showToast(data.message, "failure");
      throw new Error(data.message);
    }

    localStorage.setItem('token', data.data.token);
    localStorage.setItem('id', data.data.id);
    localStorage.setItem('name', data.data.name);

    return data;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${serverUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      showToast(data.message, "failure");
      throw new Error(data.message);
    }

    return await AuthService.login(email, password);
  }
}

export default AuthService;