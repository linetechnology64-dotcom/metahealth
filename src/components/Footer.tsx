"use client";

import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>MetaHealth</h3>
            <p>
              {t(
                "Buněčné zdraví, výživa a vitalita. Barbora Pašková \u2014 certifikovaná nutriční poradkyně.",
                "Cellular wealth, nutrition health, and vitality coaching. Barbora Paskova \u2014 certified nutritionist."
              )}
            </p>
          </div>
          <div className="footer-col">
            <h4>{t("Rychlé odkazy", "Quick Links")}</h4>
            <ul>
              <li><a href="#about">{t("O mně", "About")}</a></li>
              <li><a href="#services">{t("Služby", "Services")}</a></li>
              <li><a href="#process">{t("Proces", "Process")}</a></li>
              <li><a href="#testimonials">{t("Reference", "Testimonials")}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("Služby", "Services")}</h4>
            <ul>
              <li><a href="#">{t("Individuální koučink", "1-on-1 Coaching")}</a></li>
              <li><a href="#">{t("Nutriční plány", "Nutrition Plans")}</a></li>
              <li><a href="#">{t("Zdravotní analýzy", "Health Assessments")}</a></li>
              <li><a href="#">{t("Online kurzy", "Online Courses")}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("Kontakt", "Connect")}</h4>
            <ul>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Microsoft Teams</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
            <p style={{ fontSize: "0.8rem", marginTop: "12px", opacity: 0.7 }}>
              {t("Vracov / Hodonín & online", "Vracov / Hodonín & online")}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 MetaHealth. {t("Všechna práva vyhrazena.", "All rights reserved.")}</span>
          <span>
            <a href="#">{t("Zásady ochrany soukromí", "Privacy Policy")}</a> &middot;{" "}
            <a href="#">{t("Obchodní podmínky", "Terms of Service")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
