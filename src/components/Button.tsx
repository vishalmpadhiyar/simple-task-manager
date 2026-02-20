import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`p-2 border border-gray-200 hover:bg-gray-200 rounded-lg cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
