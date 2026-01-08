import { ArrowLeft, Search } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export const Header = ({
  name,
  label,
  btn,
  input,
}: {
  name: string;
  label: string;
  btn?: ReactNode;
  input?: ReactNode;
}) => {
  return (
    <div className="border-b bg-gradient-to-r from-muted to-primary-foreground  border-border/10">
      <div className="px-6 py-6">
        <div
          className={cn(
            "flex items-center justify-between pb-3 mb-3",
            input && "border-b border-border/10"
          )}
        >
          <div>
            <h2 className="text-foreground text-xl mb-2">{name}</h2>
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>
          {btn && btn}
        </div>

        <div className="relative max-w-md ">
          {input && input}
          {/* <Input
              placeholder="Search by name, email, or username..."
              className="pl-9 bg-input-background border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
        </div>
      </div>
    </div>
  );
};

export const FormHeader = ({
  title,
  label,
  onCancel,
}: {
  title: string;
  label: string;
  onCancel: () => void;
}) => {
  return (
    <div className="border-b bg-background border-border/10">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            size={2}
            onClick={onCancel}
            className="bg-transparent text-foreground transition-all duration-300 hover:bg-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-foreground text-lg">{title}</h1>
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
