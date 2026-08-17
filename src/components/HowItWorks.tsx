"use client";

import { useLang } from "@/context/LanguageContext";

const steps = [
  {
    num: "01",
    cs: { title: "Úvodní hovor", desc: "Bezplatný úvodní hovor pro pochopení vašich cílů, historie a očekávání." },
    en: { title: "Discovery Call", desc: "A free introductory call to understand your goals, history, and what you're looking for." },
  },
  {
    num: "02",
    cs: { title: "Hloubková analýza", desc: "Komplexní zdravotní dotazník a analýza laboratorních výsledků pro zmapování vašeho buněčného zdraví." },
    en: { title: "Deep Assessment", desc: "Comprehensive health questionnaire and functional lab analysis to map your cellular health." },
  },
  {
    num: "03",
    cs: { title: "Vlastní protokol", desc: "Váš personalizovaný plán výživy, doplňků a životního stylu \u2014 postavený kolem vaší biologie." },
    en: { title: "Custom Protocol", desc: "Your personalised nutrition, supplement, and lifestyle plan \u2014 built around your biology." },
  },
  {
    num: "04",
    cs: { title: "Průběžná podpora", desc: "Pravidelné kontroly, úpravy plánu a odpovědnost pro udržení vaší transformace." },
    en: { title: "Ongoing Support", desc: "Regular check-ins, plan adjustments, and accountability to keep your transformation on track." },
  },
];

export default function HowItWorks() {
  const { lang, t } = useLang();

  return (
    <section className="how-it-works" id="process">
      <div className="container">
        <div className="how-it-works-header">
          <span className="section-tag">{t("Vaše cesta", "Your Journey")}</span>
          <h2 className="section-title">{t("Jak to funguje", "How It Works")}</h2>
          <p className="section-subtitle">
            {t(
              "Od první konzultace k trvalé transformaci \u2014 jasná cesta k buněčné vitalitě.",
              "From first consultation to lasting transformation \u2014 a clear path to cellular vitality."
            )}
          </p>
        </div>
        <div className="steps">
          {steps.map((s) => {
            const data = lang === "cs" ? s.cs : s.en;
            return (
              <div className="step" key={s.num}>
                <div className="step-number">{s.num}</div>
                <h3>{data.title}</h3>
                <p>{data.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
