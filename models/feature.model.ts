import * as Icons from "lucide-react";
export interface Feature {
  id: number;
  name: string;
  description: string;
  images: string[];
  icon: keyof typeof Icons;
}
