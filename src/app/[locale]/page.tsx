import CategoryComponent from "@/components/category";
import CompanyComponent, { CompanyMiniatureProps } from "@/components/company";
import { Metadata } from "next";
import { METADATA } from "./metadata";
import { useTranslations } from "next-intl";

export const metadata: Metadata = METADATA;

export default function Home() {
  const t = useTranslations("Homepage");
  const prestadores: CompanyMiniatureProps[] = [
    {
      id: 1,
      text: "Clínica do Russo",
      image: "https://www.cliquemedicos.com.br/blog/wp-content/uploads/2020/01/Cl%C3%ADnico-M%C3%A9dico-scaled.jpg",
      category: "health",
      rating: 4.5,
      price_category: 5,
    },
    {
      id: 2,
      text: "Oficina do João",
      image: "https://ultracar.com.br/wp-content/uploads/2024/04/carreira-profissional-na-mecanica.jpg",
      category: "mechanic",
      rating: 3.2,
      location: ["local"],
      price_category: 3,
      available: false,
    },
  ];
  const servicos = [
    { text: "eletric", image: "https://dutotec.com.br/blog/wp-content/uploads/2021/02/manutencao-eletrica.jpg" },
    { text: "mechanic", image: "https://mecanie.com.br/artigos/wp-content/uploads/2024/03/tecnico-em-mecanica.png" },
    { text: "health", image: "https://www.raelrosa.com.br/wp-content/uploads/2021/02/RAEL-70.jpg" },
    {
      text: "home",
      image:
        "https://www.cleanipedia.com/images/00d1hxgfwfa6/15l8CjNcpsrN7c6lM7k2iq/d082799a98cf3dd54a28584550a13128/NS5qcGc/1200w/bra%C3%A7o-segurando-um-balde-com-produtos-de-limpeza-em-um-ambiente-interno-movimentado..jpg",
    },
    { text: "services", image: "https://www.masterhousesolucoes.com.br/wp-content/uploads/2017/10/consertar_telhado.jpg" },
  ];
  return (
    <div className="pt-30 w-[80vw] m-auto text-black flex flex-col gap-2">
      <h1 className="text-[24px] font-bold ">{t("categoryMessage")}</h1>
      <div className="flex items-center gap-5">
        {servicos.map((category) => (
          <CategoryComponent key={category.text} image={category.image} text={category.text} />
        ))}
      </div>
      <h2 className="text-[20px] font-medium">{t("topCompanyesMessage")}</h2>
      <div className="flex items-center gap-5">
        {prestadores.map((company) => (
          <CompanyComponent key={company.text} company={company} />
        ))}
      </div>
    </div>
  );
}
