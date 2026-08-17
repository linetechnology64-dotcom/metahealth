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
            alt="Barbora Paskova"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
          />
        </div>
        <div className="about-content">
          <span className="section-tag">{t("O mne", "About Me")}</span>
          <h2 className="section-title">Barbora Paskova</h2>
          <p className="section-subtitle">
            {t(
              "Jsem certifikovana nutricni poradkyne z Ceske republiky. Po letech hledani spravne cesty ke zdravi jsem objevila silu bunecne vyzivy a sama zhubla 30 kilogramu. Dnes pomahom ostatnim najit jejich vlastni cestu ke zdravi a vitalite \u2014 bez diet, bez hladoveni, pouze s vedecky podlozenymi metodami.",
              "I am a certified nutritionist from the Czech Republic. After years of searching for the right path to health, I discovered the power of cellular nutrition and lost 30 kilograms myself. Today I help others find their own path to health and vitality \u2014 no diets, no starving, just science-backed methods."
            )}
          </p>
          <div className="about-pillars">
            <div className="pillar">
              <h4>{t("Bunecna vyziva", "Cellular Nutrition")}</h4>
              <p>{t("Cilene protokoly pro podporu mitochondrialniho zdravi a bunecne regenerace.", "Targeted protocols to fuel mitochondrial health and cellular regeneration.")}</p>
            </div>
            <div className="pillar">
              <h4>{t("Zdravi strev", "Gut Health")}</h4>
              <p>{t("Obnova mikrobiomu pro lepsi vstrebavani zivin a posileni imunity.", "Restore your microbiome to optimise nutrient absorption and immunity.")}</p>
            </div>
            <div className="pillar">
              <h4>{t("Metabolicka rovnovaha", "Metabolic Balance")}</h4>
              <p>{t("Kalibrace hormonalnich a metabolickych drah pro dlouhodobou energii.", "Recalibrate hormonal and metabolic pathways for sustained energy.")}</p>
            </div>
            <div className="pillar">
              <h4>{t("Vitalita tela i mysli", "Mind-Body Vitality")}</h4>
              <p>{t("Holisticke strategie propojujici vyzivu, pohyb a dusevni jasnost.", "Holistic strategies bridging nutrition, movement, and mental clarity.")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
