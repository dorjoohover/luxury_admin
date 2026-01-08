import { cn } from "@/lib/utils";

import { ReactNode, SelectHTMLAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  Icon?: React.ComponentType<LucideProps>;
  LabelIcon?: React.ComponentType<LucideProps>;
  options: Option[];
  variant?: "default" | "booking";
  className?: string;
  children?: ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  Icon,
  LabelIcon,
  label,
  options,
  className,
  ...props
}) => {
  return (
    <div className={cn("text-white", className)}>
      {/* Label */}
      {LabelIcon ? (
        <div className="flex items-center gap-2 mb-1">
          <LabelIcon className="text-primary" size={20} />
          <label htmlFor={props.id} className="block font-bold">
            {label}
          </label>
        </div>
      ) : (
        <label htmlFor={props.id} className="block mb-1">
          {label}
        </label>
      )}

      {/* Select */}
      <div className="mt-4">
        <div
          className={cn(
            "flex items-center  outline-1 -outline-offset-1 outline-border/20 ",
            Icon && "pl-4",
            "has-[select:focus-within]:outline-2",
            "has-[select:focus-within]:-outline-offset-2",
            "has-[select:focus-within]:outline-primary/50"
          )}
        >
          {Icon && (
            <div className="shrink-0 text-base text-primary select-none mr-2">
              <Icon />
            </div>
          )}

          <select
            {...props}
            className={cn(
              "block min-w-0 grow py-4 pr-3 text-base appearance-none pl-2",
              "bg-background/80",
              "focus:outline-none"
            )}
          >
            {options.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
