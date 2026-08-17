"use client";

import { useLang } from "@/context/LanguageContext";

const steps = [
  {
    num: "01",
    cs: { title: "Uvodni hovor", desc: "Bezplatny uvodni hovor pro pochopeni vasich cilu, historie a ocekavani." },
    en: { title: "Discovery Call", desc: "A free introductory call to understand your goals, history, and what you're looking for." },
  },
  {
    num: "02",
    cs: { title: "Hloubkova analyza", desc: "Komplexni zdravotni dotaznik a analyza laboratornich vysledku pro zmapovani vaseho bunecneho zdravi." },
    en: { title: "Deep Assessment", desc: "Comprehensive health questionnaire and functional lab analysis to map your cellular health." },
  },
  {
    num: "03",
    cs: { title: "Vlastni protokol", desc: "Vas personalizovany plan vyzivy, doplnku a zivotniho stylu \u2014 postaveny kolem vasi biologie." },
    en: { title: "Custom Protocol", desc: "Your personalised nutrition, supplement, and lifestyle plan \u2014 built around your biology." },
  },
  {
    num: "04",
    cs: { title: "Prubezna podpora", desc: "Pravidelne kontroly, upravy planu a odpovednost pro udrzeni vasi transformace." },
    en: { title: "Ongoing Support", desc: "Regular check-ins, plan adjustments, and accountability to keep your transformation on track." },
  },
];

export default function HowItWorks() {
  const { lang, t } = useLang();

  return (
    <section className="how-it-works" id="process">
      <div className="container">
        <div className="how-it-works-header">
          <span className="section-tag">{t("Vase cesta", "Your Journey")}</span>
          <h2 className="section-title">{t("Jak to funguje", "How It Works")}</h2>
          <p className="section-subtitle">
            {t(
              "Od prvni konzultace k trvale transformaci \u2014 jasna cesta k bunecne vitalite.",
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
