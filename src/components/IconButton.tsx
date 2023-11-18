import { FC } from "react";
import { FaCoffee } from "react-icons/fa";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
}

const IconButton: FC<Props> = ({ onClick, label }) => {
  return (
    <button
      className="p-1 font-bold text-white bg-blue-500 rounded  hover:bg-blue-700"
      onClick={onClick}
    >
      <FaCoffee className="" />
      {label}
    </button>
  );
};

export default IconButton;
