"use client";

import { useLang } from "@/context/LanguageContext";

export default function Certificates() {
  const { t } = useLang();

  return (
    <section className="certificates" id="certificates">
      <div className="container">
        <div className="certificates-header">
          <span className="section-tag">{t("Kvalifikace", "Credentials")}</span>
          <h2 className="section-title">{t("Certifikáty a vzdělání", "Certificates & Education")}</h2>
          <p className="section-subtitle">
            {t(
              "Akreditované kurzy od NutriAcademy (akreditace MŠMT). Barbora Pašková, DiS.",
              "Accredited courses from NutriAcademy (MSMT accreditation). Barbora Paskova, DiS."
            )}
          </p>
        </div>
        <div className="cert-grid">
          <div className="cert-card">
            <img src="/images/cert-1.jpg" alt="Certifikát - Výživový poradce" />
            <div className="cert-card-info">
              <h4>Výživový poradce — Online program</h4>
              <p>NutriAcademy, 150 studijních hodin</p>
            </div>
          </div>
          <div className="cert-card">
            <img src="/images/cert-2.jpg" alt="Certifikát - Keto & Low Carb + Probiotika" />
            <div className="cert-card-info">
              <h4>Keto &amp; Low Carb + Probiotika</h4>
              <p>NutriAcademy</p>
            </div>
          </div>
        </div>
        <div className="cert-grid-single">
          <div className="cert-card">
            <img src="/images/cert-4.jpg" alt="Certifikát - Senzorická analýza potravin" />
            <div className="cert-card-info">
              <h4>Senzorická analýza potravin</h4>
              <p>NutriAcademy, akreditace MŠMT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
