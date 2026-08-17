"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLang();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div className="auth-page">
      <div className="auth-page-card">
        <h2>{t("Vítejte zpět", "Welcome Back")}</h2>
        <p>{t("Přihlaste se ke svému účtu", "Sign in to your account")}</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
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
              placeholder={t("Zadejte heslo", "Enter password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? t("Přihlašování...", "Signing in...") : t("Přihlásit se", "Sign In")}
          </button>
        </form>

        <div className="auth-divider">{t("nebo", "or")}</div>
        <button className="auth-social" onClick={handleGoogle}>
          {t("Pokračovat přes Google", "Continue with Google")}
        </button>

        <p className="auth-switch">
          {t("Nemáte účet?", "Don't have an account?")}{" "}
          <a href="/signup">{t("Zaregistrujte se", "Sign up")}</a>
        </p>
      </div>
    </div>
  );
}
