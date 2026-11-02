import Image from "next/image";

export default function Loading() {
  return (
    <>
      <header className="site-header loading-header" aria-hidden="true">
        <div className="brand">
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
        </div>
        <nav className="loading-nav">
          <span className="loading-skeleton loading-nav-item" />
          <span className="loading-skeleton loading-nav-item" />
          <span className="loading-skeleton loading-nav-item" />
          <span className="loading-skeleton loading-nav-item" />
        </nav>
        <span className="loading-skeleton loading-header-cta" />
      </header>

      <main className="loading-content" aria-busy="true">
        <p className="loading-status" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          Preparing your page
        </p>

        <div className="loading-skeleton-layout" aria-hidden="true">
          <section className="loading-hero">
            <div className="loading-hero-copy">
              <span className="loading-skeleton loading-eyebrow" />
              <span className="loading-skeleton loading-title-line" />
              <span className="loading-skeleton loading-title-line loading-title-short" />
              <span className="loading-skeleton loading-copy-line" />
              <span className="loading-skeleton loading-copy-line loading-copy-short" />
              <div className="loading-actions">
                <span className="loading-skeleton loading-button" />
                <span className="loading-skeleton loading-button loading-button-secondary" />
              </div>
            </div>
            <span className="loading-skeleton loading-hero-image" />
          </section>

          <section className="loading-services">
            <div className="loading-section-heading">
              <span className="loading-skeleton loading-eyebrow" />
              <span className="loading-skeleton loading-section-title" />
            </div>
            <div className="loading-service-grid">
              {[1, 2, 3, 4].map((item) => (
                <div className="loading-skeleton loading-service-card" key={item}>
                  <span className="loading-skeleton loading-service-icon" />
                  <span className="loading-skeleton loading-card-title" />
                  <span className="loading-skeleton loading-card-copy" />
                  <span className="loading-skeleton loading-card-copy loading-card-copy-short" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
