"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle, t } = useLang();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav>
        <div className="container">
          <a href="#" className="nav-logo">
            <img
              src="https://cdn.discordapp.com/attachments/1400735557587435606/1538607745463226428/e9183f3f-48c2-411b-8b65-73bddd78ec2d.jpg?ex=6a834ba0&is=6a81fa20&hm=f53695dd4ce3913283399afac15d9c8143dcd50ff3645c7bf24b4b780f3353e5&"
              alt="MetaHealth Logo"
            />
            <span>MetaHealth</span>
          </a>
          <div className="nav-right">
            <button className="lang-switch" onClick={toggle}>
              {lang === "cs" ? "EN" : "CS"}
            </button>
            <button
              className={`hamburger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#about" onClick={closeMenu}>{t("O mne", "About")}</a></li>
          <li><a href="#certificates" onClick={closeMenu}>{t("Certifikaty", "Certificates")}</a></li>
          <li><a href="#services" onClick={closeMenu}>{t("Sluzby", "Services")}</a></li>
          <li><a href="#process" onClick={closeMenu}>{t("Proces", "Process")}</a></li>
          <li><a href="#testimonials" onClick={closeMenu}>{t("Reference", "Testimonials")}</a></li>
        </ul>
        <a href="#auth" className="nav-cta-mobile" onClick={closeMenu}>
          {t("Zacit", "Get Started")}
        </a>
      </div>
    </>
  );
}
