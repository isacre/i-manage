import CategoryComponent from "@/components/category";
import CompanyComponent from "@/components/company";
import { Metadata } from "next";
import { METADATA } from "./metadata";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CompanyType } from "@/types";
import { servicos } from "./mockData";

export const metadata: Metadata = METADATA;
export default async function Home() {
  const t = await getTranslations("Homepage");
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/`);
  const companies: CompanyType[] = await data.json();

  return (
    <div className="text-black flex flex-col gap-2">
      <h1 className="text-[24px] font-bold ">{t("categoryMessage")}</h1>
      <div className="flex items-center gap-5">
        {servicos.map((category) => (
          <CategoryComponent key={category.text} image={category.image} text={category.text} />
        ))}
      </div>
      <h2 className="text-[20px] font-medium">{t("topCompanyesMessage")}</h2>
      <Suspense fallback={<div>Loading ...</div>}>
        <div className="flex items-center gap-5">
          {companies.map((company) => (
            <CompanyComponent key={company.name} company={company} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
