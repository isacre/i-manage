interface StatusBadgeProps {
  status: "Ativo" | "Inativo";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
