"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { locales } from "@/i18n/i18n-config";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./TransitionLink";

export default function LangChangeHandler({
  lang,
  translations,
}: {
  lang: LocalePage;
  translations: Sanity.Translation[];
}): React.ReactNode {
  
  const [newRoute, setNewRoute] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean); // Remove empty strings
    const type = segments[1];
    const slug = segments[2];

    const otherLang = lang === "en" ? "es" : "en";

    if (!type && !slug) {
      setNewRoute(`/${otherLang}`);
    } else if (!slug && type) {
      translations.forEach((translation) => {
        if (translation[lang]?.slug === type && translation[lang]?.type === "page") {
          setNewRoute(`/${otherLang}/${translation[otherLang]?.slug}`);
        } else {
          setNewRoute(`/${otherLang}`);
        }
      });
    } else if (type === "projects") {
      translations.forEach((translation) => {
        if (translation[lang]?.slug === slug && translation[lang]?.type === "project.post") {
          setNewRoute(`/${otherLang}/projects/${translation[otherLang].slug}`);
        } else {
          setNewRoute(`/${otherLang}`);
        }
      });
    }
  }, [lang, pathname, translations]);

  const otherLocale = locales.filter((locale) => locale !== lang)[0];

  return (
    <>
      <TransitionLink href={`${newRoute}`}>
        [{otherLocale === "es" ? "esp" : "en"}]
      </TransitionLink>
    </>
  );
}