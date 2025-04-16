"use client";

interface TableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  title: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function Table<T>({ headers, data, renderRow, title, actionButton }: TableProps<T>) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-200 flex items-center gap-2"
          >
            {actionButton.label}
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">{data.map((item, index) => renderRow(item))}</tbody>
        </table>
      </div>
    </div>
  );
}
