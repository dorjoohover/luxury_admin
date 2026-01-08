import { find } from "@/app/(api)";
import { Button } from "@/components/button";
import { DetailCard } from "@/components/cards";
import {
  orderStatusClass,
  orderStatusValues,
  transmisstionValues,
} from "@/lib/const";
import { firstLetterUpper, mnDateFormat, money } from "@/lib/function";
import { cn } from "@/lib/utils";
import { Order } from "@/models";
import { Api } from "@/utils/api";
import { differenceInDays } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) return null;
  const { data, error } = await find<Order>(Api.order, {}, "detail/" + id);
  if (error) return null;
  const order = data as unknown as Order;
  const meta = data.meta as any;
  const product = order.product;
  const diff = differenceInDays(order.endDate, order.startDate);
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-white/10 bg-gradient-to-b from-muted to-primary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href={"/orders"}
              className="text-white p-1.5 rounded-md transition-all duration-300 hover:bg-primary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex-1 text-white">
              <h1 className="font-bolder">Order Details</h1>
              <p className="text-muted-foreground">Order ID: {order.id}</p>
            </div>
            <div
              className={cn(
                orderStatusClass[order.status],
                "rounded-md text-xs px-2 py-0.5"
              )}
            >
              {orderStatusValues[order.status]}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DetailCard title="User Information">
            <LabelValue label="Name" value={meta.userName} />
            <LabelValue label="Mobile" value={order.mobile} />
            <LabelValue label="Email" value={order.email} />
          </DetailCard>
          <DetailCard title="Car Information">
            {product && (
              <div>
                <div className="w-full items-center justify-center flex  relative  h-50">
                  <Image
                    alt={product.name ?? ""}
                    fill
                    className="object-contain"
                    src={`/api/file/${product.img}`}
                  />
                </div>
                <LabelValue label="Name" value={product?.name ?? ""} />
                <div className="flex">
                  {product.transmission && (
                    <LabelValue
                      label="Transmission"
                      value={transmisstionValues[product?.transmission] ?? ""}
                    />
                  )}
                  <LabelValue
                    label="Seats"
                    value={(product?.seats ?? "").toString()}
                  />
                </div>
                <LabelValue
                  label="Price"
                  value={money(product?.price ?? "0", "$")}
                />
              </div>
            )}
          </DetailCard>
          <DetailCard title="Rental Period">
            <LabelValue
              label="Start Date"
              value={mnDateFormat(order.startDate, false)}
            />
            <LabelValue
              label="End Date"
              value={mnDateFormat(order.endDate, false)}
            />
            <LabelValue label="Total Days" value={diff} />
            <div className="w-full h-0.25 bg-white/10 my-2" />
            <LabelValue
              label=" Total Price"
              value={money(diff * (product?.price ?? 0), "$")}
            />
          </DetailCard>
          <DetailCard title="Additional Information">
            <LabelValue label="Description" value={order.description} />
            <LabelValue
              label="Created at"
              value={mnDateFormat(order.createdAt)}
            />
          </DetailCard>
        </div>
      </div>
    </div>
  );
};

const LabelValue = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="my-2 flex-1">
      <p className="text-white/50 mb-0.5 text-xs">{label}</p>
      <p className="text-white text-xs">{firstLetterUpper(`${value}`)}</p>
    </div>
  );
};

export default Page;
