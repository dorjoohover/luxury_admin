import DataTable from "@/components/table";
import { find } from "../(api)";
import { User } from "@/models";
import { Api } from "@/utils/api";
import { UserPage } from ".";
import { COLUMN } from "@/lib/enum";
import { mobileFormatter } from "@/lib/function";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) => {
  const params = await searchParams;
  const columns = [
    { key: "name", type: COLUMN.text, header: "Name" },
    { key: "email", type: COLUMN.text, header: "email" },
    { key: "mobile", type: COLUMN.text, header: "mobile" },
    { key: "username", type: COLUMN.text, header: "username" },
    { key: "status", type: COLUMN.badge, header: "Status" },
    { key: "createdAt", type: COLUMN.date, header: "Created" },
  ];
  const getUsers = async () => {
    const res = await find<User>(
      Api.customer,
      {
        status: params?.status,
      },
      "list"
    );
    const data = res.data;
    const items = data.items.map((d, i) => {
      const { id, password, mobile, ...body } = d;
      return {
        ["№"]: i + 1,
        mobile: mobileFormatter(mobile),
        ...body,
      };
    });
    return { items, meta: data.meta };
  };
  const data = await getUsers();
  return (
    <div className="min-h-screen bg-muted/30">
      <UserPage
        table={{
          columns,
          data: data.items,
          meta: data.meta,
        }}
      />
    </div>
  );
};

export default Page;
