import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  TextareaHTMLAttributes,
} from "react";

enum InputVariant {
  DEFAULT = "default",
  BOOKING = "booking",
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "booking";
  size?: number;
  label: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  onChange?: any;
  value?: any;
  LabelIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
const background = {
  [InputVariant.DEFAULT]: "text-white  placeholder:text-secondary/40",
  [InputVariant.BOOKING]: "text-background  placeholder:text-background/50",
};

export const Input: React.FC<InputProps> = ({
  variant = InputVariant.DEFAULT,
  size = 8,
  children,
  Icon,
  LabelIcon,
  onChange,
  label,
  value,
  className,
  ...props
}) => {
  return (
    <div className={cn("text-white", className)}>
      {LabelIcon ? (
        <div className="font-bold  flex gap-2">
          <LabelIcon className="text-primary" size={20} />
          <label className="block font-bold ">{label}</label>
        </div>
      ) : (
        <label className="block font-medium  ">{label}</label>
      )}
      <div className="mt-4">
        <div
          className={`flex items-center  pl-4 outline-1 -outline-offset-1 outline-border/20 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary/50`}
        >
          {Icon && (
            // <div className="shrink-0 text-base text-primary select-none sm:text-sm/6">
            <div className="shrink-0 text-base text-primary select-none ">
              <Icon />
            </div>
          )}
          {props.type == "file" ? (
            <input
              {...props}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.files?.[0]);
                }
              }}
              type="file"
              accept="image/*"
              className={`block min-w-0 appearance-none grow py-4 pr-3 pl-3  text-base ${background[variant]} focus:outline-none `}
            />
          ) : (
            <input
              onChange={(e) => {
                if (onChange) onChange(e.target.value);
              }}
              {...props}
              value={value ?? (props.type == "number" ? 0 : "")}
              className={`block min-w-0 appearance-none grow py-4 pr-3 pl-3  text-base ${background[variant]} focus:outline-none `}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  variant?: InputVariant;
  Icon?: React.FC<any>;
  LabelIcon?: React.FC<any>;
  onChange?: (e: string) => void;
  label?: string;
  className?: string;
  name: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  variant = InputVariant.DEFAULT,
  children,
  Icon,
  LabelIcon,
  label,
  onChange,
  name,
  className,
  ...props
}) => {
  return (
    <div className={cn("text-white", className)}>
      {LabelIcon ? (
        <div className="font-bold  flex gap-2">
          <LabelIcon className="text-primary" size={20} />
          <label className="block font-bold ">{label}</label>
        </div>
      ) : (
        <label className="block font-medium ">{label}</label>
      )}
      <div className="mt-4">
        <div
          className={`flex items-center  pl-4 outline-1 -outline-offset-1 outline-border/20 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary/50`}
        >
          {/* {Icon && (
            // <div className="shrink-0 text-base text-primary select-none sm:text-sm/6">
            <div className="shrink-0 text-base text-primary select-none ">
              <Icon />
            </div>
          )} */}
          <textarea
            rows={3}
            name={name}
            {...props}
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
            className={cn(
              "block min-w-0 appearance-none grow py-3 pr-3  text-base resize-none",
              background[variant],
              "focus:outline-none"
            )}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
