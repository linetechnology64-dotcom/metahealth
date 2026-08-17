"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";

const portalPaths = ["/dashboard", "/account"];

export default function Nav() {
  const { lang, toggle, t } = useLang();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isPortal = portalPaths.some((p) => pathname.startsWith(p));

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setLoggedIn(!!session?.user));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const close = () => setMenuOpen(false);

  const portalLinks = (
    <>
      <li><a href="/dashboard" onClick={close}>{t("Nástěnka", "Dashboard")}</a></li>
      <li><a href="/dashboard/courses" onClick={close}>{t("Studijní materiály", "Studies")}</a></li>
      <li><a href="/dashboard/assessments" onClick={close}>{t("Můj pokrok", "My Progress")}</a></li>
      <li className="nav-dropdown">
        <a href="/dashboard/coaching">{t("Kouč", "Coach")}</a>
        <div className="dropdown-menu">
          <a href="/dashboard/coaching" onClick={close}>{t("Objednat konzultaci", "Book a Consultation")}</a>
          <a href="/dashboard/consultations" onClick={close}>{t("Moje konzultace", "My Consultations")}</a>
        </div>
      </li>
      <li className="nav-dropdown">
        <a href="#">{t("Vitalita", "Vitality")}</a>
        <div className="dropdown-menu">
          <a href="/dashboard/nutrition" onClick={close}>{t("Nutriční plány", "Nutrition Plans")}</a>
          <a href="/dashboard/supplements" onClick={close}>{t("Doporučení doplňků", "Supplement Guidance")}</a>
          <a href="/dashboard/groups" onClick={close}>{t("Skupinové programy", "Group Programmes")}</a>
        </div>
      </li>
      <li className="nav-dropdown">
        <a href="#">{t("Obchod", "Shop")}</a>
        <div className="dropdown-menu">
          <span className="dropdown-soon">{t("Již brzy!", "Coming Soon!")}</span>
        </div>
      </li>
      <li><a href="/dashboard/notebook" onClick={close}>{t("Zápisník", "Notebook")}</a></li>
    </>
  );

  const landingLinks = (
    <>
      <li><a href="/#about" onClick={close}>{t("O mně", "About")}</a></li>
      <li><a href="/#certificates" onClick={close}>{t("Certifikáty", "Certificates")}</a></li>
      <li className="nav-dropdown">
        <a href="/#services">{t("Služby", "Services")}</a>
        <div className="dropdown-menu">
          <a href="/#services" onClick={close}>{t("Individuální koučink", "1-on-1 Coaching")}</a>
          <a href="/#services" onClick={close}>{t("Nutriční plány", "Nutrition Plans")}</a>
          <a href="/#services" onClick={close}>{t("Zdravotní analýzy", "Health Assessments")}</a>
          <a href="/#services" onClick={close}>{t("Online kurzy", "Online Courses")}</a>
          <a href="/#services" onClick={close}>{t("Skupinové programy", "Group Programmes")}</a>
          <a href="/#services" onClick={close}>{t("Doporučení doplňků", "Supplement Guidance")}</a>
        </div>
      </li>
      <li><a href="/#process" onClick={close}>{t("Proces", "Process")}</a></li>
      <li><a href="/#testimonials" onClick={close}>{t("Reference", "Testimonials")}</a></li>
    </>
  );

  return (
    <>
      <nav>
        <div className="container">
          <a href="/" className="nav-logo">
            <img src="/images/logo.png" alt="MetaHealth Logo" />
            <span>MetaHealth</span>
          </a>

          <ul className="nav-links">
            {isPortal ? portalLinks : landingLinks}
          </ul>

          <div className="nav-right">
            <button className="lang-switch" onClick={toggle}>
              {lang === "cs" ? "EN" : "CS"}
            </button>
            {loggedIn ? (
              <a href="/account" className="nav-cta">{t("Můj účet", "My Account")}</a>
            ) : (
              <>
                <a href="/login" className="nav-signin">{t("Přihlásit se", "Sign In")}</a>
                <a href="/signup" className="nav-cta">{t("Začít", "Get Started")}</a>
              </>
            )}
            <button className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={close} />
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <ul>{isPortal ? portalLinks : landingLinks}</ul>
        <div className="mobile-drawer-actions">
          {loggedIn ? (
            <a href="/account" className="mobile-drawer-cta" onClick={close}>{t("Můj účet", "My Account")}</a>
          ) : (
            <>
              <a href="/login" className="mobile-drawer-link" onClick={close}>{t("Přihlásit se", "Sign In")}</a>
              <a href="/signup" className="mobile-drawer-cta" onClick={close}>{t("Začít", "Get Started")}</a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
