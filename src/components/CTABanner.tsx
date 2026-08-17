"use client";

import { useLang } from "@/context/LanguageContext";

export default function CTABanner() {
  const { t } = useLang();

  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-content">
          <span className="section-tag">{t("Zacnete dnes", "Start Today")}</span>
          <h2>{t("Jste pripraveni zmenit sve zdravi?", "Ready to Transform Your Health?")}</h2>
          <p>
            {t(
              "Objednejte si bezplatny uvodni hovor a ucinnte prvni krok k bunecne vitalite.",
              "Book your free discovery call and take the first step toward cellular vitality."
            )}
          </p>
          <a href="#auth" className="btn-primary">
            {t("Bezplatna konzultace \u2192", "Book Free Discovery Call \u2192")}
          </a>
        </div>
      </div>
    </section>
  );
}
