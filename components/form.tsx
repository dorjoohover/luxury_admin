import { LucideProps } from "lucide-react";
import {
  FormEvent,
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from "react";
import { Input, InputProps, Textarea, TextareaProps } from "./input";
import { Button } from "./button";
import { Option, Select, SelectProps } from "./select";
import { CheckboxGroup, CheckboxGroupProps } from "./checkbox";
import { FORM_TYPE } from "@/lib/enum";
import { cn } from "@/lib/utils";
import { clsx, type ClassValue } from "clsx";
import { FileGroup, FileGroupProps } from "./files";
import { FORM_GROUP } from "@/lib/constants";
import { createInitialFormData, money } from "@/lib/function";
export interface FormtypeBase {
  form_type: FORM_TYPE;
  classname?: ClassValue;
  variant?: "default" | "booking";
}

export interface FormtypeInput extends FormtypeBase {
  form_type: FORM_TYPE.input | FORM_TYPE.number | FORM_TYPE.money;
  props?: InputProps;
}

export interface FormtypeSelect extends FormtypeBase {
  form_type: FORM_TYPE.select;
  props?: SelectProps;
}
export interface FormtypeTextarea extends FormtypeBase {
  form_type: FORM_TYPE.textarea;
  props?: TextareaProps;
}
export interface FormtypeCheckbox extends FormtypeBase {
  form_type: FORM_TYPE.checkbox;
  props?: CheckboxGroupProps;
}
export interface FormtypeFiles extends FormtypeBase {
  form_type: FORM_TYPE.files;
  props?: FileGroupProps;
}

export type Formtype =
  | FormtypeInput
  | FormtypeSelect
  | FormtypeCheckbox
  | FormtypeTextarea
  | FormtypeFiles;

export const Form = ({
  submit,
  cancel,
  title,
  classname,
  value,
  items,
}: {
  title: string;
  value?: any;
  classname?: ClassValue;
  submit: (data: Record<string, any>) => void;
  cancel: () => void;
  items: FORM_GROUP;
}) => {
  const form: Record<string, any> = Object.entries(items)
    .flatMap(([_, value]) => value.data)
    .filter((v) => v?.props?.name)
    .reduce((acc, v) => {
      acc[v.props!.name!] = v; // эсвэл default value
      return acc;
    }, {} as Record<string, any>);

  const [formData, setFormData] = useState({
    ...createInitialFormData(form, value),
    files: [],
  });
  const updateField = (field: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submit(formData);
  };
  const render = (item: Formtype) => {
    const { form_type, props } = item;
    if (form_type == FORM_TYPE.input)
      return (
        <Input
          label={props?.label ?? ""}
          onChange={(e: string) => {
            if (props?.name) updateField(props.name, e);
          }}
          value={props?.name ? formData[props.name] : undefined}
          {...props}
        />
      );
    if (form_type == FORM_TYPE.number) {
      return (
        <Input
          label={props?.label ?? ""}
          onChange={(e: string) => {
            // e = input value (string)
            const numeric = e.replace(/^0+/, ""); // Leading zero арилгана (0124 → 124)

            const value = numeric === "" ? 0 : parseInt(numeric, 10);

            if (props?.name) {
              updateField(props.name, value);
            }
          }}
          type="text" // ← number биш TEXT болгоно
          inputMode="numeric" // numeric keyboard гаргаж өгнө
          pattern="[0-9]*"
          min={0}
          {...props}
          value={props?.name ? String(formData[props.name] ?? "0") : ""}
        />
      );
    }
    if (form_type == FORM_TYPE.money) {
      return (
        <Input
          {...props}
          label={props?.label ?? ""}
          onChange={(e: any) => {
            let value = e;
            value = value.replaceAll(",", "");
            if (props?.name) updateField(props.name, value);
          }}
          type="text"
          accept="[0-9]"
          min={0}
          value={props?.name ? money(formData[props.name] ?? "") : undefined}
        />
      );
    }
    if (form_type == FORM_TYPE.textarea)
      return (
        <Textarea
          onChange={(e) => {
            if (props?.name) updateField(props.name, e);
          }}
          value={props?.name ? formData[props.name] : undefined}
          name={props?.name ?? ""}
          label={props?.label ?? ""}
          {...props}
        />
      );
    if (form_type == FORM_TYPE.select)
      return (
        <Select
          options={props?.options ?? []}
          {...props}
          onChange={(e) => {
            const value = e.target.value;
            if (props?.name) updateField(props.name, value);
          }}
          value={props?.name ? formData[props.name] : undefined}
        />
      );
    if (form_type == FORM_TYPE.checkbox && props)
      return (
        <CheckboxGroup
          {...props}
          onChange={(e) => {
            const value = e;
            if (props?.name) updateField(props.name, value);
          }}
          value={props?.name ? formData[props.name] : undefined}
        />
      );
    if (form_type == FORM_TYPE.files && props)
      return (
        <FileGroup
          {...props}
          onChange={(e, files?: File[]) => {
            if (files) updateField("files", files);
            const value = e;
            if (props?.name) updateField(props.name, value);
          }}
          files={formData.files}
          value={props?.name ? formData[props.name] : undefined}
        />
      );
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
        <h2 className="text-2xl pb-4 text-white font-bold ">{title}</h2>
        <div
          className={cn(
            " border-t-3 border-border/20 pt-4  gap-4 w-full ",
            classname
          )}
        >
          {Object.entries(items).map(([key, item], i) => {
            return (
              <div
                key={i}
                className={cn(
                  `px-6 py-8 my-4  rounded-xl shadow-lg border border-border/10 `
                )}
              >
                <h5 className="text-white mb-4">{key}</h5>
                <div className={cn(item.classname)}>
                  {item.data.map((it, index) => (
                    <div key={index} className={cn(it.classname)}>
                      {render(it)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
        <Button type="submit" size={6}>
          Submit
        </Button>
        <Button variant="light" size={6} onClick={cancel}>
          Close
        </Button>
      </div>
    </form>
  );
};
