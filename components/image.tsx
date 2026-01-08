// import NextImage, { ImageProps } from "next/image";

// export default function Image({ ...props }: ImageProps) {
//   return (
//     <div className="relative w-[300px] h-[200px] rounded-xl overflow-hidden border border-border/30">
//       <NextImage
//         src={
//           props.src && props.src != null
//             ? `/api/file/${props.src}`
//             : "/api/file/noimage.png"
//         }
//         alt={props?.alt || "Image"}
//         fill={props.fill}
//         width={props.width}
//         height={props.height}
//         objectFit={props.objectFit}
//         onError={(e: any) => {
//           (e.currentTarget as HTMLImageElement).src = "/noImage.png";
//         }}
//       />
//     </div>
//   );
// }
