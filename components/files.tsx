import { cn } from "@/lib/utils";
import { GripVertical, Paperclip, Trash2, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./button";

export interface FileGroupProps {
  label?: string;
  Icon?: React.ComponentType<any>;
  name: string;
  className?: string;
  value?: string[];
  files?: File[];
  onChange?: (files: string[], file?: File[]) => void;
}

export const FileGroup: React.FC<FileGroupProps> = ({
  label,
  Icon,
  name,
  className,
  value = [],
  files,
  //   images = [],
  onChange,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleRemove = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    const newFiles = files?.filter((_, i) => i !== index);
    onChange?.(newImages, newFiles);
  };

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    const newImages = [...value];
    const draggedImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    onChange?.(newImages);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eFiles = e.target.files;

    if (eFiles) {
      const files = Array.from(eFiles);
      const newImageUrls = files.map((file) => URL.createObjectURL(file));

      onChange?.([...value, ...newImageUrls], files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files) {
      const arr = Array.from(files);
      const newImageUrls = arr.map((file) => URL.createObjectURL(file));
      onChange?.([...value, ...newImageUrls], arr);
    }
  };

  //   const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(e.target.files || [])
  //     onChange?.([...images, ...files]);
  //   };

  const removeFile = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange?.(updated);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div
          className={`border border-border/10  rounded-xl p-12 text-center transition-colors ${
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-border bg-muted/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {Icon && <Icon className="w-6 h-6 text-primary" />}
            </div>
            <div>
              <p className="text-muted-foreground mb-1">{label}</p>
              <p className="text-muted-foreground">Supports: JPG, PNG, GIF</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-block cursor-pointer bg-background text-white py-1 px-3 rounded-sm font-bold hover:bg-primary hover:text-background transition-all text-sm"
            >
              Browse Files
            </label>
          </div>
        </div>

        {value.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                index={index}
                onRemove={() => handleRemove(index)}
                onMove={handleMove}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
  //   return (
  //     <div className={cn("text-white ", className)}>
  //       <label className="flex items-center gap-2 cursor-pointer border border-border/10 rounded p-3  transition-colors flex-col justify-center py-10">
  //         {Icon && (
  //           <Icon className="text-primary w-8 h-8 bg-primary/15 px-2 rounded-full" />
  //         )}
  //         <span className="text-muted-foreground max-w-1/2">{label}</span>
  //         <input
  //           type="file"
  //           name={name}
  //           multiple
  //           accept="image/*"
  //           className="hidden"
  //           onChange={handleFiles}
  //         />
  //         <div className="px-2.5 py-1 rounded-sm bg-background text-xs font-bold">
  //           Browse Files{value.length}
  //         </div>
  //       </label>

  //       {/* Files List */}
  //       <div className="mt-3 space-y-2">
  //         {value.map((file, idx) => (
  //           <div
  //             key={idx}
  //             className="flex items-center justify-between bg-white/10 px-3 py-2 rounded"
  //           >
  //             <span className="text-sm truncate">{file.name}</span>

  //             <button
  //               type="button"
  //               className="p-1 hover:bg-white/20 rounded"
  //               onClick={() => removeFile(idx)}
  //             >
  //               <X className="w-4 h-4 text-red-400" />
  //             </button>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
};
const ItemType = "IMAGE";
interface DragItem {
  index: number;
}
function ImageCard({
  image,
  index,
  onRemove,
  onMove,
}: {
  image: string;
  index: number;
  onRemove: () => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: DragItem) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  drag(dragRef);
  preview(drop(ref));
  return (
    <div
      className={`relative group rounded-xl overflow-hidden border-2 border-border bg-muted ${
        isDragging ? "opacity-50" : ""
      }`}
      ref={ref}
    >
      <div className="aspect-video">
        <ImageWithFallback
          src={image}
          alt={`Upload ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        ref={dragRef}
        className="absolute top-2 left-2 cursor-move bg-background/90 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      <Button
        // variant="destructive"
        size={2}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;
  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${
        className ?? ""
      }`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    // <>{JSON.stringify(src)}</>
    <img
      src={!(src as string)?.startsWith("blob") ? `/api/file/${src}` : src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}
