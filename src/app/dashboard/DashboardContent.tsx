"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import type { User } from "@supabase/supabase-js";

interface Profile {
  full_name: string;
  email: string;
  role: string;
}

export default function DashboardContent({ user, profile }: { user: User; profile: Profile | null }) {
  const router = useRouter();
  const { t } = useLang();
  const name = profile?.full_name || user.user_metadata?.full_name || user.email;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>
              {t("Vítejte", "Welcome")}, <span className="dashboard-name">{name}</span>
            </h1>
            <p>{t("Váš klientský portál MetaHealth", "Your MetaHealth client portal")}</p>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2 className="dashboard-section-title">{t("Rychlé akce", "Quick Actions")}</h2>
            <div className="dashboard-actions">
              <a href="/dashboard/coaching" className="dashboard-action">
                <span className="dashboard-action-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                {t("Objednat konzultaci", "Book a Consultation")}
              </a>
              <a href="/dashboard/nutrition" className="dashboard-action">
                <span className="dashboard-action-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5.5-5 9-3-3.5-5-6-5-9a5 5 0 0 1 5-5z"/><path d="M12 16v6"/><path d="M8 22h8"/></svg>
                </span>
                {t("Zobrazit nutriční plán", "View Nutrition Plan")}
              </a>
              <a href="/dashboard/assessments" className="dashboard-action">
                <span className="dashboard-action-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </span>
                {t("Sledovat pokrok", "Track Progress")}
              </a>
              <a href="/dashboard/notebook" className="dashboard-action">
                <span className="dashboard-action-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h6"/></svg>
                </span>
                {t("Otevřít zápisník", "Open Notebook")}
              </a>
            </div>
          </div>

          {/* Main Grid */}
          <div className="dashboard-grid">
            {/* Upcoming */}
            <div className="dashboard-card">
              <h3>{t("Nadcházející konzultace", "Upcoming Consultations")}</h3>
              <p className="dashboard-empty">{t("Žádné naplánované konzultace.", "No scheduled consultations.")}</p>
              <a href="/dashboard/coaching" className="dashboard-card-link">
                {t("Objednat konzultaci \u2192", "Book a consultation \u2192")}
              </a>
            </div>

            {/* Nutrition */}
            <div className="dashboard-card">
              <h3>{t("Můj nutriční plán", "My Nutrition Plan")}</h3>
              <p className="dashboard-empty">{t("Zatím nemáte přiřazený plán.", "No plan assigned yet.")}</p>
              <a href="/dashboard/nutrition" className="dashboard-card-link">
                {t("Zobrazit plány \u2192", "View plans \u2192")}
              </a>
            </div>

            {/* Progress */}
            <div className="dashboard-card">
              <h3>{t("Pokrok", "Progress")}</h3>
              <p className="dashboard-empty">{t("Začněte sledovat svou cestu.", "Start tracking your journey.")}</p>
              <a href="/dashboard/assessments" className="dashboard-card-link">
                {t("Zaznamenat pokrok \u2192", "Log progress \u2192")}
              </a>
            </div>

            {/* Daily Tip */}
            <div className="dashboard-card dashboard-card-highlight">
              <h3>{t("Denní tip", "Daily Tip")}</h3>
              <p>{t(
                "Hydratace je základ buněčného zdraví. Zkuste začít den sklenicí vody s citronem pro podporu detoxikace a metabolismu.",
                "Hydration is the foundation of cellular health. Try starting your day with a glass of lemon water to support detoxification and metabolism."
              )}</p>
            </div>

            {/* Studies */}
            <div className="dashboard-card">
              <h3>{t("Studijní materiály", "Study Materials")}</h3>
              <p className="dashboard-empty">{t("Kurzy a materiály budou brzy k dispozici.", "Courses and materials will be available soon.")}</p>
              <a href="/dashboard/courses" className="dashboard-card-link">
                {t("Procházet kurzy \u2192", "Browse courses \u2192")}
              </a>
            </div>

            {/* Profile Summary */}
            <div className="dashboard-card">
              <h3>{t("Profil", "Profile")}</h3>
              <p>{t("Jméno", "Name")}: {name}</p>
              <p>Email: {profile?.email || user.email}</p>
              <a href="/account" className="dashboard-card-link">
                {t("Upravit profil \u2192", "Edit profile \u2192")}
              </a>
            </div>
          </div>

          {/* Sign Out */}
          <div style={{ marginTop: "48px" }}>
            <button className="btn-secondary" onClick={handleLogout} style={{ padding: "10px 24px" }}>
              {t("Odhlásit se", "Sign Out")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
