export default function DataTable({ columns, rows, rowKey = 'id', onRowClick, loading, emptyMessage = 'Không có dữ liệu.' }) {
  return (
    <div className="admin-glass overflow-x-auto rounded-2xl">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-white/70 bg-white/40">
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 text-left font-semibold text-ink ${col.headerClassName || ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/60">
          {loading ? (
            <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-faint">Đang tải...</td></tr>
          ) : rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-faint">{emptyMessage}</td></tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row[rowKey]}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'cursor-pointer transition-colors hover:bg-white/60' : ''}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-ink ${col.className || ''}`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
