"use client";
import { Button } from "@/components/button";
import { Form, Formtype } from "@/components/form";
import {
  Image,
  Lock,
  Mail,
  Phone,
  Plus,
  Upload,
  User,
  UserCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { create } from "../(api)";
import { Api } from "@/utils/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DataTable, { DataTableProps } from "@/components/table";
import { FORM_TYPE } from "@/lib/enum";
import { FormHeader, Header } from "@/components/header";
import { Select } from "@headlessui/react";
import { FORM_GROUP } from "@/lib/constants";
import { colSpan, grid } from "@/lib/const";
import { toast } from "sonner";
import { imageUploader } from "../(api)/base";

export const FeaturePage = ({
  table,
  edit,
  value,
}: {
  value?: any;
  edit?: string;
  table: DataTableProps;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const submit = async (values: Record<string, any>) => {
    try {
      const { files, images, ...body } = values;

      let fileImages = null;

      const filesData = new FormData();
      if (files) {
        files.forEach((file: any, i: number) => {
          if (file instanceof File) {
            filesData.append("files", file);
          }
        });
        const uploadResult = await imageUploader(filesData);
        fileImages = uploadResult;
      }
      let payload = body;
      payload.images = [...images, ...fileImages].filter(
        (f: string) => !f.startsWith("blob")
      );
      const res = edit
        ? await create(
            Api.feature,
            {
              id: edit,
              ...payload,
            },
            "update"
          )
        : await create(
            Api.feature,
            {
              ...payload,
              images: fileImages,
            },
            "add"
          );
      if (res.data?.succeed) {
        router.refresh();
        router.push("/features");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      // setOpen(false);
    }
  };

  const items: FORM_GROUP = {
    "Feature Information": {
      data: [
        {
          form_type: FORM_TYPE.input,
          props: { name: "name", Icon: User, label: "Name", placeholder: "US" },
          classname: colSpan(),
        },
      ],
      classname: grid(),
    },
    Description: {
      data: [
        {
          form_type: FORM_TYPE.textarea,
          props: {
            name: "description",
            Icon: Image,
            label: "Feature description",
            placeholder: "Description",
          },
          classname: colSpan(12),
        },
      ],
      classname: grid(),
    },
    Images: {
      data: [
        {
          form_type: FORM_TYPE.files,
          props: {
            name: "images",
            Icon: Upload,
            label: "Drag and drop images here, or click to browse",
            // placeholder: "Images",
          },
          classname: colSpan(12),
        },
      ],
      classname: grid(),
    },
  };
  useEffect(() => {
    setOpen(edit ? true : false);
  }, [edit]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const closeEdit = () => {
    if (edit) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("edit");
      router.replace(`${pathname}?${params.toString()}`);
    }
  };
  const close = () => {
    closeEdit();
    setOpen(false);
  };
  return (
    <div>
      {open ? (
        <FormHeader
          title={edit ? "Edit engine" : "Create engine"}
          label={edit ? "Edit a engine" : "Add a new engine to the system"}
          onCancel={close}
        />
      ) : (
        <Header
          name="Features"
          label="Manage features"
          btn={
            <Button
              size={6}
              className="shadow-lg flex items-center shadow-primary/20"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          }
          input={
            <form>
              {/* <Select
                options={[{ label: "Select user", value: "" }]}
                // onChange={(e) => handleFilter("userId", e.target.value)}
                label="User"
                name="userId"
              /> */}
            </form>
          }
        />
      )}

      {open ? (
        <Form
          title={edit ? "Edit feature" : "Create feature"}
          cancel={close}
          submit={submit}
          value={value}
          items={items}
        ></Form>
      ) : (
        <DataTable
          data={table.data}
          meta={table.meta}
          columns={table.columns}
        />
      )}
    </div>
  );
};
