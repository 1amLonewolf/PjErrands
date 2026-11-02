import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <header className="site-header not-found-header">
        <Link
          className="brand"
          href="/"
          aria-label="P&J's Errands and Deliveries home"
        >
          <Image
            alt=""
            className="brand-mark"
            height={500}
            src="/pj-logo.png"
            width={500}
          />
          <span className="brand-name">
            P&J&apos;s <strong>Errands &amp; Deliveries</strong>
          </span>
        </Link>
        <a className="button button-small button-orange" href="tel:+254798873024">
          Call us
        </a>
      </header>

      <main className="not-found-page">
        <section className="not-found-content" aria-labelledby="not-found-title">
          <p className="not-found-eyebrow">Looks like this errand took a detour</p>
          <p className="not-found-code" aria-hidden="true">404</p>
          <h1 id="not-found-title">We can&apos;t find that page.</h1>
          <p className="not-found-description">
            The page may have moved, or the address might be mistyped. Let&apos;s
            get you back on track.
          </p>
          <div className="not-found-actions">
            <Link className="button button-orange" href="/">
              Back to home <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="button button-outline"
              href="https://wa.me/254798873024"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt=""
                aria-hidden="true"
                className="whatsapp-icon"
                height={24}
                src="/whatsapp-icon.png"
                width={24}
              />
              Message us on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
