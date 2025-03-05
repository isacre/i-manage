"use client";
import { Menu } from "@/types";
import React, { useState } from "react";
import MenuComponent from "./menu";
import { BiCalendar } from "react-icons/bi";
import ButtonComponent from "../button";
import Link from "next/link";

interface Props {
  menus: Menu[];
  login: Function;
}
export default function NoAuthHeader({ menus, login }: Props) {
  return (
    <div className="bg-white fixed z-1 flex w-full h-20 border border-b-[#dcdcdc] align-center px-100 place-content-center justify-between">
      <div className="flex items-center gap-1">
        <Link className="flex items-center gap-1" href={"/"}>
          <BiCalendar size={30} className="text-red-600" />
          <p className="text-red-600">iManage</p>
        </Link>
        <div className="flex gap-3 items-center mx-10">
          {menus.map((menu) => (
            <MenuComponent menu={menu} key={menu.text} />
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <ButtonComponent onClickFn={() => console.log("")} text="criar conta" background="bg-transparent" color="text-red-600" />
        <ButtonComponent onClickFn={() => login()} text="Entrar" />
      </div>
    </div>
  );
}
