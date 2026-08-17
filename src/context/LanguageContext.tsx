"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Lang = "cs" | "en";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (cs: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "cs",
  toggle: () => {},
  t: (cs) => cs,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("cs");

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "cs" ? "en" : "cs"));
  }, []);

  const t = useCallback(
    (cs: string, en: string) => (lang === "cs" ? cs : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
