"use client";
import { Button } from "@/components/button";
import { Form, Formtype } from "@/components/form";
import { Lock, Mail, Phone, Plus, User, UserCog } from "lucide-react";
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

export const EnginePage = ({
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
      const { files, ...body } = values;
      const res = edit
        ? await create(
            Api.engine,
            {
              id: edit,
              ...body,
            },
            "update"
          )
        : await create(Api.engine, values, "add");
      if (res.data?.succeed) {
        toast.success("Success");
      }
      router.refresh();
      router.push("/engines");
      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  const items: FORM_GROUP = {
    "Engine Information": {
      data: [
        {
          form_type: FORM_TYPE.input,
          props: { name: "name", Icon: User, label: "Name", placeholder: "US" },
          classname: colSpan(),
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
          name="Engines"
          label="Manage engines"
          btn={
            <Button
              size={6}
              className="shadow-lg flex items-center shadow-primary/20"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Engine
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
          title={edit ? "Edit brand" : "Create brand"}
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
