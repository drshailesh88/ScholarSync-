"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserCircle,
  CreditCard,
  ChartBar,
  Gear,
  SignOut,
  DownloadSimple,
  ShieldCheck,
  Plus,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getUser, updateUserProfile, getUserUsageStats } from "@/lib/actions/user";
import { mockInvoices, type MockInvoice } from "@/lib/mock-data";

const settingsTabs = [
  { key: "account", label: "My Account", icon: UserCircle },
  { key: "billing", label: "Plans & Billing", icon: CreditCard },
  { key: "usage", label: "Usage Tracking", icon: ChartBar },
  { key: "preferences", label: "Preferences", icon: Gear },
];

const invoiceColumns: DataTableColumn<MockInvoice>[] = [
  {
    key: "date",
    label: "Date",
    render: (inv) => new Date(inv.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }),
  },
  { key: "description", label: "Description" },
  {
    key: "amount",
    label: "Amount",
    render: (inv) => `₹${inv.amount.toLocaleString("en-IN")}`,
  },
  {
    key: "actions",
    label: "",
    render: () => (
      <button className="flex items-center gap-1 text-xs text-brand hover:text-brand-hover transition-colors">
        <DownloadSimple size={14} />
        Download
      </button>
    ),
  },
];

interface UserData {
  id: string;
  email: string;
  full_name: string | null;
  plan: string | null;
  specialty: string | null;
  country: string | null;
  bio: string | null;
  research_interests: string[] | unknown | null;
  preferred_language: string | null;
  default_citation_style: string | null;
  orcid_id: string | null;
}

interface UsageData {
  tokens_used: number | null;
  tokens_limit: number | null;
  searches_used: number | null;
  plagiarism_checks: number | null;
  exports_used: number | null;
  plan: string | null;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [fontSize, setFontSize] = useState("16");

  // --------------- Profile fields ---------------
  const [profileName, setProfileName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [researchInterests, setResearchInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [citationFormat, setCitationFormat] = useState("apa7");
  const [orcidId, setOrcidId] = useState("");

  // --------------- Data / UI state ---------------
  const [user, setUser] = useState<UserData | null>(null);
  const [usageStats, setUsageStats] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [prefsSaveMessage, setPrefsSaveMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // --------------- Helpers ---------------
  function showSaveMessage(setter: typeof setSaveMessage, text: string, type: "success" | "error") {
    setter({ text, type });
    setTimeout(() => setter(null), 3000);
  }

  function parseResearchInterests(raw: unknown): string[] {
    if (Array.isArray(raw)) return raw.filter((v): v is string => typeof v === "string");
    return [];
  }

  // --------------- Fetch data on mount ---------------
  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, usageData] = await Promise.all([
          getUser(),
          getUserUsageStats(),
        ]);
        if (userData) {
          const u = userData as UserData;
          setUser(u);
          setProfileName(u.full_name || "");
          setSpecialty(u.specialty || "");
          setCountry(u.country || "");
          setBio(u.bio || "");
          setResearchInterests(parseResearchInterests(u.research_interests));
          setPreferredLanguage(u.preferred_language || "en");
          setCitationFormat(u.default_citation_style || "apa7");
          setOrcidId(u.orcid_id || "");
        }
        if (usageData) {
          setUsageStats(usageData as UsageData);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --------------- Save profile (Account tab) ---------------
  const handleSaveProfile = useCallback(async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const updated = await updateUserProfile({
        full_name: profileName,
        specialty,
        country,
        bio,
        research_interests: researchInterests,
        orcid_id: orcidId,
      });
      if (updated) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                full_name: updated.full_name,
                specialty: updated.specialty,
                country: updated.country,
                bio: updated.bio,
                research_interests: updated.research_interests,
                orcid_id: updated.orcid_id,
              }
            : prev
        );
        showSaveMessage(setSaveMessage, "Profile saved successfully.", "success");
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
      showSaveMessage(setSaveMessage, "Failed to save profile. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  }, [profileName, specialty, country, bio, researchInterests, orcidId]);

  // --------------- Save preferences ---------------
  const handleSavePreferences = useCallback(async () => {
    setSavingPrefs(true);
    setPrefsSaveMessage(null);
    try {
      const updated = await updateUserProfile({
        preferred_language: preferredLanguage,
        default_citation_style: citationFormat,
      });
      if (updated) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                preferred_language: updated.preferred_language,
                default_citation_style: updated.default_citation_style,
              }
            : prev
        );
        showSaveMessage(setPrefsSaveMessage, "Preferences saved successfully.", "success");
      }
    } catch (err) {
      console.error("Failed to save preferences:", err);
      showSaveMessage(setPrefsSaveMessage, "Failed to save preferences. Please try again.", "error");
    } finally {
      setSavingPrefs(false);
    }
  }, [preferredLanguage, citationFormat]);

  // --------------- Research interest chips ---------------
  function addInterest() {
    const trimmed = interestInput.trim();
    if (trimmed && !researchInterests.includes(trimmed)) {
      setResearchInterests((prev) => [...prev, trimmed]);
      setInterestInput("");
    }
  }

  function removeInterest(interest: string) {
    setResearchInterests((prev) => prev.filter((i) => i !== interest));
  }

  // --------------- Loading state ---------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
        <p className="text-sm text-ink-muted">Loading settings...</p>
      </div>
    );
  }

  const displayName = user?.full_name || "User";
  const displayEmail = user?.email || "";
  const displayPlan = user?.plan || "free";

  const tokensUsed = usageStats?.tokens_used ?? 0;
  const tokensLimit = usageStats?.tokens_limit ?? 10000;
  const searchesUsed = usageStats?.searches_used ?? 0;
  const plagiarismChecks = usageStats?.plagiarism_checks ?? 0;

  // Plan-based limits for display
  const searchesLimit = -1; // unlimited (fair use)
  const plagiarismLimit = displayPlan === "basic" ? 10 : displayPlan === "pro" ? 50 : 3;

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Settings Nav Sidebar */}
      <aside className="w-64 shrink-0 glass-panel rounded-2xl p-4 flex flex-col">
        <h2 className="font-semibold text-ink text-sm px-3 mb-4">Settings</h2>
        <nav className="flex-1 space-y-1">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
                  activeTab === tab.key
                    ? "bg-surface-raised text-ink border border-border-subtle"
                    : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
                )}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors mt-4">
          <SignOut size={18} />
          Log Out
        </button>
      </aside>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        {/* My Account */}
        {activeTab === "account" && (
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-lg font-semibold text-ink">My Account</h1>

            <GlassPanel className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-surface-raised flex items-center justify-center">
                  <UserCircle size={48} className="text-ink-muted" />
                </div>
                <div>
                  <h3 className="text-ink font-semibold">{displayName}</h3>
                  <p className="text-sm text-ink-muted">{displayEmail}</p>
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                    <ShieldCheck size={12} />
                    Verified Student
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Dr. Jane Doe"
                    className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>

                {/* Specialty / Institution */}
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5">Specialty / Institution</label>
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g. Cardiology, AIIMS New Delhi"
                    className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. India"
                    className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder="A short bio about your research background..."
                    className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none"
                  />
                </div>

                {/* Research Interests (chip input) */}
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5">Research Interests</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {researchInterests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand/10 text-brand text-xs font-medium"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="hover:text-brand-hover transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addInterest();
                        }
                      }}
                      placeholder="Type an interest and press Enter"
                      className="flex-1 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                    <button
                      type="button"
                      onClick={addInterest}
                      className="px-3 py-2 rounded-lg border border-border text-sm text-ink-muted hover:bg-surface-raised transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* ORCID iD */}
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5">ORCID iD</label>
                  <input
                    type="text"
                    value={orcidId}
                    onChange={(e) => setOrcidId(e.target.value)}
                    placeholder="0000-0002-1825-0097"
                    className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                  <p className="text-[10px] text-ink-muted mt-1">Your unique researcher identifier from orcid.org</p>
                </div>

                {/* Save button */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="px-4 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  {saveMessage && (
                    <span className={cn(
                      "text-xs font-medium",
                      saveMessage.type === "success" ? "text-emerald-500" : "text-red-500"
                    )}>
                      {saveMessage.text}
                    </span>
                  )}
                </div>
              </div>
            </GlassPanel>
          </div>
        )}

        {/* Plans & Billing */}
        {activeTab === "billing" && (
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-lg font-semibold text-ink">Plans & Billing</h1>

            {/* Current Plan */}
            <GlassPanel className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-ink font-semibold">{displayPlan.charAt(0).toUpperCase() + displayPlan.slice(1)} Plan</h3>
                  <p className="text-2xl font-bold text-ink mt-1">
                    {displayPlan === "free" ? (
                      <>Free</>
                    ) : displayPlan === "basic" ? (
                      <>₹1,000<span className="text-sm font-normal text-ink-muted">/month</span></>
                    ) : (
                      <>₹2,500<span className="text-sm font-normal text-ink-muted">/month</span></>
                    )}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                  ACTIVE
                </span>
              </div>
              <p className="text-sm text-ink-muted mb-4">
                Token quota: {tokensLimit.toLocaleString("en-IN")} tokens/month
              </p>
              <button className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-ink hover:bg-surface-raised transition-colors">
                Manage Plan
              </button>
            </GlassPanel>

            {/* Payment Method */}
            <GlassPanel className="p-6">
              <h3 className="text-sm font-semibold text-ink mb-3">Payment Method</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-surface-raised border border-border flex items-center justify-center">
                    <CreditCard size={18} className="text-ink-muted" />
                  </div>
                  <div>
                    <p className="text-sm text-ink">Visa {"\u2022\u2022\u2022\u2022"} {"\u2022\u2022\u2022\u2022"} {"\u2022\u2022\u2022\u2022"} 4242</p>
                    <span className="text-[10px] text-ink-muted">Razorpay Secure</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-ink hover:bg-surface-raised transition-colors">
                  Update
                </button>
              </div>
            </GlassPanel>

            {/* Invoice History */}
            <div>
              <h3 className="text-sm font-semibold text-ink mb-3">Invoice History</h3>
              <DataTable columns={invoiceColumns} data={mockInvoices} />
            </div>
          </div>
        )}

        {/* Usage Tracking */}
        {activeTab === "usage" && (
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-lg font-semibold text-ink">Usage Tracking</h1>

            <GlassPanel className="p-6 space-y-6">
              <ProgressBar
                value={tokensUsed}
                max={tokensLimit}
                label="AI Tokens"
                color="var(--brand)"
              />
              <div>
                <ProgressBar
                  value={searchesUsed}
                  max={searchesLimit}
                  label="Deep Searches"
                  color="#0ea5e9"
                />
                <p className="text-[10px] text-ink-muted mt-1">Fair use policy applies for unlimited searches</p>
              </div>
              <ProgressBar
                value={plagiarismChecks}
                max={plagiarismLimit}
                label="Plagiarism Checks"
                color="#f59e0b"
              />
            </GlassPanel>

            {/* Quick stats summary */}
            <GlassPanel className="p-6">
              <h3 className="text-sm font-semibold text-ink mb-4">This Month at a Glance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-surface-raised">
                  <p className="text-xs text-ink-muted">Tokens Used</p>
                  <p className="text-lg font-bold text-ink">{tokensUsed.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] text-ink-muted">of {tokensLimit.toLocaleString("en-IN")}</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised">
                  <p className="text-xs text-ink-muted">Searches</p>
                  <p className="text-lg font-bold text-ink">{searchesUsed}</p>
                  <p className="text-[10px] text-ink-muted">this month</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised">
                  <p className="text-xs text-ink-muted">Plagiarism Checks</p>
                  <p className="text-lg font-bold text-ink">{plagiarismChecks}</p>
                  <p className="text-[10px] text-ink-muted">of {plagiarismLimit}</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised">
                  <p className="text-xs text-ink-muted">Exports</p>
                  <p className="text-lg font-bold text-ink">{usageStats?.exports_used ?? 0}</p>
                  <p className="text-[10px] text-ink-muted">this month</p>
                </div>
              </div>
            </GlassPanel>
          </div>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-lg font-semibold text-ink">Preferences</h1>

            <GlassPanel className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-3">Theme</label>
                <ThemeToggle />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Editor Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-48 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                >
                  <option value="14">14px</option>
                  <option value="16">16px (Default)</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Default Citation Format</label>
                <select
                  value={citationFormat}
                  onChange={(e) => setCitationFormat(e.target.value)}
                  className="w-48 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                >
                  <option value="apa7">APA 7th Edition</option>
                  <option value="mla9">MLA 9th Edition</option>
                  <option value="chicago">Chicago 17th</option>
                  <option value="vancouver">Vancouver</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Preferred Language</label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-48 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                  <option value="zh">Chinese</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                </select>
              </div>

              {/* Save preferences */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSavePreferences}
                  disabled={savingPrefs}
                  className="px-4 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
                >
                  {savingPrefs ? "Saving..." : "Save Preferences"}
                </button>
                {prefsSaveMessage && (
                  <span className={cn(
                    "text-xs font-medium",
                    prefsSaveMessage.type === "success" ? "text-emerald-500" : "text-red-500"
                  )}>
                    {prefsSaveMessage.text}
                  </span>
                )}
              </div>
            </GlassPanel>
          </div>
        )}
      </div>
    </div>
  );
}
