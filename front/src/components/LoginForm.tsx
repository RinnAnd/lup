import { ChangeEvent, FC, useState } from "react";
import AuthService from "../service/auth.service";
import Input from "./Input";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";

type LoginFormProps = {
  setForm: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ setForm }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  const onLogin = async () => {
    const res = await AuthService.login(
      credentials.email,
      credentials.password
    );
    if (res) {
      navigate("/my-todos");
    }
  };

  return (
    <form
      className="w-[460px] bg-neutral-900 rounded-lg flex flex-col items-center gap-5"
      style={{ padding: "40px" }}
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to Tudu</h1>
        <p className="text-gray-400">A simple to-do application</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <LoginButton type="submit">Login</LoginButton>
      <p className="hover:underline cursor-pointer" onClick={() => setForm()}>
        Or create an account
      </p>
    </form>
  );
};

export default LoginForm;
