"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from "ag-grid-community";
import { StatusBadgeRenderer, AmountRenderer, DateRenderer } from "./CellRenderers";
import { TransactionRow } from "@/lib/types";

ModuleRegistry.registerModules([AllCommunityModule]);

interface TransactionGridProps {
  data: TransactionRow[];
}

export function TransactionGrid({ data }: TransactionGridProps) {
  const columnDefs = useMemo<ColDef<TransactionRow>[]>(
    () => [
      {
        field: "date",
        headerName: "Date",
        cellRenderer: DateRenderer,
        sortable: true,
        sort: "desc" as const,
        width: 130,
      },
      { field: "type", headerName: "Type", width: 120, sortable: true, filter: true },
      { field: "name", headerName: "Name", flex: 1, sortable: true, filter: true },
      { field: "email", headerName: "Email", flex: 1, sortable: true },
      {
        field: "amount",
        headerName: "Amount",
        cellRenderer: AmountRenderer,
        sortable: true,
        width: 140,
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: StatusBadgeRenderer,
        width: 130,
        filter: true,
      },
      {
        field: "fee",
        headerName: "Fee",
        valueFormatter: (p: { value: number }) => `$${p.value.toFixed(2)}`,
        width: 100,
        sortable: true,
      },
      {
        field: "netAmount",
        headerName: "Net",
        cellRenderer: AmountRenderer,
        width: 140,
        sortable: true,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
    }),
    []
  );

  return (
    <div className="ag-theme-quartz h-[400px] w-full" style={{ "--ag-font-size": "13px" } as React.CSSProperties}>
      <AgGridReact<TransactionRow>
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
        rowSelection="single"
      />
    </div>
  );
}
