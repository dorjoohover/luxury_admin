"use client";
import { Button } from "@/components/button";
import { Form, Formtype } from "@/components/form";
import { Modal } from "@/components/modal";
import {
  Armchair,
  BadgeCheck,
  Bluetooth,
  Cable,
  CheckCircle,
  Compass,
  Disc,
  DollarSign,
  DoorOpen,
  Gauge,
  Image,
  LocationEdit,
  Lock,
  Mail,
  Mountain,
  Package,
  Phone,
  Plus,
  RotateCw,
  Tag,
  Upload,
  User,
  UserCog,
  Waves,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { create } from "../(api)";
import { Api } from "@/utils/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Brand, Engine } from "@/models";
import {
  colSpan,
  driveTypeValues,
  grid,
  productStatusValues,
  transmisstionValues,
} from "@/lib/const";
import {
  DRIVE_TYPE,
  FORM_TYPE,
  PRODUCT_STATUS,
  TRANSMISSION,
} from "@/lib/enum";
import { imageUploader } from "../(api)/base";
import DataTable, { DataTableProps } from "@/components/table";
import { Option, Select } from "@/components/select";
import { FormHeader, Header } from "@/components/header";
import { FORM_GROUP } from "@/lib/constants";
import { getEnumValues } from "@/lib/function";
import { file } from "zod";

export const ProductPage = ({
  brands,
  engines,
  table,
  value,
  features,
  edit,
}: {
  brands: Option[];
  engines: Option[];
  features: Option[];
  value?: any;
  edit?: string;
  table: DataTableProps;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const submit = async (values: Record<string, any>) => {
    try {
      const { img, files, images, ...body } = values;

      const formData = new FormData();
      let image = null;
      let fileImages = null;
      if (img) {
        formData.append("files", img);
        const uploadResult = await imageUploader(formData);
        image = uploadResult[0];
      }
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
      payload.features = [
        payload.featureId1,
        payload.featureId2,
        payload.featureId3,
      ].filter((f) => f != undefined);
      console.log(payload);
      const res = edit
        ? await create(
            Api.product,
            {
              id: edit,
              ...payload,
            },
            "update"
          )
        : await create(
            Api.product,
            {
              ...payload,
              img: image,
            },
            "add"
          );
      if (res.data?.succeed) {
        router.refresh();
        router.push("/products");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      // setOpen(false);
    }
  };
  const status = getEnumValues(PRODUCT_STATUS).map((s) => ({
    label: productStatusValues[s],
    value: s,
  }));
  const items: FORM_GROUP = {
    ["Car Details"]: {
      data: [
        {
          form_type: FORM_TYPE.input,
          props: {
            Icon: User,
            label: "Name",
            name: "name",
            placeholder: "US",
          },
          classname: colSpan(),
        },
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
          form_type: FORM_TYPE.select,
          props: {
            name: "brandId",
            label: "Brand",
            Icon: BadgeCheck,
            options: brands,
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.select,
          props: {
            name: "engineId",
            label: "Engine",
            Icon: Zap,
            options: engines,
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.select,
          props: {
            name: "transmission",
            label: "Transmission",
            Icon: RotateCw,
            options: [TRANSMISSION.AUTOMATIC, TRANSMISSION.MECHANIC].map(
              (trans) => ({
                label: transmisstionValues[trans],
                value: trans,
              })
            ),
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.number,
          props: {
            name: "driver_min_age",
            Icon: User,
            label: "Power",
            placeholder: "22",
            type: "number",
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.select,
          props: {
            name: "drive_type",
            label: "Drive Type",
            Icon: Disc,
            options: [DRIVE_TYPE.RWD, DRIVE_TYPE.FWD, DRIVE_TYPE.WD].map(
              (trans) => ({
                label: driveTypeValues[trans],
                value: trans,
              })
            ),
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.number,
          props: {
            name: "seats",
            Icon: Armchair,
            label: "Seats",
            placeholder: "5",
            type: "number",
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.number,
          props: {
            name: "doors",
            Icon: DoorOpen,
            label: "Doors",
            placeholder: "5",
            type: "number",
          },
          classname: colSpan(),
        },
        {
          form_type: FORM_TYPE.input,
          props: {
            name: "luggage_capacity",
            label: "Luggage Capacity",
            Icon: Package,
            placeholder: "2 medium suitcases",
          },
          classname: colSpan(),
        },

        {
          form_type: FORM_TYPE.input,
          props: {
            name: "img",
            Icon: Image,
            label: "Image",
            placeholder: "22",
            type: "file",
          },
          classname: colSpan(),
        },
      ],
      classname: grid(),
    },

    Pricing: {
      data: [
        {
          form_type: FORM_TYPE.money,
          props: {
            name: "price",
            Icon: DollarSign,
            label: "Daily Price",
            placeholder: "1000",
          },
          classname: colSpan(),
        },
      ],
      classname: grid(),
    },
    Features: {
      data: [
        {
          form_type: FORM_TYPE.select,
          props: {
            name: "featureId1",
            label: "",
            Icon: Mountain,
            options: features,
          },
          classname: "col-span-4",
        },
        {
          form_type: FORM_TYPE.select,
          props: {
            name: "featureId2",
            label: "",
            Icon: Waves,
            options: features,
          },
          classname: "col-span-4",
        },
        {
          form_type: FORM_TYPE.select,
          props: {
            name: "featureId3",
            label: "",
            Icon: Compass,
            options: features,
          },
          classname: "col-span-4",
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
            label: "Car description",
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
  const handleFilter = (key: string, value: string) => {
    const query = new URLSearchParams();
    if (value && key) query.set(key, value);
    router.replace(`?${query.toString()}`); // server component дах page-ийг refresh
  };
  return (
    <div>
      {open ? (
        <FormHeader
          title={edit ? "Edit car" : "Create car"}
          label={edit ? "Edit car" : "Add a new car to the system"}
          onCancel={close}
        />
      ) : (
        <Header
          name="Cars"
          label="Manage cars"
          btn={
            <Button
              size={6}
              className="shadow-lg flex items-center shadow-primary/20"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Car
            </Button>
          }
          input={
            <form className="grid grid-cols-12 gap-6">
              <Select
                className="col-span-6"
                options={[{ label: "Select brand", value: "" }, ...brands]}
                onChange={(e) => handleFilter("brandId", e.target.value)}
                label="Brand"
                name="brandId"
                Icon={Gauge}
              />
              <Select
                className="col-span-6"
                options={[{ label: "Select engine", value: "" }, ...engines]}
                onChange={(e) => handleFilter("engineId", e.target.value)}
                label="Engine"
                Icon={Tag}
                name="engineId"
              />
            </form>
          }
        />
      )}

      {open ? (
        <Form
          title={edit ? "Edit car" : "Create car"}
          cancel={() => setOpen(false)}
          submit={submit}
          classname=""
          value={value}
          items={items}
        ></Form>
      ) : (
        <DataTable
          data={table.data}
          meta={table.meta}
          columns={table.columns}
          dicts={{
            status: productStatusValues,
            drive_type: driveTypeValues,
            transmission: transmisstionValues,
          }}
        />
      )}
    </div>
  );
};
