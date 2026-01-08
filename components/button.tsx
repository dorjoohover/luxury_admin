import { cn } from "@/lib/utils";

enum ButtonVariant {
  DEFAULT = "default",
  LIGHT = "light",
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "light";
  size?: number;
}
const background = {
  [ButtonVariant.DEFAULT]: "text-background bg-primary hover:bg-primary/80 hover:text-secondary/80",
  [ButtonVariant.LIGHT]: "text-white border border-primary hover:bg-primary/50",
};
const sizes: Record<string, string> = {
  "18": "py-4.5 px-18",
  "8": "py-4.5 px-8",
  "6": "py-2.5 px-6",
  "2": "py-2 px-2",
};
export const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.DEFAULT,
  size = 8,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        " font-inter rounded-md px-8 py-4.5 text-base cursor-pointer transition-all duration-300",
        background[variant],
        sizes[size.toString()],
        className
      )}    
    >
      {children}
    </button>
  );
};
