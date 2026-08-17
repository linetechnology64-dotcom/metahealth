"use client";

import { useLang } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-tag">
            {t("Bunecne zdravi & vitalita", "Cellular Wealth & Vitality")}
          </span>
          <h1
            dangerouslySetInnerHTML={{
              __html: t(
                'Odemknete potencial<br /><em>sveho tela</em>',
                'Unlock Your Body\'s<br /><em>Deepest Potential</em>'
              ),
            }}
          />
          <p>
            {t(
              "Certifikovana nutricni poradkyne Barbora Paskova vam pomuze zmenit zivot skrze personalizovane stravovani a bunecne zdravi. Sama zhubla 30 kg diky svemu vlastnimu planu.",
              "Certified nutritionist Barbora Paskova will help you transform your life through personalised nutrition and cellular health. She herself lost 30 kg using her own dietary plan."
            )}
          </p>
          <div className="hero-buttons">
            <a href="#auth" className="btn-primary">
              {t("Objednat konzultaci \u2192", "Book a Consultation \u2192")}
            </a>
            <a href="#about" className="btn-secondary">
              {t("Zjistit vice", "Learn More")}
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
