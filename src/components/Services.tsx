"use client";

import { useLang } from "@/context/LanguageContext";

const services = [
  {
    icon: "\u{1F331}",
    cs: { title: "Individualni koucink", desc: "Hloubkove konzultace s prubeznnou podporou. Zhodnotime vasi zdravotni historii, laboratorni vysledky a zivotni styl pro vytvoreni personalniho planu." },
    en: { title: "1-on-1 Coaching", desc: "Deep-dive consultations with ongoing support. We assess your health history, lab work, and lifestyle to build a personalised cellular nutrition plan." },
  },
  {
    icon: "\u{1F34E}",
    cs: { title: "Nutricni plany", desc: "Jidelnicek na miru podle vaseho metabolickeho typu, potravinovych citlivosti a cilu bunecneho zdravi. Aktualizovany podle vaseho pokroku." },
    en: { title: "Nutrition Plans", desc: "Custom meal frameworks designed around your metabolic type, food sensitivities, and cellular health goals. Updated as your body evolves." },
  },
  {
    icon: "\u{1F52C}",
    cs: { title: "Zdravotni analyzy", desc: "Komplexni analyza vcetne interpretace laboratornich vysledku, telesneho slozeni a markeru bunecneho zdravi." },
    en: { title: "Health Assessments", desc: "Comprehensive analysis including functional lab interpretation, body composition, and cellular health markers to track your transformation." },
  },
  {
    icon: "\u{1F4DA}",
    cs: { title: "Online kurzy", desc: "Vzdelavaci moduly o bunecnem zdravi, obnove strev, metabolicke optimalizaci a dalsi. Ucte se vlastnim tempem." },
    en: { title: "Online Courses", desc: "Self-paced educational modules on cellular health, gut restoration, metabolic optimisation, and more. Learn at your own rhythm." },
  },
  {
    icon: "\u{1F465}",
    cs: { title: "Skupinove programy", desc: "Transformace v komunite. Pripojte se k malym skupinam pro vzajemnou motivaci, sdilene uceni a odpovednost." },
    en: { title: "Group Programmes", desc: "Community-driven transformation. Join small-group cohorts for accountability, shared learning, and collective motivation." },
  },
  {
    icon: "\u2728",
    cs: { title: "Doporuceni doplnku", desc: "Doporuceni doplnku stravy na zaklade vasich krevnich testu a zdravotnich markeru. Zadne hadani, pouze presnost." },
    en: { title: "Supplement Guidance", desc: "Evidence-based supplement recommendations tailored to your blood work and health markers. No guesswork, only precision." },
  },
];

export default function Services() {
  const { lang, t } = useLang();

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-tag">{t("Co nabizim", "What I Offer")}</span>
          <h2 className="section-title">{t("Personalizovane koucovaci sluzby", "Personalised Coaching Services")}</h2>
          <p className="section-subtitle">
            {t(
              "Kazdy program je pristizpusoben vasi jedinecne biologii, zivotnmu stylu a cilum. Zadne sablony, zadne genericke rady \u2014 pouze vedecky podlozene strategie navrznene pro vas.",
              "Every programme is tailored to your unique biology, lifestyle, and goals. No templates, no generic advice \u2014 just science-backed strategies designed for you."
            )}
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => {
            const data = lang === "cs" ? s.cs : s.en;
            return (
              <div className="service-card" key={i}>
                <div className="service-icon">{s.icon}</div>
                <h3>{data.title}</h3>
                <p>{data.desc}</p>
                <a href="#" className="service-link">
                  {t("Vice informaci \u2192", "Learn More \u2192")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
