import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import CompletedTag from "./CompletedTag";
import { FaPencil, FaTrash } from "react-icons/fa6";
import toast from "../utils/toast";

interface DraggableCardProps {
  provided: DraggableProvided;
  title: string;
  description: string;
  isCompleted: boolean;
  setForm: () => void;
  remove: () => void;
}

const DraggableCard: FC<DraggableCardProps> = ({
  provided,
  title,
  description,
  isCompleted,
  setForm,
  remove,
}) => {
  return (
    <div
      className={`bg-neutral-900 p-4 m-2 rounded-md w-xs`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <h1 className="text-white font-bold text-lg">{title}</h1>
      <p className="text-stone-600">{description}</p>
      <div className="flex justify-between items-center">
        <div>
          <CompletedTag isCompleted={isCompleted} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={setForm}
            className="bg-neutral-700 text-gray-300 rounded-md p-1.5 mt-2 cursor-pointer"
            disabled={isCompleted}
          >
            <FaPencil size={20}/>
          </button>
          <button
            className="bg-neutral-700 text-gray-300 rounded-md p-1.5 mt-2 cursor-pointer"
            onClick={() => {
              toast('Task removed', 'info');
              remove();
            }}
          >
            <FaTrash size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableCard;
