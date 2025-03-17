import CompanyDetails from ".";

interface Props {
  params: Promise<{ companyId: string }>;
}
interface Props {
  text: string;
  description: string;
  price: number;
  duration?: number;
}
export default async function CompanyPage({ params }: Props) {
  const { companyId } = await params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}/`);
  const selectedCompany = await data.json();
  return <CompanyDetails selectedCompany={selectedCompany} />;
}
