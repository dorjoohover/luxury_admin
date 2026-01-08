import { find, findOne } from "../(api)";
import { Brand } from "@/models";
import { Api } from "@/utils/api";
import { BrandPage } from ".";
import { COLUMN } from "@/lib/enum";
import { mobileFormatter } from "@/lib/function";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) => {
  const params = await searchParams;

  const columns = [
    { key: "name", type: COLUMN.text, header: "Name" },
    { key: "approve", type: COLUMN.edit, header: "" },
    { key: "cancel", type: COLUMN.cancel, header: "" },
  ];
  const getBrands = async () => {
    const res = await find<Brand>(Api.brand, {}, "list");
    const data = res.data;
    const items = data.items.map((d, i) => {
      const { ...body } = d;
      return {
        ...body,
      };
    });
    return { items, meta: data.meta };
  };
  const data = await getBrands();
  const getBrandById = async () => {
    const edit = params.edit;
    if (edit) {
      const res = await findOne(Api.brand, edit, "detail");
      return res;
    }
  };
  const value = await getBrandById();
  return (
    <div className="min-h-screen bg-muted/30">
      <BrandPage
        edit={params.edit}
        table={{
          columns,
          data: data.items,
          meta: data.meta,
        }}
        value={value?.payload}
      />
    </div>
  );
};

export default Page;
