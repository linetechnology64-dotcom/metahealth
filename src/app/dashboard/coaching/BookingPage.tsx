"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
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
}

const servicesList = [
  { id: "initial", duration: 75, cs: "Vstupní konzultace (60–75 min)", en: "Initial Consultation (60–75 min)", priceInPerson: 800, priceOnline: 750, gbpInPerson: 25, gbpOnline: 25 },
  { id: "comprehensive", duration: 90, cs: "Komplexní vstupní konzultace (90 min)", en: "Comprehensive Consultation (90 min)", priceInPerson: 1300, priceOnline: 1300, gbpInPerson: 43, gbpOnline: 43 },
  { id: "followup-30", duration: 30, cs: "Následná konzultace (30 min)", en: "Follow-up Consultation (30 min)", priceInPerson: 450, priceOnline: 400, gbpInPerson: 15, gbpOnline: 13 },
  { id: "followup-60", duration: 60, cs: "Následná konzultace (60 min)", en: "Follow-up Consultation (60 min)", priceInPerson: 750, priceOnline: 700, gbpInPerson: 25, gbpOnline: 23 },
  { id: "analysis", duration: 60, cs: "Rozbor jídelníčku", en: "Diet Analysis", priceInPerson: 900, priceOnline: 900, gbpInPerson: 30, gbpOnline: 30 },
];

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const dayNamesCS = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
const dayNamesEN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length % 7 !== 0) days.push(null);

  return days;
}

export default function BookingPage({ userId, initialBookings }: { userId: string; initialBookings: Booking[] }) {
  const { t, lang } = useLang();
  const [step, setStep] = useState<"type" | "service" | "schedule" | "done">("type");
  const [bookingType, setBookingType] = useState<"online" | "in-person" | null>(null);
  const [selectedService, setSelectedService] = useState<typeof servicesList[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const calendarDays = getCalendarDays(calYear, calMonth);
  const monthName = new Date(calYear, calMonth).toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-GB", { month: "long", year: "numeric" });

  const bookedSlots = new Set(
    bookings.filter(b => b.status !== "cancelled").map(b => `${b.date}-${b.time.slice(0, 5)}`)
  );

  function isSlotFree(date: string, time: string) {
    return !bookedSlots.has(`${date}-${time}`);
  }

  function isPastDate(day: number) {
    const d = new Date(calYear, calMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  }

  function isSunday(day: number) {
    return new Date(calYear, calMonth, day).getDay() === 0;
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  }

  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  }

  async function handleBook() {
    if (!selectedDate && !selectedTime) {
      setValidationMsg(t("Vyberte prosím datum a čas.", "Please select a date and time."));
      return;
    }
    if (!selectedDate) {
      setValidationMsg(t("Vyberte prosím datum.", "Please select a date."));
      return;
    }
    if (!selectedTime) {
      setValidationMsg(t("Vyberte prosím čas.", "Please select a time."));
      return;
    }
    setValidationMsg("");
    if (!selectedService || !bookingType) return;
    setSaving(true);
    const isGbp = lang === "en";
    const price = isGbp
      ? (bookingType === "online" ? selectedService.gbpOnline : selectedService.gbpInPerson)
      : (bookingType === "online" ? selectedService.priceOnline : selectedService.priceInPerson);
    const currency = isGbp ? "gbp" : "czk";

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        date: selectedDate,
        time: selectedTime,
        duration: selectedService.duration,
        type: bookingType,
        service: selectedService.id,
        serviceName: lang === "cs" ? selectedService.cs : selectedService.en,
        price,
        currency,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      // Fallback: save booking without payment
      const supabase = createClient();
      const { data: booking } = await supabase
        .from("bookings")
        .insert({ client_id: userId, date: selectedDate, time: selectedTime, duration: selectedService.duration, type: bookingType, service: selectedService.id, price })
        .select()
        .single();

      if (booking) {
        setBookings([...bookings, booking]);
        setStep("done");
      }
    }
    setSaving(false);
  }

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>{t("Objednat konzultaci", "Book a Consultation")}</h1>
            <p>{t("Vyberte typ, službu a termín", "Choose type, service and time")}</p>
          </div>

          {/* My Bookings */}
          {bookings.filter(b => b.status !== "cancelled").length > 0 && (
            <div className="booking-existing">
              <h3>{t("Moje rezervace", "My Bookings")}</h3>
              <div className="booking-list">
                {bookings.filter(b => b.status !== "cancelled").map((b) => (
                  <div className="booking-item" key={b.id}>
                    <div>
                      <strong>{new Date(b.date).toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-GB")}</strong>
                      <span> {b.time.slice(0, 5)}</span>
                    </div>
                    <div>{b.type === "online" ? "Online" : t("Osobně", "In-person")} — {b.duration} min</div>
                    <div className={`booking-status booking-status-${b.status}`}>{b.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Type */}
          {step === "type" && (
            <div className="booking-step">
              <h2>{t("Jak chcete konzultaci?", "How would you like your consultation?")}</h2>
              <div className="booking-type-grid">
                <button className="booking-type-card" onClick={() => { setBookingType("in-person"); setStep("service"); }}>
                  <div className="booking-type-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h3>{t("Osobně", "In Person")}</h3>
                  <p>{t("Vracov / Hodonín", "Vracov / Hodonín area")}</p>
                </button>
                <button className="booking-type-card" onClick={() => { setBookingType("online"); setStep("service"); }}>
                  <div className="booking-type-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--copper)" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <h3>Online</h3>
                  <p>WhatsApp / Microsoft Teams</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Service */}
          {step === "service" && (
            <div className="booking-step">
              <button className="article-back" onClick={() => setStep("type")}>{t("\u2190 Zpět", "\u2190 Back")}</button>
              <h2>{t("Vyberte službu", "Choose a Service")}</h2>
              <div className="booking-services">
                {servicesList.map((s) => {
                  const displayPrice = lang === "en"
                    ? (bookingType === "online" ? s.gbpOnline : s.gbpInPerson)
                    : (bookingType === "online" ? s.priceOnline : s.priceInPerson);
                  const sym = lang === "en" ? "£" : "";
                  const suffix = lang === "cs" ? " Kč" : "";
                  return (
                    <button className="booking-service-card" key={s.id} onClick={() => { setSelectedService(s); setStep("schedule"); }}>
                      <div>
                        <h4>{lang === "cs" ? s.cs : s.en}</h4>
                        <span className="booking-service-duration">{s.duration} min</span>
                      </div>
                      <span className="booking-service-price">{sym}{displayPrice}{suffix}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Calendar + Summary */}
          {step === "schedule" && selectedService && (
            <div className="booking-step">
              <button className="article-back" onClick={() => setStep("service")}>{t("\u2190 Zpět", "\u2190 Back")}</button>
              <div className="booking-schedule-layout">
                <div className="booking-calendar">
                  <h2>{t("Vyberte termín", "Choose a Date & Time")}</h2>

                  {/* Month Navigation */}
                  <div className="cal-header">
                    <button className="cal-nav" onClick={prevMonth}>&larr;</button>
                    <span className="cal-month">{monthName}</span>
                    <button className="cal-nav" onClick={nextMonth}>&rarr;</button>
                  </div>

                  {/* Day Names */}
                  <div className="cal-grid cal-day-names">
                    {(lang === "cs" ? dayNamesCS : dayNamesEN).map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="cal-grid">
                    {calendarDays.map((day, i) => {
                      if (day === null) return <span key={i} />;
                      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const past = isPastDate(day);
                      const sunday = isSunday(day);
                      const disabled = past || sunday;
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={i}
                          className={`cal-day ${isSelected ? "active" : ""} ${disabled ? "disabled" : ""}`}
                          disabled={disabled}
                          onClick={() => { setSelectedDate(dateStr); setSelectedTime(""); }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div className="booking-times">
                      <h3>{t("Dostupné časy", "Available Times")}</h3>
                      <div className="booking-time-grid">
                        {timeSlots.map((time) => {
                          const free = isSlotFree(selectedDate, time);
                          return (
                            <button key={time} className={`booking-time ${selectedTime === time ? "active" : ""} ${!free ? "booked" : ""}`} disabled={!free} onClick={() => setSelectedTime(time)}>
                              {time}
                              {!free && <span className="booking-time-booked">{t("Obsazeno", "Booked")}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary Sidebar */}
                <div className="booking-summary">
                  <h3>{t("Souhrn", "Summary")}</h3>
                  <div className="booking-summary-item">
                    <span>{t("Služba", "Service")}</span>
                    <strong>{lang === "cs" ? selectedService.cs : selectedService.en}</strong>
                  </div>
                  <div className="booking-summary-item">
                    <span>{t("Délka", "Duration")}</span>
                    <strong>{selectedService.duration} min</strong>
                  </div>
                  <div className="booking-summary-item">
                    <span>{t("Typ", "Type")}</span>
                    <strong>{bookingType === "online" ? "Online" : t("Osobně", "In-person")}</strong>
                  </div>
                  <div className="booking-summary-item">
                    <span>{t("Cena", "Price")}</span>
                    <strong className="booking-summary-price">
                      {lang === "en" ? "£" : ""}{lang === "en"
                        ? (bookingType === "online" ? selectedService.gbpOnline : selectedService.gbpInPerson)
                        : (bookingType === "online" ? selectedService.priceOnline : selectedService.priceInPerson)
                      }{lang === "cs" ? " Kč" : ""}
                    </strong>
                  </div>
                  {selectedDate && (
                    <div className="booking-summary-item">
                      <span>{t("Datum", "Date")}</span>
                      <strong>{new Date(selectedDate).toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-GB")}</strong>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="booking-summary-item">
                      <span>{t("Čas", "Time")}</span>
                      <strong>{selectedTime}</strong>
                    </div>
                  )}
                  {validationMsg && (
                    <p className="booking-validation">{validationMsg}</p>
                  )}
                  <button className="btn-primary" style={{ width: "100%", marginTop: "16px", justifyContent: "center" }} disabled={saving} onClick={handleBook}>
                    {saving ? t("Zpracování...", "Processing...") : t("Zaplatit a rezervovat", "Pay & Book")}
                  </button>
                  <p style={{ fontSize: "0.7rem", color: "var(--brown)", textAlign: "center", marginTop: "10px", opacity: 0.6 }}>
                    {t("Platba přes Stripe", "Payment via Stripe")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Done */}
          {step === "done" && (
            <div className="booking-step" style={{ textAlign: "center" }}>
              <h2>{t("Rezervace odeslána!", "Booking Submitted!")}</h2>
              <p>{t("Vaše rezervace čeká na potvrzení. Budeme vás kontaktovat.", "Your booking is pending confirmation. We'll be in touch.")}</p>
              <button className="btn-primary" onClick={() => { setStep("type"); setSelectedService(null); setSelectedDate(""); setSelectedTime(""); }} style={{ marginTop: "24px" }}>
                {t("Nová rezervace", "New Booking")}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
