export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
        AP
      </div>
      {!collapsed && (
        <span className="text-lg font-bold tracking-tight">
          Agent<span className="text-blue-600">Pay</span>
        </span>
      )}
    </div>
  );
}
