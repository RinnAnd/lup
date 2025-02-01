import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const LoginButton: FC<ButtonProps> = ({ ...props }) => {
  return <button {...props} className="bg-blue-400 w-full rounded-lg text-white h-12 cursor-pointer hover:bg-blue-300 transition-all" />;
};

export default LoginButton;
