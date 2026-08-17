"use client";

import { useLang } from "@/context/LanguageContext";

export default function AuthPreview() {
  const { t } = useLang();

  return (
    <section className="auth-preview" id="auth">
      <div className="container">
        <div className="auth-preview-header">
          <span className="section-tag">{t("Klientský portál", "Client Portal")}</span>
          <h2 className="section-title">{t("Přístup k vašemu účtu", "Access Your Dashboard")}</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {t(
              "Přihlaste se a sledujte svůj pokrok, zobrazujte plány a objednávejte konzultace.",
              "Sign in to track your progress, view your plans, and book sessions."
            )}
          </p>
        </div>
        <div className="auth-cards">
          <div className="auth-card">
            <h3>{t("Vítejte zpět", "Welcome Back")}</h3>
            <p>{t("Přihlaste se ke svému účtu", "Sign in to your account")}</p>
            <a href="/login" className="auth-btn" style={{ display: "block", textAlign: "center" }}>
              {t("Přihlásit se", "Sign In")}
            </a>
          </div>
          <div className="auth-card">
            <h3>{t("Vytvořit účet", "Get Started")}</h3>
            <p>{t("Zaregistrujte se zdarma", "Create your free account")}</p>
            <a href="/signup" className="auth-btn" style={{ display: "block", textAlign: "center" }}>
              {t("Vytvořit účet", "Create Account")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
