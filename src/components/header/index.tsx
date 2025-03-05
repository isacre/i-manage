"use client";
import { Menu } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AuthenticatedHeader from "./authenticated";
import NoAuthHeader from "./non_autenthicated";

interface Props {
  menus: Menu[];
}
export default function Header({ menus }: Props) {
  const t = useTranslations();
  const [Authenticated, setAuthenticated] = useState(true);
  return (
    <>
      {Authenticated ? (
        <AuthenticatedHeader
          menus={menus.map((item) => {
            return {
              text: t("Categoryes." + item.text),
              link: item.link,
              onClick: item.onClick,
            };
          })}
        />
      ) : (
        <NoAuthHeader login={() => setAuthenticated(true)} menus={menus} />
      )}
    </>
  );
}
