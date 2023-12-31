import { FC, PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  id?: string;
}

const IconButton: FC<Props> = ({ onClick, label, children }) => {
  return (
    <button
      className="p-1 font-bold text-white bg-gray-500 rounded  hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
      {label}
    </button>
  );
};

export default IconButton;
