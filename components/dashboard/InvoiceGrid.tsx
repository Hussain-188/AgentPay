"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from "ag-grid-community";
import { StatusBadgeRenderer, AmountRenderer, OverdueRenderer } from "./CellRenderers";
import { InvoiceRow } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";

ModuleRegistry.registerModules([AllCommunityModule]);

interface InvoiceGridProps {
  data: InvoiceRow[];
}

export function InvoiceGrid({ data }: InvoiceGridProps) {
  const columnDefs = useMemo<ColDef<InvoiceRow>[]>(
    () => [
      { field: "invoiceNumber", headerName: "Invoice #", width: 160, sortable: true },
      { field: "recipientName", headerName: "Recipient", flex: 1, sortable: true, filter: true },
      { field: "recipientEmail", headerName: "Email", flex: 1, sortable: true },
      {
        field: "amount",
        headerName: "Amount",
        cellRenderer: AmountRenderer,
        width: 140,
        sortable: true,
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: StatusBadgeRenderer,
        width: 120,
        filter: true,
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        valueFormatter: (p: { value: string }) => formatDate(p.value),
        width: 130,
        sortable: true,
      },
      {
        field: "isOverdue",
        headerName: "",
        cellRenderer: OverdueRenderer,
        width: 100,
      },
    ],
    []
  );

  return (
    <div className="ag-theme-quartz h-[400px] w-full" style={{ "--ag-font-size": "13px" } as React.CSSProperties}>
      <AgGridReact<InvoiceRow>
        rowData={data}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
        rowSelection="single"
        defaultColDef={{ resizable: true }}
      />
    </div>
  );
}
