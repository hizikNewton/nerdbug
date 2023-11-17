import { forwardRef, ForwardedRef, FC } from "react";
import { cls } from "src/utils/helper";

const classes = {
  base: "focus:outline-none transition ease-in-out duration-300",
  disabled: "opacity-50 cursor-not-allowed",
  pill: "rounded-full",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2",
    large: "px-8 py-3 text-lg",
  },
  variant: {
    primary:
      "bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white",
    danger:
      "bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white",
  },
};

interface Props extends React.PropsWithChildren {
  className?: string;
  pill?: boolean;
  disabled?: boolean;
  variant: "primary" | "secondary" | "danger";
  size: "small" | "normal" | "large";
  onClick: () => void;
}

const Button: FC<Props> = forwardRef(
  (
    {
      children,
      className,
      variant = "primary",
      size = "normal",
      pill,
      onClick,
      disabled = false,
      ...props
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
      {...props}
    >
      {children}
    </button>
  )
);

export default Button;
