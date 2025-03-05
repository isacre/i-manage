import React from "react";

interface Props {
  params: Promise<{ companyId: string }>;
}
export default async function CompanyPage({ params }: Props) {
  const { companyId } = await params;
  return <div className="pt-20">{companyId}</div>;
}
