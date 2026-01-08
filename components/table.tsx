"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Check, Edit, Eye, Link as LLink, X } from "lucide-react";
import { create } from "@/app/(api)";
import { Api } from "@/utils/api";
import { COLUMN, STATUS } from "@/lib/enum";
import { TABLE_TYPE } from "@/lib/const";
import { createUniversalFormatter, money } from "@/lib/function";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import Link from "next/link";

export interface DataTableProps {
  data: Record<string, any>[];
  meta: any;
  columns?: {
    key: string;
    type: COLUMN;
    Icon?: any;
    classname?: string;
    header: string;
    onClick?: (id: string) => void;
  }[];
  dicts?: Record<string, Record<string, any>>;
  onPageChange?: (page: number) => void;
}

export default function DataTable({
  data,
  meta,
  columns,
  dicts = {},
  onPageChange,
}: DataTableProps) {
  const router = useRouter();

  if (!columns) return null;
  // Formatter
  const formatOrder = React.useMemo(
    () => createUniversalFormatter({ columns, dicts }),
    [columns, dicts]
  );
  // React Table column definitions
  const cols: ColumnDef<Record<string, any>>[] = React.useMemo(() => {
    return columns.map((col) => {
      return {
        accessorKey: col.key,
        header: col.header,
        cell: ({ row }) => {
          const formatted = formatOrder(row.original, row.index);

          const cellValue = formatted[col.key];
          if (!cellValue) return null;

          switch (cellValue.type) {
            case COLUMN.text:
              return <span onClick={cellValue.onClick}>{cellValue.value}</span>;
            case COLUMN.money:
              return (
                <span onClick={cellValue.onClick}>
                  {money(cellValue.value ?? "")}
                </span>
              );
            case COLUMN.boolean:
              return cellValue.value ? (
                <Check
                  className="w-4 h-4 text-green-500"
                  onClick={cellValue.onClick}
                />
              ) : (
                <X
                  className="w-4 h-4 text-red-500"
                  onClick={cellValue.onClick}
                />
              );
            case COLUMN.img:
              return (
                <Image
                  width={50}
                  height={50}
                  alt="Image"
                  src={`/api/file/${cellValue.value}`}
                  onClick={cellValue.onClick}
                />
              );
            case COLUMN.badge:
              return (
                <span
                  className={cn(
                    "px-2 py-1 rounded",
                    cellValue.status === STATUS.Approved && "bg-green-500",
                    cellValue.status === STATUS.Cancelled && "bg-red-500",
                    cellValue.status === STATUS.Pending && "bg-yellow-500",
                    cellValue.classname
                  )}
                  onClick={cellValue.onClick}
                >
                  {cellValue.value}
                </span>
              );
            case COLUMN.approve:
              return (
                <Button
                  className="flex text-green-500 px-2 py-1 bg-transparent"
                  onClick={() => {
                    if (col.onClick) col.onClick(row.original.id);
                  }}
                >
                  <Check size={20} className="text-green-500" />
                </Button>
              );
            case COLUMN.cancel:
              return (
                <Button
                  className="flex text-red-500 px-2 py-1 bg-transparent"
                  onClick={() => {
                    if (col.onClick) col.onClick(row.original.id);
                  }}
                >
                  <X size={20} />
                </Button>
              );
            case COLUMN.edit:
              return (
                <Button
                  className="flex px-2 py-1 bg-transparent hover:text-primary text-white"
                  onClick={() => edit(row.original.id)}
                >
                  <Edit size={20} />
                </Button>
              );
            case COLUMN.detail:
              return (
                <Link
                  className="flex text-white px-2 py-1 bg-transparent hover:text-primary"
                  href={`/${col.key}/${row.original.id}`}
                >
                  <Eye size={20} />
                </Link>
              );
            default:
              return <span onClick={cellValue.onClick}>{cellValue.value}</span>;
          }
        },
      };
    });
  }, [columns, formatOrder]);
  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const edit = async (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("edit", id);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const detail = async (id: string) => {};

  if (!data.length)
    return (
      <div className="text-center text-gray-500 p-4 border rounded-md">
        No data available
      </div>
    );

  const tableClass =
    "w-full  overflow-x-auto bg-background/70 backdrop-blur-md shadow-lg bg-background rounded-xl";

  const cellClass =
    "px-5 py-3 border-b border-border/20 text-white text-sm whitespace-nowrap";

  return (
    <div className="w-full space-y-4   p-6">
      <div className={tableClass}>
        <table className=" text-sm text-left border shadom-sm  rounded-xl overflow-hidden">
          <thead className="bg-primary/10 text-primary uppercase tracking-wider">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="px-5 py-3 text-[13px] font-semibold border-b border-border/20 whitespace-nowrap">
                  №
                </th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-3 text-[13px] font-semibold border-b border-border/20 whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`transition-colors ${
                  i % 2 === 0 ? "bg-background/80" : "bg-background/10"
                } hover:bg-primary/10`}
              >
                <td className={cellClass}>{i + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={cellClass}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-white gap-3 sm:gap-0 mt-3">
        <div className="text-center sm:text-left">
          Showing{" "}
          <span className="font-semibold text-primary">
            {meta.perPage * (meta.currentPage - 1) + 1}
          </span>{" "}
          –{" "}
          <span className="font-semibold text-primary">
            {Math.min(
              meta.perPage * meta.currentPage,
              parseInt(meta.totalCount)
            )}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-primary">{meta.totalCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="px-3 py-1.5 border border-border/30 rounded-md hover:bg-primary/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            size={6}
            disabled={meta.currentPage === 1}
            onClick={() => onPageChange?.(meta.currentPage - 1)}
          >
            Prev
          </Button>
          <span className="px-3 py-1">
            Page{" "}
            <span className="font-semibold text-primary">
              {meta.currentPage}
            </span>{" "}
            / {meta.pageCount}
          </span>
          <Button
            className="px-3 py-1.5 border border-border/30 rounded-md hover:bg-primary/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            size={6}
            disabled={meta.currentPage === meta.pageCount}
            onClick={() => onPageChange?.(meta.currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
