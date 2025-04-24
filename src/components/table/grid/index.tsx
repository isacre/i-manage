import React from "react"
import * as s from "./styles"

interface GridProps {
  headers: string[]
  children: React.ReactNode
  loading: boolean
  gridTemplateColumns?: string
  itemsAmount: number
}

export default function Grid({
  headers,
  children,
  loading,
  gridTemplateColumns = `repeat(${headers.length}, 1fr)`,
  itemsAmount,
}: GridProps) {
  return (
    <div className={s.container}>
      <div className={s.grid} style={{ gridTemplateColumns: gridTemplateColumns }}>
        {headers.map((header) => (
          <div key={header} className={s.headerCell}>
            {header}
          </div>
        ))}
      </div>
      {loading ? (
        <div className={s.loadingCell}>Carregando...</div>
      ) : (
        <div className={s.contentCell}>
          {itemsAmount === 0 ? <div className={s.emptyCell}>Nenhum resultado encontrado</div> : children}
        </div>
      )}
    </div>
  )
}
