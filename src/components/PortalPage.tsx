"use client";

import { useLang } from "@/context/LanguageContext";

interface PortalPageProps {
  titleCs: string;
  titleEn: string;
  descCs: string;
  descEn: string;
}

export default function PortalPage({ titleCs, titleEn, descCs, descEn }: PortalPageProps) {
  const { t } = useLang();

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>{t(titleCs, titleEn)}</h1>
            <p>{t(descCs, descEn)}</p>
          </div>
          <div className="dashboard-card" style={{ maxWidth: 600 }}>
            <h3>{t("Již brzy", "Coming Soon")}</h3>
            <p>{t("Tato sekce se připravuje. Brzy zde najdete veškerý obsah.", "This section is being prepared. All content will be available here soon.")}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
