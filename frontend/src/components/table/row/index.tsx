import React from "react"
interface TableRowProps {
  children: React.ReactNode
  gridTemplateColumns: string
}

export default function TableRow({ children, gridTemplateColumns }: TableRowProps) {
  const wrapperStyle = `items-center grid w-full border-b border-gray-200 bg-white transition-colors hover:bg-gray-50 [&>*]:items-center [&>*]:px-6 [&>*]:py-6 [&>*]:text-sm [&>*]:whitespace-nowrap [&>*]:text-gray-500  `
  return (
    <div tabIndex={0} className={wrapperStyle} style={{ gridTemplateColumns: gridTemplateColumns }}>
      {children}
    </div>
  )
}
