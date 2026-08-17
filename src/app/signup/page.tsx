"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { t } = useLang();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-page-card">
          <h2>{t("Zkontrolujte email", "Check Your Email")}</h2>
          <p>
            {t(
              "Poslali jsme vám potvrzovací odkaz na",
              "We sent a confirmation link to"
            )}{" "}
            <strong>{email}</strong>.{" "}
            {t(
              "Klikněte na něj pro aktivaci účtu.",
              "Click it to activate your account."
            )}
          </p>
          <a href="/login" className="auth-btn" style={{ display: "block", textAlign: "center", marginTop: "24px" }}>
            {t("Zpět na přihlášení", "Back to Sign In")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-page-card">
        <h2>{t("Vytvořit účet", "Create Account")}</h2>
        <p>{t("Zaregistrujte se zdarma", "Sign up for free")}</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>{t("Celé jméno", "Full Name")}</label>
            <input
              type="text"
              placeholder={t("Vaše celé jméno", "Your full name")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="vas@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("Heslo", "Password")}</label>
            <input
              type="password"
              placeholder={t("Vytvořte heslo", "Create a password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? t("Vytváření účtu...", "Creating account...") : t("Vytvořit účet", "Create Account")}
          </button>
        </form>

        <div className="auth-divider">{t("nebo", "or")}</div>
        <button className="auth-social" onClick={handleGoogle}>
          {t("Registrace přes Google", "Sign Up with Google")}
        </button>

        <p className="auth-switch">
          {t("Už máte účet?", "Already have an account?")}{" "}
          <a href="/login">{t("Přihlaste se", "Sign in")}</a>
        </p>
      </div>
    </div>
  );
}
