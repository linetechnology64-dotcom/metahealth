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
                "Bunecne zdravi, vyziva a vitalita. Barbora Paskova \u2014 certifikovana nutricni poradkyne.",
                "Cellular wealth, nutrition health, and vitality coaching. Barbora Paskova \u2014 certified nutritionist."
              )}
            </p>
          </div>
          <div className="footer-col">
            <h4>{t("Rychle odkazy", "Quick Links")}</h4>
            <ul>
              <li><a href="#about">{t("O mne", "About")}</a></li>
              <li><a href="#services">{t("Sluzby", "Services")}</a></li>
              <li><a href="#process">{t("Proces", "Process")}</a></li>
              <li><a href="#testimonials">{t("Reference", "Testimonials")}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("Sluzby", "Services")}</h4>
            <ul>
              <li><a href="#">{t("Individualni koucink", "1-on-1 Coaching")}</a></li>
              <li><a href="#">{t("Nutricni plany", "Nutrition Plans")}</a></li>
              <li><a href="#">{t("Zdravotni analyzy", "Health Assessments")}</a></li>
              <li><a href="#">{t("Online kurzy", "Online Courses")}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("Kontakt", "Connect")}</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Email</a></li>
              <li><a href="#">{t("Objednat hovor", "Book a Call")}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 MetaHealth. Vsechna prava vyhrazena.</span>
          <span>
            <a href="#">{t("Zasady ochrany soukromi", "Privacy Policy")}</a> &middot;{" "}
            <a href="#">{t("Obchodni podminky", "Terms of Service")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
