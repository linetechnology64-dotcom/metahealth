"use client";

import { useLang } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t } = useLang();

  const card = (
    <div className="testimonial-card">
      <div className="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <blockquote>
        {t(
          "\u00ABSem bude doplnen text od skutecneho klienta.\u00BB",
          "\u00ABReal client testimonial will be added here.\u00BB"
        )}
      </blockquote>
      <div className="testimonial-author">
        <div className="testimonial-avatar">&mdash;</div>
        <div className="testimonial-author-info">
          <strong>{t("Jmeno klienta", "Client Name")}</strong>
          <span></span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-tag">{t("Reference klientu", "Client Stories")}</span>
          <h2 className="section-title">{t("Skutecne promeny", "Real Transformations")}</h2>
          <p className="section-subtitle">
            {t(
              "Zde budou reference vasich skutecnych klientu.",
              "Real testimonials from your clients will go here."
            )}
          </p>
        </div>
        <div className="testimonials-grid">
          {[0, 1, 2].map((i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <blockquote>
                {t(
                  "\u00ABSem bude doplnen text od skutecneho klienta.\u00BB",
                  "\u00ABReal client testimonial will be added here.\u00BB"
                )}
              </blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">&mdash;</div>
                <div className="testimonial-author-info">
                  <strong>{t("Jmeno klienta", "Client Name")}</strong>
                  <span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
