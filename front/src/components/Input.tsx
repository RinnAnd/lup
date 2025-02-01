import { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      className="bg-neutral-950 w-full rounded-lg text-white h-12 focus:outline-sky-300"
      style={{ padding: "1rem " }}
    />
  );
};

export default Input;
