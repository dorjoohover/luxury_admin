import { money } from "@/lib/function";
import { cn } from "@/lib/utils";
import { Product } from "@/models/product.model";
import { ArrowRight, ChevronRight, LucideProps } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export interface CardType {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}
export const ServiceCard = ({ data }: { data: CardType }) => {
  const { Icon, title, description } = data;
  return (
    <div className="border border-border/20 p-8 h-full flex flex-col">
      <span className="flex w-16 items-center justify-center p-4 rounded-full bg-primary/10 mb-6">
        <Icon size={32} className="text-primary" />
      </span>
      <h1 className="text-white text-2xl mb-4">{title}</h1>
      <p className="text-secondary/70 flex-grow">{description}</p>
    </div>
  );
};

export const ValueCard = ({ data }: { data: CardType }) => {
  const { Icon, title, description } = data;
  return (
    <div className="p-8 h-full flex flex-col items-center">
      <span className="flex w/20 items-center justify-center p-5 rounded-full bg-primary/10 mb-4">
        <Icon size={40} className="text-primary" />
      </span>
      <h1 className="text-white mb-2">{title}</h1>
      <p className="text-secondary/70 flex-grow">{description}</p>
    </div>
  );
};

export const ProductCard = ({ data }: { data: Product }) => {
  const { img, name, price } = data;
  return (
    <div className="h-full flex flex-col items-center border border-border/20">
      <div className="w-full relative min-h-[256px]">
        <Image
          //   src={`/api/file/${img}`}
          src={`/demo_car.png`}
          fill
          objectFit="cover"
          alt={name ?? "img"}
        />
      </div>
      <div className="p-6 w-full">
        <h1 className="text-white mb-2 text-2xl text-start">{name}</h1>
        <div className="flex justify-between items-center">
          {/* <p className="text-primary ">${money(price ?? 0)}/day</p> */}
          <span></span>
          <Link
            href={`/product/${data.id}`}
            className="text-secondary/70 font-medium cursor-pointer "
          >
            <div className="flex items-center gap-1">
              <p>View Details </p>
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const DetailCard = ({
  title,
  className,
  children,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "border border-white/10 outline shadow-md rounded-lg p-4 bg-gradient-to-b from-muted to-primary-foreground",
        className
      )}
    >
      <h2 className="text-white font-bolder text-sm">{title}</h2>
      <div className="my-2">{children}</div>
    </div>
  );
};

export const ProductDetailCard = ({
  data,
  col,
}: {
  data: CardType;
  col: number;
}) => {
  const { Icon, title, description } = data;
  return (
    <div className={`col-span-${col}`}>
      <div className="p-8 h-full flex border border-border/20 bg-gradient-to-b from-foreground to-foreground-secondary flex-col items-center">
        <span className="flex w/20 items-center justify-center p-5 rounded-full bg-primary/10 mb-4">
          <Icon size={40} className="text-primary" />
        </span>
        <h1 className="text-white mb-2">{title}</h1>
        <p className="text-secondary/70 flex-grow">{description}</p>
      </div>
    </div>
  );
};
