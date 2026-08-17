"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

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

  useEffect(() => {
    const saved = localStorage.getItem("metahealth-lang") as Lang | null;
    if (saved === "cs" || saved === "en") {
      setLang(saved);
    } else {
      // Auto-detect from browser language
      const browserLang = navigator.language || "";
      const detected = browserLang.startsWith("cs") ? "cs" : "en";
      setLang(detected);
      localStorage.setItem("metahealth-lang", detected);
    }
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "cs" ? "en" : "cs";
      localStorage.setItem("metahealth-lang", next);
      return next;
    });
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
