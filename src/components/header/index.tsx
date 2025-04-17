"use client";
import { getUserData } from "@/services/auth";
import { useUserStore } from "@/stores/user-store";
import { Menu } from "@/types";
import { deleteCookie, getCookie } from "@/utils";
import { useEffect } from "react";
import AuthenticatedHeader from "./authenticated";
import UnauthenticatedHeader from "./unauthenticated";
interface Props {
  menus: Menu[];
}
export default function Header({ menus }: Props) {
  const access = getCookie("access");
  const update = useUserStore((state) => state.update);
  const user = useUserStore((state) => state.user);

  function handleGetUserData() {
    if (access) {
      getUserData()
        .then((res) => {
          update(res);
        })
        .catch(() => {
          deleteCookie("access");
        });
    } else {
      update(null);
    }
  }
  useEffect(() => {
    handleGetUserData();
  }, [access]);

  return <div>{user === null ? <UnauthenticatedHeader /> : <AuthenticatedHeader menus={menus} />}</div>;
}
