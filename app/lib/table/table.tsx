import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export function SimpleTable<T>({ table, onClickRow }: any) {
  const { rows } = table.getRowModel();

  return (
    <div className="rounded-md border bg-white py-1">
      {rows.length !== 0 ? (
        <Table>
          <TableHeader className="sticky top-0 z-10 ">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow
                key={headerGroup.id}
                className="bg-white"
                style={{
                  gridTemplateColumns: headerGroup.headers
                    .map((header: any) => `${header.getSize()}px`)
                    .join(" "),
                }}
              >
                {headerGroup.headers.map((header: any) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className=" relative"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer capitalize"
                onClick={() => onClickRow && onClickRow(row.original)}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
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
