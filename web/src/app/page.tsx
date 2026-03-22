import Link from "next/link"
import { HomeHeroActions, HomeTopBarNav } from "@/components/home-public"

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="border-b border-border bg-panel/80 backdrop-blur-sm"
        role="banner"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="EngiBin ana sayfa"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 font-mono text-sm font-bold text-accent ring-1 ring-accent/30"
              aria-hidden
            >
              EB
            </span>
            <span className="text-lg font-semibold tracking-tight">EngiBin</span>
          </Link>
          <nav
            className="flex items-center gap-3"
            aria-label="Ana navigasyon"
          >
            <HomeTopBarNav />
          </nav>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-12 sm:px-6"
      >
        <section
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          aria-labelledby="hero-heading"
        >
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Smart Engineering Inventory
            </p>
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Atölye kaosunu QR ile düzene sokun
            </h1>
            <p className="max-w-xl text-pretty text-lg text-muted">
              Kutularınıza özel QR kodlar, anlık envanter, pinout ve datasheet
              erişimi — mühendislik laboratuvarları için tasarlandı.
            </p>
            <HomeHeroActions />
          </div>
          <div
            className="rounded-2xl border border-border bg-panel p-6 shadow-xl ring-1 ring-white/5"
            role="region"
            aria-label="Önizleme"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Örnek kutu
              </span>
              <span className="rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                Azalıyor
              </span>
            </div>
            <div className="grid gap-3 font-mono text-xs text-muted">
              <div className="flex justify-between border-b border-border pb-2">
                <span>Sensör Kutusu 1</span>
                <span className="text-accent">bin_7f3a…</span>
              </div>
              <ul className="space-y-2 pt-1" aria-label="Örnek parçalar">
                <li className="flex justify-between">
                  <span>DHT11</span>
                  <span>12 adet</span>
                </li>
                <li className="flex justify-between">
                  <span>BMP280</span>
                  <span>4 adet</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="grid gap-4 sm:grid-cols-3"
          aria-label="Özellikler"
        >
          {[
            {
              title: "QR üret & oku",
              body: "Kutu başına benzersiz QR; tarayıcıda kamera ile anında erişim.",
            },
            {
              title: "Envanter CRUD",
              body: "Parça, miktar, voltaj ve notlar — Firestore üzerinde esnek şema.",
            },
            {
              title: "Pinout & datasheet",
              body: "MVP sonrası dahili pinout kütüphanesi ve PDF bulutu.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-panel/50 p-5"
            >
              <h2 className="mb-2 text-sm font-semibold text-foreground">
                {item.title}
              </h2>
              <p className="text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer
        className="border-t border-border py-6 text-center text-xs text-muted"
        role="contentinfo"
      >
        EngiBin — canlıya alınabilir sürüm (Auth + Firebase).
      </footer>
    </div>
  )
}

export default HomePage
