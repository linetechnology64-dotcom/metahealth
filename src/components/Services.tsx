"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import type { ReactNode } from "react";

const IconCoaching = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconNutrition = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5.5-5 9-3-3.5-5-6-5-9a5 5 0 0 1 5-5z" />
    <path d="M12 16v6" />
    <path d="M8 22h8" />
  </svg>
);

const IconAssessment = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const IconCourses = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h6" />
  </svg>
);

const IconGroup = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconSupplement = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
  </svg>
);

const services: { icon: ReactNode; path: string; priceCs: string; priceEn: string; cs: { title: string; desc: string }; en: { title: string; desc: string } }[] = [
  {
    icon: <IconCoaching />, path: "/dashboard/coaching", priceCs: "800 Kč", priceEn: "£25",
    cs: { title: "Vstupní konzultace", desc: "60–75 minut. Komplexní zhodnocení stravování, životního stylu a cílů. Individuální doporučení a praktické kroky. Online: 750 Kč." },
    en: { title: "Initial Consultation", desc: "60–75 minutes. Comprehensive assessment of nutrition, lifestyle and goals. Personalised recommendations. Online: £25." },
  },
  {
    icon: <IconNutrition />, path: "/dashboard/nutrition", priceCs: "od 450 Kč", priceEn: "from £15",
    cs: { title: "Následná konzultace", desc: "30 min / 450 Kč — 60 min / 750 Kč. Kontrola pokroku, úpravy výživy, odpovědi na otázky. Online: 400 Kč / 700 Kč." },
    en: { title: "Follow-up Consultation", desc: "30 min / £15 — 60 min / £25. Progress review, nutrition adjustments, Q&A. Online: £13 / £23." },
  },
  {
    icon: <IconAssessment />, path: "/dashboard/assessments", priceCs: "od 1 500 Kč", priceEn: "from £50",
    cs: { title: "Individuální výživový plán", desc: "Plán na míru podle vašich cílů, preferencí a životního stylu. Kalorický příjem, makroživiny, struktura jídel a doporučení potravin." },
    en: { title: "Personalised Nutrition Plan", desc: "Tailored plan based on your goals, preferences and lifestyle. Calorie and macro targets, meal structure and food recommendations." },
  },
  {
    icon: <IconGroup />, path: "/dashboard/groups", priceCs: "2 200 Kč", priceEn: "£70",
    cs: { title: "6týdenní program", desc: "Vstupní konzultace, individuální doporučení, 2 následné konzultace, podpora mezi sezeními. Online: 2 000 Kč." },
    en: { title: "6-Week Programme", desc: "Initial consultation, personalised recommendations, 2 follow-ups, support between sessions. Online: £65." },
  },
  {
    icon: <IconCourses />, path: "/dashboard/courses", priceCs: "3 900 Kč", priceEn: "£130",
    cs: { title: "3měsíční program", desc: "Komplexní podpora: vstupní konzultace, výživová strategie, 4 následné konzultace, průběžné úpravy a vedení. Online: 3 500 Kč." },
    en: { title: "3-Month Programme", desc: "Comprehensive support: initial consultation, nutrition strategy, 4 follow-ups, ongoing adjustments and guidance. Online: £115." },
  },
  {
    icon: <IconSupplement />, path: "/dashboard/supplements", priceCs: "900 Kč", priceEn: "£30",
    cs: { title: "Rozbor jídelníčku", desc: "Analýza současného stravování s konkrétními doporučeními. Vhodné samostatně nebo jako doplněk ke konzultaci." },
    en: { title: "Diet Analysis", desc: "Analysis of your current eating patterns with specific improvement recommendations. Available standalone or as a consultation add-on." },
  },
];

export default function Services() {
  const { lang, t } = useLang();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user));
  }, []);

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-tag">{t("Výživové poradenství", "Nutrition Consultation")}</span>
          <h2 className="section-title">{t("Personalizované koučovací služby", "Personalised Coaching Services")}</h2>
          <p className="section-subtitle">
            {t(
              "Individuální výživové poradenství, které vám pomůže vytvořit zdravější návyky a dosáhnout udržitelných výsledků. Osobně ve Vracově / Hodoníně a online po celé ČR i v zahraničí.",
              "Personalised nutrition guidance to help you build healthier habits and achieve sustainable results. Available in person in Vracov / Hodonín area and online throughout the Czech Republic and abroad."
            )}
          </p>
          <p className="section-contact">
            {t("Online konzultace přes WhatsApp & Microsoft Teams", "Online consultations via WhatsApp & Microsoft Teams")}
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => {
            const data = lang === "cs" ? s.cs : s.en;
            return (
              <div className="service-card" key={i}>
                <div className="service-icon">{s.icon}</div>
                <h3>{data.title}</h3>
                {<span className="service-price">{lang === "cs" ? s.priceCs : s.priceEn}</span>}
                <p>{data.desc}</p>
                <a href={loggedIn ? s.path : "/signup"} className="service-link">
                  {t("Více informací \u2192", "Learn More \u2192")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
