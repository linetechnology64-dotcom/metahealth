"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import type { User } from "@supabase/supabase-js";

interface Profile {
  full_name: string;
  email: string;
  role: string;
  phone: string | null;
}

export default function AccountSettings({ user, profile }: { user: User; profile: Profile | null }) {
  const { t } = useLang();
  const router = useRouter();

  const [fullName, setFullName] = useState(profile?.full_name || user.user_metadata?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileMsg, setProfileMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setProfileMsg("");

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("id", user.id);

    if (error) {
      setProfileMsg(error.message);
    } else {
      setProfileMsg(t("Profil uložen!", "Profile saved!"));
    }
    setSaving(false);
  }

  async function handleEmailUpdate(e: React.FormEvent) {
    e.preventDefault();
    setEmailMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      setEmailMsg(error.message);
    } else {
      setEmailMsg(t("Potvrzovací email odeslán na novou adresu.", "Confirmation email sent to new address."));
      setNewEmail("");
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg("");

    if (newPassword !== confirmPassword) {
      setPasswordMsg(t("Hesla se neshodují.", "Passwords do not match."));
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg(t("Heslo musí mít alespoň 6 znaků.", "Password must be at least 6 characters."));
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMsg(error.message);
    } else {
      setPasswordMsg(t("Heslo změněno!", "Password changed!"));
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <h1>{t("Nastavení účtu", "Account Settings")}</h1>
          <p>{user.email}</p>
        </div>

        <div className="account-grid">
          {/* Profile Info */}
          <div className="account-card">
            <h3>{t("Osobní údaje", "Personal Info")}</h3>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label>{t("Celé jméno", "Full Name")}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("Vaše celé jméno", "Your full name")}
                />
              </div>
              <div className="form-group">
                <label>{t("Telefon", "Phone")}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("Vaše telefonní číslo", "Your phone number")}
                />
              </div>
              <button className="auth-btn" type="submit" disabled={saving}>
                {saving ? t("Ukládání...", "Saving...") : t("Uložit změny", "Save Changes")}
              </button>
              {profileMsg && <p className="account-msg">{profileMsg}</p>}
            </form>
          </div>

          {/* Change Email */}
          <div className="account-card">
            <h3>{t("Změnit email", "Change Email")}</h3>
            <p className="account-card-sub">{t("Aktuální", "Current")}: {user.email}</p>
            <form onSubmit={handleEmailUpdate}>
              <div className="form-group">
                <label>{t("Nový email", "New Email")}</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder={t("Nová emailová adresa", "New email address")}
                  required
                />
              </div>
              <button className="auth-btn" type="submit">
                {t("Změnit email", "Change Email")}
              </button>
              {emailMsg && <p className="account-msg">{emailMsg}</p>}
            </form>
          </div>

          {/* Change Password */}
          <div className="account-card">
            <h3>{t("Změnit heslo", "Change Password")}</h3>
            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label>{t("Nové heslo", "New Password")}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t("Nové heslo", "New password")}
                  required
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>{t("Potvrdit heslo", "Confirm Password")}</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("Potvrdit nové heslo", "Confirm new password")}
                  required
                />
              </div>
              <button className="auth-btn" type="submit">
                {t("Změnit heslo", "Change Password")}
              </button>
              {passwordMsg && <p className="account-msg">{passwordMsg}</p>}
            </form>
          </div>
        </div>

        <div className="account-logout">
          <button className="btn-secondary" onClick={handleLogout}>
            {t("Odhlásit se", "Sign Out")}
          </button>
        </div>
      </div>
    </div>
  );
}
