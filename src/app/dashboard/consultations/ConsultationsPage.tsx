"use client";

import { useLang } from "@/context/LanguageContext";

interface Booking {
  id: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  service: string;
  price: number;
  status: string;
  created_at: string;
}

const serviceNames: Record<string, { cs: string; en: string }> = {
  initial: { cs: "Vstupní konzultace", en: "Initial Consultation" },
  comprehensive: { cs: "Komplexní vstupní konzultace", en: "Comprehensive Consultation" },
  "followup-30": { cs: "Následná konzultace", en: "Follow-up Consultation" },
  "followup-60": { cs: "Následná konzultace", en: "Follow-up Consultation" },
  analysis: { cs: "Rozbor jídelníčku", en: "Diet Analysis" },
};

export default function ConsultationsPage({ bookings }: { bookings: Booking[] }) {
  const { t, lang } = useLang();

  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings.filter((b) => b.date >= today && b.status !== "cancelled");
  const past = bookings.filter((b) => b.date < today || b.status === "cancelled");

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function getServiceName(service: string) {
    const s = serviceNames[service];
    return s ? (lang === "cs" ? s.cs : s.en) : service;
  }

  function renderCard(b: Booking, isPast: boolean) {
    return (
      <div className={`consultation-card ${isPast ? "past" : ""}`} key={b.id}>
        <div className="consultation-card-left">
          <div className="consultation-date-badge">
            <span className="consultation-date-day">{new Date(b.date).getDate()}</span>
            <span className="consultation-date-month">
              {new Date(b.date).toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-GB", { month: "short" })}
            </span>
          </div>
        </div>
        <div className="consultation-card-main">
          <h4>{getServiceName(b.service)}</h4>
          <p className="consultation-meta">
            {formatDate(b.date)} {t("v", "at")} {b.time.slice(0, 5)}
          </p>
          <div className="consultation-details">
            <span>{b.duration} min</span>
            <span>{b.type === "online" ? "Online" : t("Osobně", "In-person")}</span>
            <span>{t("s", "with")} Barbora Pašková</span>
          </div>
        </div>
        <div className="consultation-card-right">
          <span className="consultation-price">{b.price} Kč</span>
          <span className={`booking-status booking-status-${b.status}`}>{b.status}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>{t("Moje konzultace", "My Consultations")}</h1>
            <p>{t("Přehled všech vašich konzultací", "Overview of all your consultations")}</p>
          </div>

          {bookings.length === 0 ? (
            <div className="dashboard-card" style={{ maxWidth: 500 }}>
              <p className="dashboard-empty">{t("Zatím nemáte žádné konzultace.", "You don't have any consultations yet.")}</p>
              <a href="/dashboard/coaching" className="dashboard-card-link" style={{ marginTop: 16, display: "inline-block" }}>
                {t("Objednat konzultaci \u2192", "Book a consultation \u2192")}
              </a>
            </div>
          ) : (
            <>
              {/* Upcoming */}
              <div className="consultations-section">
                <h2>{t("Nadcházející", "Upcoming")}</h2>
                {upcoming.length === 0 ? (
                  <p className="dashboard-empty" style={{ marginBottom: 16 }}>
                    {t("Žádné nadcházející konzultace.", "No upcoming consultations.")}
                    {" "}<a href="/dashboard/coaching" className="dashboard-card-link">{t("Objednat \u2192", "Book one \u2192")}</a>
                  </p>
                ) : (
                  <div className="consultations-list">
                    {upcoming.map((b) => renderCard(b, false))}
                  </div>
                )}
              </div>

              {/* Past */}
              {past.length > 0 && (
                <div className="consultations-section">
                  <h2>{t("Minulé", "Past")}</h2>
                  <div className="consultations-list">
                    {past.map((b) => renderCard(b, true))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
