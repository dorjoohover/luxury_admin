import DataTable from "@/components/table";
import { find, findOne } from "../(api)";
import { Engine, User } from "@/models";
import { Api } from "@/utils/api";
import { EnginePage } from ".";
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
  const getEngines = async () => {
    const res = await find<Engine>(Api.engine, {}, "list");
    const data = res.data;
    const items = data.items.map((d, i) => {
      const { ...body } = d;
      return {
        ...body,
      };
    });
    return { items, meta: data.meta };
  };
  const data = await getEngines();
  const getEngineById = async () => {
    const edit = params.edit;
    if (edit) {
      const res = await findOne(Api.engine, edit, "detail");
      return res;
    }
  };
  const value = await getEngineById();
  return (
    <div className="min-h-screen bg-muted/30">
      <EnginePage
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
