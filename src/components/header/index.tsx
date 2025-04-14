import { Menu } from "@/types";
import { useTranslations } from "next-intl";
import AuthenticatedHeader from "./authenticated";
import UnauthenticatedHeader from "./unauthenticated";

interface Props {
  menus: Menu[];
}
export default function Header({}: Props) {
  const t = useTranslations();
  return (
    /*  <AuthenticatedHeader
      menus={menus.map((item) => {
        return {
          text: t("Categories." + item.text),
          link: item.link,
          onClick: item.onClick,
        };
      })}
    /> */
    <UnauthenticatedHeader />
  );
}
