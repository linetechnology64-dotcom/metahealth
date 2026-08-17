"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";

export default function Hero() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user));
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
            <img
              src="/images/barbora-body.jpeg"
              alt="Barbora Paskova"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
