import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode | string;
  primary?: boolean;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  primary,
  danger,
  warning,
  success,
  ...props
}) => {
  const selectTypeClassName = () => {
    if (props.disabled)
      return "bg-gray-400 text-white font-medium cursor-not-allowed opacity-70";

    if (primary)
      return "bg-[#3c50e0] hover:bg-[#2e3ecc] text-white font-medium transition cursor-pointer";

    if (danger)
      return "bg-[#d34053] hover:bg-[#b33044] text-white font-medium transition cursor-pointer";

    if (warning)
      return "bg-[#ffa70b] hover:bg-[#e69500] text-white font-medium transition cursor-pointer";

    if (success)
      return "bg-[#219653] hover:bg-[#197a42] text-white font-medium transition cursor-pointer";

    return "bg-gray-500 hover:bg-gray-600 text-white font-medium transition cursor-pointer";
  };

  const combineClassName = () => {
    return `${className} ${selectTypeClassName()}`;
  };

  return (
    <button {...props} className={combineClassName()}>
      <strong>{children}</strong>
    </button>
  );
};

export default Button;
