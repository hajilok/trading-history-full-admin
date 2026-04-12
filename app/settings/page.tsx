import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

const notificationChannels = [
  { defaultChecked: true, label: "Email Digest" },
  { defaultChecked: true, label: "Push Notifications" },
  { defaultChecked: false, label: "SMS Alerts" },
];

export default function SettingsPage() {
  return (
    <AdminShell topBar={<AdminTopBar showSearch={false} title="Settings" />}>
      <div className="mx-auto max-w-[1160px] space-y-12 pb-12">
        <section className="rounded-[2.5rem] bg-surface-container-low p-4 shadow-[0_24px_60px_rgba(49,32,27,0.06)]">
          <div className="grid gap-10 rounded-[2rem] bg-surface-container px-8 py-10 md:px-10 xl:grid-cols-[0.78fr_1.35fr] xl:gap-14">
            <div className="max-w-sm">
              <h1 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">Profile Settings</h1>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Update your public identity and editorial persona.
              </p>
            </div>

            <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_18px_50px_rgba(49,32,27,0.05)] md:p-10">
              <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative">
                  <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.92),rgba(122,247,232,0.45)_28%,rgba(181,35,48,0.95)_80%)] shadow-[0_20px_40px_rgba(181,35,48,0.18)]">
                    <div className="absolute inset-x-4 bottom-0 top-5 rounded-t-[1.25rem] bg-[linear-gradient(180deg,rgba(28,24,21,0.15),rgba(28,24,21,0.82))]" />
                    <div className="absolute left-1/2 top-5 h-7 w-7 -translate-x-1/2 rounded-full bg-[#f2d5c8]" />
                    <div className="absolute left-1/2 top-11 h-10 w-12 -translate-x-1/2 rounded-t-[1.25rem] bg-[#1f1c1a]" />
                  </div>
                  <button className="btn-gradient absolute -bottom-1 -right-1 rounded-full p-2.5 text-white shadow-[0_12px_28px_rgba(181,35,48,0.28)] transition-transform active:scale-95">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>
                <div>
                  <p className="text-xl font-bold text-on-surface">Julian Vane</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Chief Curator
                  </p>
                </div>
              </div>

              <div className="grid gap-5">
                <label className="block">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Full Name
                  </span>
                  <input
                    className="ghost-input mt-2 w-full rounded-[1.25rem] px-4 py-3 text-sm text-on-surface"
                    defaultValue="Julian Vane"
                    type="text"
                  />
                </label>

                <label className="block">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Email Address
                  </span>
                  <input
                    className="ghost-input mt-2 w-full rounded-[1.25rem] px-4 py-3 text-sm text-on-surface"
                    defaultValue="julian.vane@financialatelier.com"
                    type="email"
                  />
                </label>

                <label className="block">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Bio
                  </span>
                  <textarea
                    className="ghost-input mt-2 min-h-32 w-full rounded-[1.25rem] px-4 py-3 text-sm leading-7 text-on-surface"
                    defaultValue="Curating global trade narratives with a focus on high-yield equity journals and macro-economic trends."
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-surface-container-low p-4 shadow-[0_24px_60px_rgba(49,32,27,0.06)]">
          <div className="grid gap-10 rounded-[2rem] bg-surface-container px-8 py-10 md:px-10 xl:grid-cols-[0.78fr_1.35fr] xl:gap-14">
            <div className="max-w-sm">
              <h2 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">Security</h2>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Protect your assets and editorial data with high-grade security protocols.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_18px_50px_rgba(49,32,27,0.05)] md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                  Change Password
                </p>
                <div className="mt-6 grid gap-4">
                  <input
                    className="ghost-input w-full rounded-[1.25rem] px-4 py-3 text-sm text-on-surface"
                    placeholder="Current Password"
                    type="password"
                  />
                  <input
                    className="ghost-input w-full rounded-[1.25rem] px-4 py-3 text-sm text-on-surface"
                    placeholder="New Password"
                    type="password"
                  />
                </div>
              </div>

              <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_18px_50px_rgba(49,32,27,0.05)] md:p-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-lg">
                    <h3 className="text-lg font-bold text-on-surface">Two-Factor Authentication</h3>
                    <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                      Verify logins via mobile app or SMS before any protected dashboard can open.
                    </p>
                  </div>

                  <button
                    aria-label="Two-factor authentication is enabled"
                    className="relative inline-flex h-8 w-14 items-center rounded-full bg-secondary p-1 shadow-inner"
                    type="button"
                  >
                    <span className="h-6 w-6 translate-x-6 rounded-full bg-white shadow-sm transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-surface-container-low p-4 shadow-[0_24px_60px_rgba(49,32,27,0.06)]">
          <div className="grid gap-10 rounded-[2rem] bg-surface-container px-8 py-10 md:px-10 xl:grid-cols-[0.78fr_1.35fr] xl:gap-14">
            <div className="max-w-sm">
              <h2 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">Preferences</h2>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Tailor the Atelier interface to your regional requirements.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_18px_50px_rgba(49,32,27,0.05)] md:p-10">
                <label className="block">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Default Currency
                  </span>
                  <div className="relative mt-2">
                    <select className="ghost-input w-full appearance-none rounded-[1.25rem] px-4 py-3 pr-12 text-sm text-on-surface">
                      <option>USD - United States Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>JPY - Japanese Yen</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      expand_more
                    </span>
                  </div>
                </label>
              </div>

              <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_18px_50px_rgba(49,32,27,0.05)] md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                  Notification Channels
                </p>
                <div className="mt-6 space-y-5">
                  {notificationChannels.map((channel) => (
                    <label className="flex items-center justify-between gap-4" key={channel.label}>
                      <span className="text-sm font-medium text-on-surface">{channel.label}</span>
                      <input
                        className="h-4 w-4 rounded border-outline-variant/40 text-primary focus:ring-primary/20"
                        defaultChecked={channel.defaultChecked}
                        type="checkbox"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-primary/10 p-4 shadow-[0_24px_60px_rgba(181,35,48,0.06)]">
          <div className="grid gap-10 rounded-[2rem] bg-surface-container px-8 py-10 md:px-10 xl:grid-cols-[0.78fr_1.35fr] xl:gap-14">
            <div className="max-w-sm">
              <h2 className="text-3xl font-black tracking-tight text-primary md:text-4xl">Dangerous Zone</h2>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Irreversible actions regarding your ledger and historical archives.
              </p>
            </div>

            <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_18px_50px_rgba(49,32,27,0.05)] md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-lg">
                  <h3 className="text-lg font-bold text-on-surface">Delete Account</h3>
                  <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                    Once you delete your account, all your trading history and analysis will be
                    permanently erased. This cannot be undone.
                  </p>
                </div>
                <button className="btn-gradient w-fit rounded-full px-6 py-3 text-sm font-bold text-white transition-transform active:scale-95">
                  Delete Ledger Account
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col justify-end gap-4 pt-2 sm:flex-row">
          <button className="rounded-full bg-surface-container-high px-8 py-3 text-sm font-bold text-on-surface transition-colors hover:bg-surface-dim">
            Discard Changes
          </button>
          <button className="btn-gradient bento-shadow rounded-full px-10 py-3 text-sm font-bold text-white transition-transform active:scale-95">
            Save Updates
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
