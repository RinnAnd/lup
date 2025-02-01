import { FC } from "react";

interface CompletedTagProps {
  isCompleted: boolean;
}

const CompletedTag: FC<CompletedTagProps> = ({ isCompleted }) => {
  return (
    <div
      className={`text-xs bg-neutral-700 rounded-md p-2 w-fit mt-2.5 ${
        isCompleted ? "text-green-500" : "text-sky-500"
      }`}
    >
      {isCompleted ? "Completed" : "In progress"}
    </div>
  );
};

export default CompletedTag;
