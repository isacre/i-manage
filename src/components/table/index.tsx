"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";

interface TableProps<T> {
  headers: string[];
  data: T[];
  children: React.ReactNode | React.ReactNode[];
  title: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  loading: boolean;
}

export default function Table<T>({ headers, data, children, title, actionButton, loading }: TableProps<T>) {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={actionButton?.onClick}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <FiPlus size={20} />
          <span>{actionButton?.label}</span>
        </button>
      </div>
      <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={100} className="text-center p-10">
                  Carregando...
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
