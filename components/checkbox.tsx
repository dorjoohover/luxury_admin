import { firstLetterUpper } from "@/lib/function";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxGroupProps {
  label?: string;
  Icon?: React.ComponentType<any>;
  name: string;
  value?: string;
  className?: string;
  title?: string;
  onChange?: (e: boolean) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  Icon,
  onChange,
  name,
  value,
  title,
  className,
}) => {
  return (
    <div className={cn("text-white", className)}>
      {label && (
        <label className="block flex gap-2">
          {Icon && <Icon className="text-primary w-5" />}
          {firstLetterUpper(title ?? "")}
        </label>
      )}

      <label className="flex items-center justify-between gap-2 cursor-pointer mt-4 select-none">
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            checked={value as unknown as boolean}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-10 h-5 rounded-full transition-colors ${
              value ? "bg-primary" : "bg-border/30"
            }`}
          />
          <div
            className={`absolute top-[2px] left-[2px] w-4 h-4 bg-background rounded-full shadow-md transition-transform ${
              value ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </label>
    </div>
  );
};
