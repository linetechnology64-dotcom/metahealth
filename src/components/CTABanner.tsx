"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";

export default function CTABanner() {
  const { t } = useLang();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user));
  }, []);

  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-content">
          <span className="section-tag">{t("Začněte dnes", "Start Today")}</span>
          <h2>{t("Jste připraveni změnit své zdraví?", "Ready to Transform Your Health?")}</h2>
          <p>
            {t(
              "Objednejte si bezplatný úvodní hovor a učiňte první krok k buněčné vitalitě.",
              "Book your free discovery call and take the first step toward cellular vitality."
            )}
          </p>
          <a href={loggedIn ? "/dashboard/coaching" : "/signup"} className="btn-primary">
            {t("Bezplatná konzultace \u2192", "Book Free Discovery Call \u2192")}
          </a>
        </div>
      </div>
    </section>
  );
}
