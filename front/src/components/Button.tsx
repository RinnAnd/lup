import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button: FC<ButtonProps> = ({ variant = "primary", ...props }) => {
  return (
    <button
      {...props}
      className={`p-2.5 border rounded-md cursor-pointer min-w-24 ${
        variant == "primary" ? "bg-white text-black" : ""
      } hover:opacity-70`}
    />
  );
};

export default Button;
