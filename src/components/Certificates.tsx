"use client";

import { useLang } from "@/context/LanguageContext";

export default function Certificates() {
  const { t } = useLang();

  return (
    <section className="certificates" id="certificates">
      <div className="container">
        <div className="certificates-header">
          <span className="section-tag">{t("Kvalifikace", "Credentials")}</span>
          <h2 className="section-title">{t("Certifikaty a vzdelani", "Certificates & Education")}</h2>
          <p className="section-subtitle">
            {t(
              "Akreditovane kurzy od NutriAcademy (akreditace MSMT). Barbora Paskova, DiS.",
              "Accredited courses from NutriAcademy (MSMT accreditation). Barbora Paskova, DiS."
            )}
          </p>
        </div>
        <div className="cert-grid">
          <div className="cert-card">
            <img src="/images/cert-1.jpg" alt="Certifikat - Vyzivovy poradce" />
            <div className="cert-card-info">
              <h4>Vyzivovy poradce — Online program</h4>
              <p>NutriAcademy, 150 studijnich hodin</p>
            </div>
          </div>
          <div className="cert-card">
            <img src="/images/cert-2.jpg" alt="Certifikat - Keto & Low Carb + Probiotika" />
            <div className="cert-card-info">
              <h4>Keto &amp; Low Carb + Probiotika</h4>
              <p>NutriAcademy</p>
            </div>
          </div>
          <div className="cert-card">
            <img src="/images/cert-3.jpg" alt="Certifikat - Prvni pomoc" />
            <div className="cert-card-info">
              <h4>Certifikat prvni pomoci</h4>
              <p>NutriAcademy, akreditace MSMT</p>
            </div>
          </div>
          <div className="cert-card">
            <img src="/images/cert-4.jpg" alt="Certifikat - Senzoricka analyza potravin" />
            <div className="cert-card-info">
              <h4>Senzoricka analyza potravin</h4>
              <p>NutriAcademy, akreditace MSMT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
