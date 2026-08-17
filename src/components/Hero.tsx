"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";

const heroImages = ["/images/barbora-body.jpeg", "/images/barbora-portrait.jpeg"];

export default function Hero() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const { t } = useLang();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo">
            <img src="/images/logo-symbol.png" alt="MetaHealth" className="hero-logo-img" />
            <div className="hero-logo-text">
              <span className="hero-logo-title">META <strong>HEALTH</strong></span>
              <span className="hero-logo-name">Barbora Pašková</span>
              <span className="hero-logo-sub">Buněčné zdraví &nbsp;|&nbsp; Funkční výživa &nbsp;|&nbsp; Vitalita</span>
            </div>
          </div>
          <span className="hero-tag">
            {t("Buněčné zdraví & vitalita", "Cellular Wealth & Vitality")}
          </span>
          <h1
            dangerouslySetInnerHTML={{
              __html: t(
                'Odemkněte potenciál<br /><em>svého těla</em>',
                'Unlock Your Body\'s<br /><em>Deepest Potential</em>'
              ),
            }}
          />
          <p>
            {t(
              "Certifikovaná nutriční poradkyně Barbora Pašková vám pomůže změnit život skrze personalizované stravování a buněčné zdraví. Sama zhubla 30 kg díky svému vlastnímu plánu.",
              "Certified nutritionist Barbora Paskova will help you transform your life through personalised nutrition and cellular health. She herself lost 30 kg using her own dietary plan."
            )}
          </p>
          <div className="hero-buttons">
            <a href={loggedIn ? "/dashboard/coaching" : "/signup"} className="btn-primary">
              {t("Objednat konzultaci \u2192", "Book a Consultation \u2192")}
            </a>
            <a href="#about" className="btn-secondary">
              {t("Zjistit více", "Learn More")}
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-wrapper">
            {heroImages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Barbora Pašková"
                className={`hero-slide ${i === currentImg ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
