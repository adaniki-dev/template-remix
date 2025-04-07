import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { ExtendedRow, HeaderGroup, TableVirtualizedProps } from "./types";

export function TableVirtualized<T>({
  table,
  onClickRow,
}: TableVirtualizedProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const headerTableRef = useRef<HTMLTableSectionElement>(null);
  const { rows } = table.getRowModel();
  const [width, setWidth] = useState(0);

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 80,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });

  useEffect(() => {
    const element = headerTableRef.current;
    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width);
      });
      resizeObserver.observe(element);

      return () => resizeObserver.unobserve(element);
    }
  }, []);

  useEffect(() => {
    const parentElement = parentRef.current;
    const saveScrollPosition = () => {
      if (parentElement) {
        sessionStorage.setItem(
          "scrollPosition",
          parentElement.scrollTop.toString(),
        );
      }
    };

    if (parentElement) {
      parentElement.addEventListener("scroll", saveScrollPosition);
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener("scroll", saveScrollPosition);
      }
    };
  }, []);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition && parentRef.current) {
      parentRef.current.scrollTop = parseInt(scrollPosition, 10);
    }
  }, [rows.length]);
  return (
    <div ref={parentRef} className="rounded-md border bg-white relative">
      {rows.length !== 0 ? (
        <Table className="relative grid top-0 rounded-md">
          <TableHeader
            ref={headerTableRef}
            className="sticky grid top-0 z-10 rounded-md"
          >
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
              <TableRow
                className="items-center py-3 grid bg-white rounded-t-md w-full"
                style={{
                  gridTemplateColumns: headerGroup.headers
                    .map((header) => `${header.getSize()}px`)
                    .join(" "),
                }}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    style={{
                      gridColumn: `span 1`,
                      width: `${header.getSize()}px`,
                    }}
                    className={`h-min relative rounded-md`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                      ></div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            style={{ height: `${virtualizer.getTotalSize()}px` }}
            className="relative grid w-full"
          >
            {virtualizer.getVirtualItems().length > 0 &&
              virtualizer.getVirtualItems().map((virtualRow: any) => {
                const row = rows[virtualRow.index] as ExtendedRow<T>;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    style={{
                      width: `${width}px`,
                      gridTemplateColumns: row
                        .getVisibleCells()
                        .map((cell: any) =>
                          cell.column.id === "actions"
                            ? "minmax(260px, auto)"
                            : `${cell.column.getSize()}px`,
                        )
                        .join(" "),
                      position: "absolute",
                      transform: `translateY(${
                        virtualRow.start - virtualizer.options.scrollMargin
                      }px)`,
                    }}
                    className={`cursor-pointer capitalize items-center grid h-[80px]`}
                    onClick={() => onClickRow && onClickRow(row.original)}
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500">Nenhum registro encontrado</p>
        </div>
      )}
    </div>
  );
}
