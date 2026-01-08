"use client";
import { Button } from "@/components/button";
import { Form, Formtype } from "@/components/form";
import { Modal } from "@/components/modal";
import {
  CheckCircle,
  Lock,
  Mail,
  Phone,
  Plus,
  User,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { create } from "../(api)";
import { Api } from "@/utils/api";
import { useRouter } from "next/navigation";
import DataTable, { DataTableProps } from "@/components/table";
import { FORM_TYPE, UserStatus } from "@/lib/enum";
import { FormHeader, Header } from "@/components/header";
import { colSpan, grid, userStatusValues } from "@/lib/const";
import { getEnumValues, handleFilter } from "@/lib/function";
import { Option, Select } from "@/components/select";
import { FORM_GROUP } from "@/lib/constants";

export const UserPage = ({ table }: { table: DataTableProps }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const submit = async (values: Record<string, any>) => {
    try {
      const res = await create(Api.customer_register, values);
      if (res.data?.succeed) {
        console.log("success");
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  const items: FORM_GROUP = {
    ["User Information"]: {
      data: [
        {
          form_type: FORM_TYPE.input,
          props: { name: "name", Icon: User, label: "Name", placeholder: "US" },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.input,
          props: {
            name: "mobile",
            Icon: Phone,
            label: "Phone",
            placeholder: "88666515",
            type: "number",
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.input,
          props: {
            name: "email",
            type: "email",
            Icon: Mail,
            label: "Email",
            placeholder: "example@example.com",
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.input,
          props: {
            name: "username",
            Icon: UserCog,
            label: "Username",
            placeholder: "example",
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.input,
          props: {
            name: "password",
            Icon: Lock,
            label: "Password",
            placeholder: "123123",
          },
          classname: colSpan(),
        },
      ],
      classname: grid(),
    },
  };

  const status: Option[] = getEnumValues(UserStatus).map((s) => ({
    value: s,
    label: userStatusValues[s],
  }));
  return (
    <div>
      {open ? (
        <FormHeader
          title={"Create user"}
          label="Add a new user to the system"
          onCancel={() => setOpen(false)}
        />
      ) : (
        <Header
          name="Users"
          label="Manage users"
          btn={
            <Button
              size={6}
              className="shadow-lg flex items-center shadow-primary/20"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          }
          input={
            <form className="grid grid-cols-12">
              <Select
                className="col-span-6"
                options={[{ label: "Select status", value: "" }, ...status]}
                onChange={(e) => handleFilter("status", e.target.value, router)}
                label="Status"
                name="status"
                Icon={CheckCircle}
              />
            </form>
          }
        />
      )}

      {open ? (
        <Form
          title="Create user"
          cancel={() => setOpen(false)}
          submit={submit}
          items={items}
        ></Form>
      ) : (
        <DataTable
          data={table.data}
          meta={table.meta}
          columns={table.columns}
          dicts={{
            status: userStatusValues,
          }}
        />
      )}
    </div>
  );
};
