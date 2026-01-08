"use client";
import { Button } from "@/components/button";
import { Form, Formtype } from "@/components/form";
import {
  Armchair,
  Bluetooth,
  Cable,
  Disc,
  DollarSign,
  DoorOpen,
  Image,
  LocationEdit,
  Package,
  RotateCw,
  User as LUser,
  Plus,
  Car,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { create } from "../(api)";
import { Api } from "@/utils/api";
import { useRouter } from "next/navigation";
import {
  colSpan,
  driveTypeValues,
  grid,
  orderStatusValues,
  transmisstionValues,
} from "@/lib/const";
import {
  COLUMN,
  DRIVE_TYPE,
  FORM_TYPE,
  OrderStatus,
  TRANSMISSION,
} from "@/lib/enum";
import { imageUploader } from "../(api)/base";
import { Option, Select } from "@/components/select";
import { FormHeader, Header } from "@/components/header";
import DataTable, { DataTableProps } from "@/components/table";
import { FORM_GROUP } from "@/lib/constants";
import { getEnumValues } from "@/lib/function";
import { toast } from "sonner";

export const OrderPage = ({
  users,
  table,
  products,
  value,
}: {
  users: Option[];
  products: Option[];

  table: DataTableProps;
  value?: any;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const submit = async (values: Record<string, any>) => {
    try {
      const { files, ...body } = values;

      const res = await create(
        Api.order,
        {
          ...body,
        },
        "add"
      );
      if (res.data?.succeed) {
        toast.success("Success");
      }
      router.refresh();
      router.push("/orders");
      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };
  const status = getEnumValues(OrderStatus).map((s) => ({
    label: orderStatusValues[s],
    value: s,
  }));
  const items: FORM_GROUP = {
    "Product Information": {
      data: [
        {
          classname: colSpan(),
          form_type: FORM_TYPE.select,
          props: {
            name: "productId",
            label: "Product",
            Icon: Car,
            options: products,
          },
        },
        {
          form_type: FORM_TYPE.input,
          props: {
            Icon: Calendar,
            label: "Start Date",
            name: "startDate",
            type: "date",
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.input,
          props: {
            Icon: Clock,
            label: "End Date",
            name: "endDate",
            type: "date",
          },
          classname: colSpan(),
        },
      ],
      classname: grid(),
    },
    "User Information": {
      data: [
        {
          classname: colSpan(),
          form_type: FORM_TYPE.select,
          props: {
            name: "userId",
            label: "User",
            Icon: LUser,
            options: users,
          },
        },
        {
          form_type: FORM_TYPE.input,
          classname: colSpan(),
          props: {
            name: "mobile",
            label: "Mobile",
            Icon: Phone,
            placeholder: "12341234",
          },
        },
        {
          form_type: FORM_TYPE.input,
          classname: colSpan(),
          props: {
            name: "email",
            label: "Email",
            Icon: Mail,
            placeholder: "example@exp.com",
          },
        },
      ],
      classname: grid(),
    },
    "Order Information": {
      data: [
        {
          form_type: FORM_TYPE.select,
          props: {
            name: "status",
            label: "Status",
            Icon: CheckCircle,
            options: status,
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.textarea,
          props: {
            name: "description",
            Icon: Image,
            label: "Order description",
            placeholder: "Description",
          },
          classname: "col-span-12",
        },
      ],
      classname: grid(),
    },
  };

  const handleFilter = (key: string, value: string) => {
    const query = new URLSearchParams();
    if (value && key) query.set(key, value);
    router.replace(`?${query.toString()}`); // server component дах page-ийг refresh
  };
  const columns = [
    { key: "productName", type: COLUMN.text, header: "Product" },
    { key: "userName", type: COLUMN.text, header: "User name" },
    { key: "mobile", type: COLUMN.text, header: "Mobile" },
    { key: "status", type: COLUMN.badge, header: "Status" },
    { key: "description", type: COLUMN.text, header: "description" },
    { key: "email", type: COLUMN.text, header: "Email" },
    { key: "startDate", type: COLUMN.date, header: "Start Date" },
    { key: "endDate", type: COLUMN.date, header: "End Date" },
    { key: "createdAt", type: COLUMN.date, header: "Created" },
    { key: "notes", type: COLUMN.text, header: "Notes" },
    {
      key: "app",
      type: COLUMN.approve,
      header: "",
      onClick: (id: string) => updateStatus(id, OrderStatus.Approved),
    },
    {
      key: "can",
      type: COLUMN.cancel,
      header: "",
      onClick: (id: string) => updateStatus(id, OrderStatus.Cancelled),
    },
    { key: "orders", type: COLUMN.detail, header: "" },
  ];
  const updateStatus = async (id: string, status: OrderStatus) => {
    const { data, error } = await create(
      Api.order,
      {
        id,
        status,
      },
      "update-status"
    );
    if (error) {
      toast.error(error ?? "Алдаа гарлаа");
      return;
    }
    toast.success(
      status == OrderStatus.Approved ? "Баталгаажлаа." : "Цуцаллаа."
    );
    router.replace("/orders");
  };
  return (
    <div className="mb-6  ">
      {open ? (
        <FormHeader
          title={"Create order"}
          label="Add a new order to the system"
          onCancel={() => setOpen(false)}
        />
      ) : (
        <Header
          name="Orders"
          label="Manage orders"
          btn={
            <Button
              size={6}
              className="shadow-lg flex items-center shadow-primary/20"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Order
            </Button>
          }
          input={
            <form className="grid grid-cols-2">
              <Select
                options={[{ label: "Select user", value: "" }, ...users]}
                onChange={(e) => handleFilter("userId", e.target.value)}
                label="User"
                name="userId"
                Icon={LUser}
              />
            </form>
          }
        />
      )}
      {open ? (
        <Form
          title="Create car"
          cancel={() => setOpen(false)}
          submit={submit}
          items={items}
          value={value}
        ></Form>
      ) : (
        <DataTable
          data={table.data}
          meta={table.meta}
          columns={columns}
          dicts={{ status: orderStatusValues }}
        />
      )}
    </div>
  );
};
