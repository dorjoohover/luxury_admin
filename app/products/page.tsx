import DataTable from "@/components/table";
import { find, findOne } from "../(api)";
import { Brand, Engine, Feature, Product, User } from "@/models";
import { Api } from "@/utils/api";
import { ProductPage } from ".";

import { mnDateFormat, money } from "@/lib/function";
import { productStatusValues, transmisstionValues } from "@/lib/const";
import { COLUMN } from "@/lib/enum";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ brandId?: string; engineId?: string; edit?: string }>;
}) => {
  const params = await searchParams;
  const enginesResponse = await find<Engine>(Api.engine, {}, "list");
  const engineMap = Object.fromEntries(
    enginesResponse.data.items.map((item: any) => [item.id, item.name])
  );
  const engines = enginesResponse.data.items.map((engine) => ({
    label: `${engine.name}`,
    value: engine.id,
  }));
  const brandsResponse = await find<Brand>(Api.brand, {}, "list");
  const brandMap = Object.fromEntries(
    brandsResponse.data.items.map((item: any) => [item.id, item.name])
  );
  const brands = brandsResponse.data.items.map((brand) => ({
    label: `${brand.name}`,
    value: brand.id,
  }));
  const featuresResponse = await find<Feature>(Api.feature, {}, "list");
  const features = featuresResponse.data.items.map((feature) => ({
    label: `${feature.name}`,
    value: feature.id,
  }));
  const columns = [
    { key: "img", type: COLUMN.img, header: "img" },
    { key: "name", type: COLUMN.text, header: "Name" },
    { key: "brandName", type: COLUMN.text, header: "Brand" },
    { key: "engineName", type: COLUMN.text, header: "Engine" },
    { key: "luggage_capacity", type: COLUMN.text, header: "luggage" },
    { key: "price", type: COLUMN.money, header: "Price" },
    { key: "description", type: COLUMN.text, header: "description" },
    { key: "drive_type", type: COLUMN.enum, header: "Drive" },
    { key: "createdAt", type: COLUMN.date, header: "Created" },
    { key: "doors", type: COLUMN.text, header: "door" },
    { key: "driver_min_age", type: COLUMN.text, header: "age" },
    { key: "seats", type: COLUMN.text, header: "seats" },
    { key: "transmission", type: COLUMN.enum, header: "transmission" },
    { key: "approve", type: COLUMN.edit, header: "" },
  ];
  const getProducts = async () => {
    const res = await find<Product>(
      Api.product,
      { brandId: params?.brandId, engineId: params.engineId },
      "list"
    );
    const data = res.data;
    const items = await Promise.all(
      data.items.map((d) => {
        const { brandId, engineId, features, ...body } = d;
        const brandName = brandId ? brandMap[brandId] : "";
        const engineName = engineId ? engineMap[engineId] : "";
        let payload = { ...body, brandName, engineName } as any;
        if (d.features && d.features.length > 0) {
          payload.featureId1 = d.features[0];
          payload.featureId2 = d.features[1];
          payload.featureId3 = d.features[2];
        }
        return payload;
      })
    );
    return { items: items, meta: data.meta };
  };
  const data = await getProducts();
  const getProductById = async () => {
    const edit = params.edit;
    if (edit) {
      const res = await findOne(Api.product, edit, "detail");
      const { features, ...body } = res.payload;
      let payload = { ...body } as any;
      if (features && features.length > 0) {
        payload.featureId1 = features[0].id;
        payload.featureId2 = features[1].id;
        payload.featureId3 = features[2].id;
      }
      if (payload.images) {
        payload.images = payload.images.map((i: any) => i.url);
      }
      return payload;
    }
  };
  const value = await getProductById();
  return (
    <div className="min-h-screen bg-muted/30">
      <ProductPage
        brands={brands}
        engines={engines}
        features={features}
        table={{
          columns,
          data: data.items,
          meta: data.meta,
        }}
        value={value}
        edit={params.edit}
      />
    </div>
  );
};

export default Page;
