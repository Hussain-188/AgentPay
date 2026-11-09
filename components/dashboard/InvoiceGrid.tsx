"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type RowClassParams,
} from "ag-grid-community";
import { StatusBadgeRenderer, AmountRenderer, OverdueRenderer } from "./CellRenderers";
import { InvoiceRow } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";
import { Search, Download } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface InvoiceGridProps {
  data: InvoiceRow[];
}

const STATUS_FILTERS = ["All", "PAID", "SENT", "DRAFT", "OVERDUE"] as const;

export function InvoiceGrid({ data }: InvoiceGridProps) {
  const gridRef = useRef<AgGridReact<InvoiceRow>>(null);
  const [quickFilter, setQuickFilter] = useState("");
  const [activeStatus, setActiveStatus] = useState<string>("All");

  const columnDefs = useMemo<ColDef<InvoiceRow>[]>(
    () => [
      {
        field: "invoiceNumber",
        headerName: "Invoice #",
        width: 160,
        sortable: true,
        pinned: "left" as const,
        cellClass: "font-mono font-medium",
      },
      {
        field: "recipientName",
        headerName: "Recipient",
        flex: 1,
        minWidth: 140,
        sortable: true,
        filter: true,
      },
      {
        field: "recipientEmail",
        headerName: "Email",
        flex: 1,
        minWidth: 160,
        sortable: true,
        filter: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        cellRenderer: AmountRenderer,
        width: 140,
        sortable: true,
        filter: "agNumberColumnFilter",
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
        valueFormatter: (p: { value: string }) =>
          p.value ? formatDate(p.value) : "",
        width: 130,
        sortable: true,
      },
      {
        field: "createdDate",
        headerName: "Created",
        valueFormatter: (p: { value: string }) =>
          p.value ? formatDate(p.value) : "",
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

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );

  const getRowClass = useCallback((params: RowClassParams<InvoiceRow>) => {
    if (!params.data) return "";
    if (params.data.isOverdue) return "bg-red-50 dark:bg-red-950/20";
    if (params.data.status === "DRAFT") return "bg-gray-50/50 dark:bg-gray-950/10";
    return "";
  }, []);

  const onQuickFilterChange = useCallback((value: string) => {
    setQuickFilter(value);
    gridRef.current?.api?.setGridOption("quickFilterText", value);
  }, []);

  const onStatusFilter = useCallback(
    (status: string) => {
      setActiveStatus(status);
      const api = gridRef.current?.api;
      if (!api) return;

      if (status === "All") {
        api.setFilterModel(null);
      } else if (status === "OVERDUE") {
        api.setFilterModel(null);
        api.setGridOption(
          "isExternalFilterPresent",
          () => true
        );
        api.setGridOption(
          "doesExternalFilterPass",
          (node: { data?: InvoiceRow }) => node.data?.isOverdue === true
        );
      } else {
        api.setGridOption("isExternalFilterPresent", () => false);
        api.setFilterModel({
          status: { filterType: "text", type: "equals", filter: status },
        });
      }
      api.onFilterChanged();
    },
    []
  );

  const onExportCsv = useCallback(() => {
    gridRef.current?.api?.exportDataAsCsv({
      fileName: "agentpay-invoices.csv",
    });
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={quickFilter}
            onChange={(e) => onQuickFilterChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div className="flex items-center gap-1">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => onStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <button
          onClick={onExportCsv}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      <div
        className="ag-theme-quartz h-[420px] w-full rounded-lg overflow-hidden border border-border"
        style={{ "--ag-font-size": "13px" } as React.CSSProperties}
      >
        <AgGridReact<InvoiceRow>
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          animateRows={true}
          rowSelection={{ mode: "singleRow" }}
          getRowClass={getRowClass}
          enableCellTextSelection={true}
        />
      </div>
    </div>
  );
}
