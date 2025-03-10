import { Menu } from "@/types";
import { useTranslations } from "next-intl";
import AuthenticatedHeader from "./authenticated";

interface Props {
  menus: Menu[];
}
export default function Header({ menus }: Props) {
  const t = useTranslations();
  return (
    <AuthenticatedHeader
      menus={menus.map((item) => {
        return {
          text: t("Categories." + item.text),
          link: item.link,
          onClick: item.onClick,
        };
      })}
    />
  );
}
