import { ReactNode } from "react";
import { SectionTitle } from "./title";

export const HomeSection = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <div className={`py-24 bg-background max-w-[1280px] mx-auto px-4`}>
      <SectionTitle text={title} />
      <div className="w-full mt-16">{children}</div>
    </div>
  );
};
