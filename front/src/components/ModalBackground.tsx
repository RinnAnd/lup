import { FC } from "react";

interface ModalBackgroundProps {
  children?: React.ReactNode;
  closeModal: () => void;
}

const ModalBackground: FC<ModalBackgroundProps> = ({
  closeModal,
  children,
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 backdrop-blur-xs flex items-center justify-center"
      onClick={closeModal}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
