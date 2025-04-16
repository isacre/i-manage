import { Button } from "@radix-ui/themes";
import React from "react";

export default function Employees() {
  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-2xl font-bold">Funcionários</h1>
      <Button color="tomato" className="bg-red-600 text-white rounded-full">
        Adicionar Funcionário
      </Button>
    </div>
  );
}
