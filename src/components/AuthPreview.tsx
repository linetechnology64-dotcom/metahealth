"use client";

import { useLang } from "@/context/LanguageContext";

export default function AuthPreview() {
  const { t } = useLang();

  return (
    <section className="auth-preview" id="auth">
      <div className="container">
        <div className="auth-preview-header">
          <span className="section-tag">{t("Klientsky portal", "Client Portal")}</span>
          <h2 className="section-title">{t("Pristup k vasemu uctu", "Access Your Dashboard")}</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            {t(
              "Prihlaste se a sledujte svuj pokrok, zobrazujte plany a objednavejte konzultace.",
              "Sign in to track your progress, view your plans, and book sessions."
            )}
          </p>
        </div>
        <div className="auth-cards">
          {/* Login */}
          <div className="auth-card">
            <h3>{t("Vitejte zpet", "Welcome Back")}</h3>
            <p>{t("Prihlaste se ke svemu uctu", "Sign in to your account")}</p>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="vas@email.cz" />
            </div>
            <div className="form-group">
              <label>{t("Heslo", "Password")}</label>
              <input type="password" placeholder={t("Zadejte heslo", "Enter password")} />
            </div>
            <button className="auth-btn">{t("Prihlasit se", "Sign In")}</button>
            <div className="auth-divider">{t("nebo", "or")}</div>
            <button className="auth-social">{t("Pokracovat pres Google", "Continue with Google")}</button>
          </div>
          {/* Sign Up */}
          <div className="auth-card">
            <h3>{t("Vytvorit ucet", "Get Started")}</h3>
            <p>{t("Zaregistrujte se zdarma", "Create your free account")}</p>
            <div className="form-group">
              <label>{t("Cele jmeno", "Full Name")}</label>
              <input type="text" placeholder={t("Vase cele jmeno", "Your full name")} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="vas@email.cz" />
            </div>
            <div className="form-group">
              <label>{t("Heslo", "Password")}</label>
              <input type="password" placeholder={t("Vytvorte heslo", "Create a password")} />
            </div>
            <button className="auth-btn">{t("Vytvorit ucet", "Create Account")}</button>
            <div className="auth-divider">{t("nebo", "or")}</div>
            <button className="auth-social">{t("Registrace pres Google", "Sign Up with Google")}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
