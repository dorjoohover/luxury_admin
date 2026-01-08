import { find, findOne } from "../(api)";
import { Order, User } from "@/models";
import { Api } from "@/utils/api";
import { OrderPage } from ".";

import { mobileFormatter } from "@/lib/function";
import { COLUMN } from "@/lib/enum";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string; edit?: string }>;
}) => {
  const params = await searchParams;

  const usersResponse = await find<User>(Api.customer, {}, "list");
  const users = usersResponse.data.items.map((user) => ({
    label: `${mobileFormatter(user.mobile)} ${user.username}`,
    value: user.id,
  }));
  const productsResponse = await find<User>(Api.product, {}, "list");
  const products = productsResponse.data.items.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const getOrders = async () => {
    const res = await find<Order>(
      Api.order,
      { userId: params?.userId },
      "list"
    );
    const data = res.data;
    const items = await Promise.all(
      data.items.map((d) => {
        const { meta, mobile, ...body } = d;
        return { ...body, ...meta };
      })
    );
    return { items: items, meta: data.meta };
  };

  const data = await getOrders();
  const getOrderById = async () => {
    const edit = params.edit;
    if (edit) {
      const res = await findOne(Api.brand, edit, "detail");
      return res;
    }
  };
  const value = await getOrderById();
  return (
    <div className="min-h-screen bg-muted/30 ">
      <OrderPage
        products={products}
        users={users}
        table={{
          data: data.items,
          meta: data.meta,
        }}
        value={value?.payload}
      />
    </div>
  );
};

export default Page;
