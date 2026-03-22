import { isFirebaseConfigured } from "@/lib/firebase"

const DashboardPage = () => {
  const firebaseReady = isFirebaseConfigured()

  return (
    <main
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6"
      aria-labelledby="dashboard-title"
    >
      <h1
        id="dashboard-title"
        className="mb-2 text-2xl font-semibold tracking-tight"
      >
        Kontrol paneli
      </h1>
      <p className="mb-8 max-w-2xl text-muted">
        Oturumunuz açık. Sonraki adımlar: kutu oluşturma, parça CRUD ve QR
        tarama bu sayfada genişletilecek.
      </p>

      <section
        className="rounded-xl border border-border bg-panel p-6"
        aria-label="Altyapı durumu"
      >
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Durum
        </h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-lg bg-background/50 p-3">
            <dt className="text-muted">Next.js + Tailwind</dt>
            <dd className="font-medium text-accent">Hazır</dd>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-background/50 p-3">
            <dt className="text-muted">Firebase (istemci)</dt>
            <dd
              className={
                firebaseReady
                  ? "font-medium text-accent"
                  : "font-medium text-warning"
              }
            >
              {firebaseReady ? "Yapılandırıldı" : ".env eksik"}
            </dd>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-background/50 p-3 sm:col-span-2">
            <dt className="text-muted">Kimlik</dt>
            <dd className="font-medium text-accent">Google ile giriş etkin</dd>
          </div>
        </dl>
      </section>
    </main>
  )
}

export default DashboardPage
