import { find, findOne } from "../(api)";
import { Feature } from "@/models";
import { Api } from "@/utils/api";
import { FeaturePage } from ".";
import { COLUMN } from "@/lib/enum";
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) => {
  const params = await searchParams;
  const columns = [
    { key: "name", type: COLUMN.text, header: "Name" },
    { key: "description", type: COLUMN.text, header: "Description" },
    { key: "approve", type: COLUMN.edit, header: "" },
    { key: "cancel", type: COLUMN.cancel, header: "" },
  ];
  const getFeatures = async () => {
    const res = await find<Feature>(Api.feature, {}, "list");
    const data = res.data;
    const items = data.items.map((d, i) => {
      const { ...body } = d;
      return {
        ...body,
      };
    });
    return { items, meta: data.meta };
  };
  const data = await getFeatures();
  const getFeatureById = async () => {
    const edit = params.edit;
    if (edit) {
      const res = await findOne(Api.feature, edit, "detail");
      return res;
    }
  };
  const value = await getFeatureById();
  return (
    <div className="min-h-screen bg-muted/30">
      <FeaturePage
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
