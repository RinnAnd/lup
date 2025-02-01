import { FC, useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import useSession from "../hooks/useSession";

const Login: FC = () => {
  const [form, setForm] = useState<boolean>(false);
  const { checkSession } = useSession();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {form ? (
        <SignupForm setForm={() => setForm(false)} />
      ) : (
        <LoginForm setForm={() => setForm(true)} />
      )}
    </div>
  );
};

export default Login;
