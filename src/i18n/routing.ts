import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "pt-BR"],
  defaultLocale: "en",
  domains: [
    {
      domain: "isaactecnologias.localhost",
      defaultLocale: "pt-BR",
      locales: ["pt-BR", "en"],
    },
  ],
})
