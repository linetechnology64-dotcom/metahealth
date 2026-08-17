"use client";

import { useLang } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLang();

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-image">
          <img
            src="/images/barbora-portrait.jpeg"
            alt="Barbora Pašková"
            style={{ width: "100%", height: "auto", borderRadius: "20px" }}
          />
        </div>
        <div className="about-content">
          <span className="section-tag">{t("O mně", "About Me")}</span>
          <h2 className="section-title">Barbora Pašková</h2>
          <p className="section-subtitle">
            {t(
              "Jsem certifikovaná nutriční poradkyně z České republiky. Po letech hledání správné cesty ke zdraví jsem objevila sílu buněčné výživy a sama zhubla 30 kilogramů. Dnes pomáhám ostatním najít jejich vlastní cestu ke zdraví a vitalitě \u2014 bez diet, bez hladovění, pouze s vědecky podloženými metodami.",
              "I am a certified nutritionist from the Czech Republic. After years of searching for the right path to health, I discovered the power of cellular nutrition and lost 30 kilograms myself. Today I help others find their own path to health and vitality \u2014 no diets, no starving, just science-backed methods."
            )}
          </p>
          <div className="about-pillars">
            <div className="pillar">
              <h4>{t("Buněčná výživa", "Cellular Nutrition")}</h4>
              <p>{t("Cílené protokoly pro podporu mitochondriálního zdraví a buněčné regenerace.", "Targeted protocols to fuel mitochondrial health and cellular regeneration.")}</p>
            </div>
            <div className="pillar">
              <h4>{t("Zdraví střev", "Gut Health")}</h4>
              <p>{t("Obnova mikrobiomu pro lepší vstřebávání živin a posílení imunity.", "Restore your microbiome to optimise nutrient absorption and immunity.")}</p>
            </div>
            <div className="pillar">
              <h4>{t("Metabolická rovnováha", "Metabolic Balance")}</h4>
              <p>{t("Kalibrace hormonálních a metabolických drah pro dlouhodobou energii.", "Recalibrate hormonal and metabolic pathways for sustained energy.")}</p>
            </div>
            <div className="pillar">
              <h4>{t("Vitalita těla i mysli", "Mind-Body Vitality")}</h4>
              <p>{t("Holistické strategie propojující výživu, pohyb a duševní jasnost.", "Holistic strategies bridging nutrition, movement, and mental clarity.")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
