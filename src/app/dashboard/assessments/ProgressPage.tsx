"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLang } from "@/context/LanguageContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Log {
  id: string;
  date: string;
  title: string | null;
  notes: string | null;
  photo_url: string | null;
  weight: number | null;
  body_fat_pct: number | null;
  waist_cm: number | null;
  bp_systolic: number | null;
  bp_diastolic: number | null;
  energy_level: number | null;
}

export default function ProgressPage({ userId, initialLogs }: { userId: string; initialLogs: Log[] }) {
  const { t } = useLang();
  const [logs, setLogs] = useState<Log[]>(initialLogs);
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadPhotos() {
      const supabase = createClient();
      const urls: Record<string, string> = {};
      for (const log of initialLogs) {
        if (log.photo_url) {
          const { data } = await supabase.storage
            .from("progress-photos")
            .createSignedUrl(log.photo_url, 3600);
          if (data?.signedUrl) urls[log.id] = data.signedUrl;
        }
      }
      setPhotoUrls(urls);
    }
    loadPhotos();
  }, [initialLogs]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [activeTab, setActiveTab] = useState<"logs" | "graphs">("logs");
  const [saving, setSaving] = useState(false);
  const [showMoreStats, setShowMoreStats] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    title: "",
    notes: "",
    weight: "",
    body_fat_pct: "",
    waist_cm: "",
    bp_systolic: "",
    bp_diastolic: "",
    energy_level: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    let photo_url = null;
    if (photo) {
      const ext = photo.name.split(".").pop();
      const path = `${userId}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("progress-photos")
        .upload(path, photo);
      if (!uploadError) {
        // Store the path, not a URL — we'll create signed URLs when viewing
        photo_url = path;
      }
    }

    const entry = {
      user_id: userId,
      date: form.date,
      title: form.title || null,
      notes: form.notes || null,
      photo_url,
      weight: form.weight ? parseFloat(form.weight) : null,
      body_fat_pct: form.body_fat_pct ? parseFloat(form.body_fat_pct) : null,
      waist_cm: form.waist_cm ? parseFloat(form.waist_cm) : null,
      bp_systolic: form.bp_systolic ? parseInt(form.bp_systolic) : null,
      bp_diastolic: form.bp_diastolic ? parseInt(form.bp_diastolic) : null,
      energy_level: form.energy_level ? parseInt(form.energy_level) : null,
    };

    const { data, error } = await supabase
      .from("progress_logs")
      .insert(entry)
      .select()
      .single();

    if (!error && data) {
      if (data.photo_url) {
        const { data: signedData } = await supabase.storage
          .from("progress-photos")
          .createSignedUrl(data.photo_url, 3600);
        if (signedData?.signedUrl) {
          setPhotoUrls((prev) => ({ ...prev, [data.id]: signedData.signedUrl }));
        }
      }
      setLogs([data, ...logs]);
      setShowForm(false);
      setForm({ date: new Date().toISOString().split("T")[0], title: "", notes: "", weight: "", body_fat_pct: "", waist_cm: "", bp_systolic: "", bp_diastolic: "", energy_level: "" });
      setPhoto(null);
    }
    setSaving(false);
  }

  const graphData = [...logs]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((l) => ({
      date: l.date,
      [t("Váha (kg)", "Weight (kg)")]: l.weight,
      [t("Tuk (%)", "Fat (%)")]: l.body_fat_pct,
      [t("Pas (cm)", "Waist (cm)")]: l.waist_cm,
      [t("Energie", "Energy")]: l.energy_level,
      [t("TK sys", "BP sys")]: l.bp_systolic,
      [t("TK dia", "BP dia")]: l.bp_diastolic,
    }));

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>{t("Můj pokrok", "My Progress")}</h1>
            <p>{t("Sledujte svou cestu ke zdraví", "Track your health journey")}</p>
          </div>

          {/* Tabs */}
          <div className="progress-tabs">
            <button className={`progress-tab ${activeTab === "logs" ? "active" : ""}`} onClick={() => setActiveTab("logs")}>
              {t("Záznamy", "Entries")}
            </button>
            <button className={`progress-tab ${activeTab === "graphs" ? "active" : ""}`} onClick={() => setActiveTab("graphs")}>
              {t("Grafy", "Graphs")}
            </button>
            <button className="btn-primary" onClick={() => { setShowForm(true); setSelectedLog(null); }} style={{ marginLeft: "auto", padding: "10px 24px" }}>
              + {t("Nový záznam", "New Entry")}
            </button>
          </div>

          {/* New Entry Form */}
          {showForm && (
            <div className="progress-form-overlay" onClick={() => setShowForm(false)}>
              <form className="progress-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <h3>{t("Nový záznam", "New Entry")}</h3>
                <div className="progress-form-grid">
                  <div className="form-group">
                    <label>{t("Datum", "Date")}</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>{t("Název", "Title")}</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t("např. Týdenní kontrola", "e.g. Weekly check-in")} />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t("Poznámky", "Notes")}</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder={t("Jak se cítíte, co se změnilo...", "How you feel, what changed...")} />
                </div>
                <div className="progress-form-grid">
                  <div className="form-group">
                    <label>{t("Váha (kg)", "Weight (kg)")}</label>
                    <input type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="0.0" />
                  </div>
                  <div className="form-group">
                    <label>{t("Fotografie", "Photo")}</label>
                    <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                  </div>
                </div>

                <button type="button" className="progress-more-toggle" onClick={() => setShowMoreStats(!showMoreStats)}>
                  {showMoreStats ? t("Skrýt další měření \u25B2", "Hide extra stats \u25B2") : t("Další měření (volitelné) \u25BC", "More stats (optional) \u25BC")}
                </button>

                {showMoreStats && (
                  <div className="progress-form-grid progress-form-stats">
                    <div className="form-group">
                      <label>{t("Tělesný tuk (%)", "Body Fat (%)")}</label>
                      <input type="number" step="0.1" value={form.body_fat_pct} onChange={(e) => setForm({ ...form, body_fat_pct: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>{t("Obvod pasu (cm)", "Waist (cm)")}</label>
                      <input type="number" step="0.1" value={form.waist_cm} onChange={(e) => setForm({ ...form, waist_cm: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>{t("TK systolický", "BP Systolic")}</label>
                      <input type="number" value={form.bp_systolic} onChange={(e) => setForm({ ...form, bp_systolic: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>{t("TK diastolický", "BP Diastolic")}</label>
                      <input type="number" value={form.bp_diastolic} onChange={(e) => setForm({ ...form, bp_diastolic: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>{t("Energie (1–10)", "Energy (1–10)")}</label>
                      <input type="number" min="1" max="10" value={form.energy_level} onChange={(e) => setForm({ ...form, energy_level: e.target.value })} />
                    </div>
                  </div>
                )}
                <div className="progress-form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowForm(false)} style={{ padding: "10px 24px" }}>
                    {t("Zrušit", "Cancel")}
                  </button>
                  <button type="submit" className="btn-primary" disabled={saving} style={{ padding: "10px 24px" }}>
                    {saving ? t("Ukládání...", "Saving...") : t("Uložit", "Save")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Selected Log Detail */}
          {selectedLog && (
            <div className="progress-form-overlay" onClick={() => setSelectedLog(null)}>
              <div className="progress-detail" onClick={(e) => e.stopPropagation()}>
                <button className="progress-detail-close" onClick={() => setSelectedLog(null)}>&times;</button>
                <h2>{selectedLog.title || t("Záznam", "Entry")}</h2>
                <p className="progress-detail-date">{new Date(selectedLog.date).toLocaleDateString(t("cs-CZ", "en-GB"))}</p>
                {photoUrls[selectedLog.id] && (
                  <img src={photoUrls[selectedLog.id]} alt="" className="progress-detail-photo" />
                )}
                {selectedLog.notes && <p className="progress-detail-notes">{selectedLog.notes}</p>}
                <div className="progress-detail-stats">
                  {selectedLog.weight && <div><strong>{t("Váha", "Weight")}</strong> {selectedLog.weight} kg</div>}
                  {selectedLog.body_fat_pct && <div><strong>{t("Tuk", "Fat")}</strong> {selectedLog.body_fat_pct}%</div>}
                  {selectedLog.waist_cm && <div><strong>{t("Pas", "Waist")}</strong> {selectedLog.waist_cm} cm</div>}
                  {selectedLog.bp_systolic && <div><strong>{t("TK", "BP")}</strong> {selectedLog.bp_systolic}/{selectedLog.bp_diastolic}</div>}
                  {selectedLog.energy_level && <div><strong>{t("Energie", "Energy")}</strong> {selectedLog.energy_level}/10</div>}
                </div>
              </div>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === "logs" && (
            <div className="progress-grid">
              {logs.length === 0 ? (
                <div className="dashboard-card">
                  <p className="dashboard-empty">{t("Zatím žádné záznamy. Přidejte svůj první!", "No entries yet. Add your first one!")}</p>
                </div>
              ) : (
                logs.map((log) => (
                  <div className="progress-card" key={log.id} onClick={() => setSelectedLog(log)}>
                    {photoUrls[log.id] && (
                      <div className="progress-card-photo">
                        <img src={photoUrls[log.id]} alt="" />
                      </div>
                    )}
                    <div className="progress-card-info">
                      <h4>{log.title || t("Záznam", "Entry")}</h4>
                      <span className="progress-card-date">
                        {new Date(log.date).toLocaleDateString(t("cs-CZ", "en-GB"))}
                      </span>
                      {log.weight && <span className="progress-card-stat">{log.weight} kg</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Graphs Tab */}
          {activeTab === "graphs" && (
            <div className="progress-charts">
              {graphData.length < 2 ? (
                <div className="dashboard-card">
                  <p className="dashboard-empty">{t("Přidejte alespoň 2 záznamy pro zobrazení grafů.", "Add at least 2 entries to see graphs.")}</p>
                </div>
              ) : (
                <>
                  <div className="progress-chart-card">
                    <h3>{t("Váha & tělesný tuk", "Weight & Body Fat")}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(175,119,97,0.15)" />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={t("Váha (kg)", "Weight (kg)")} stroke="#AF7761" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                        <Line type="monotone" dataKey={t("Tuk (%)", "Fat (%)")} stroke="#D6997D" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="progress-chart-card">
                    <h3>{t("Obvod pasu", "Waist Circumference")}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(175,119,97,0.15)" />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey={t("Pas (cm)", "Waist (cm)")} stroke="#78594F" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="progress-chart-card">
                    <h3>{t("Krevní tlak", "Blood Pressure")}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(175,119,97,0.15)" />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={t("TK sys", "BP sys")} stroke="#222939" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                        <Line type="monotone" dataKey={t("TK dia", "BP dia")} stroke="#AF7761" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="progress-chart-card">
                    <h3>{t("Úroveň energie", "Energy Level")}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(175,119,97,0.15)" />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey={t("Energie", "Energy")} stroke="#D6997D" strokeWidth={2} dot={{ r: 4 }} connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
