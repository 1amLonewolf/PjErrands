import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice | P&J's Errands and Deliveries",
  description:
    "Learn how P&J's Errands and Deliveries uses information submitted with booking requests.",
};

const emailAddress = "pjerrands01@gmail.com";
const whatsappNumber = "254798873024";

export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header legal-header">
        <Link className="brand" href="/" aria-label="P&J's Errands and Deliveries home">
          <Image
            alt=""
            aria-hidden="true"
            className="brand-mark"
            height={500}
            src="/pj-logo.png"
            width={500}
          />
          <span className="brand-name">
            P&amp;J&apos;s <strong>Errands &amp; Deliveries</strong>
          </span>
        </Link>
        <Link className="button button-small button-orange header-cta" href="/">
          Back to home <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <main className="terms-main" id="main-content" tabIndex={-1}>
        <div className="terms-wrap">
          <Link className="terms-back-link" href="/">← Back to P&amp;J&apos;s</Link>
          <p className="eyebrow terms-eyebrow">CUSTOMER INFORMATION</p>
          <h1>Privacy Notice</h1>
          <p className="terms-updated">Last updated · 2 November 2026</p>

          <p className="terms-intro">
            This notice explains how P&amp;J&apos;s Errands and Deliveries
            (“P&amp;J”, “we”, “us”) handles information you submit when you
            contact us or make a booking request through this website.
          </p>

          <section className="terms-section">
            <h2>Information you provide</h2>
            <p>
              A booking request may include your name, phone number, optional
              email address, service choice, pickup and drop-off locations,
              preferred time, shopping list and budget, office or bill details,
              parcel description, and other instructions you choose to provide.
              Please do not include PINs, passwords, one-time codes, or other
              account credentials.
            </p>
          </section>

          <section className="terms-section">
            <h2>How we use it</h2>
            <p>
              We use booking details to receive and respond to your request,
              discuss and coordinate the requested errand, and contact you
              about it. If you provide an email address, it may also be used to
              send a booking acknowledgement. We use a keyed, non-reversible
              hash derived from the request IP address to apply a booking
              abuse-prevention limit; the rate-limit records are automatically
              cleaned up after they are no longer needed.
            </p>
          </section>

          <section className="terms-section">
            <h2>Services involved</h2>
            <p>
              Booking requests are stored in Supabase, which provides the
              database used by this site. Vercel hosts the website and processes
              requests to operate it. EmailJS is used to deliver booking
              notifications and, when you provide an email address, a customer
              acknowledgement.
            </p>
            <p>
              After submitting a request, you may choose to continue on
              WhatsApp. The link opens a message prefilled with booking details
              so you can review it before sending. WhatsApp handles information
              according to its own terms and privacy notice.
            </p>
          </section>

          <section className="terms-section">
            <h2>Retention and your requests</h2>
            <p>
              We do not currently use a fixed deletion schedule for booking
              records. We will review records periodically and keep them only
              for as long as needed to handle the request and related
              operational needs. Rate-limit records become eligible for
              automatic cleanup after one day.
            </p>
            <p>
              You can ask us to access, correct, or delete information you
              submitted by emailing{" "}
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a>. We may need
              to retain some information where necessary to resolve an issue or
              meet a legal obligation.
            </p>
          </section>

          <section className="terms-section">
            <h2>Cookies and contact</h2>
            <p>
              This website does not currently use advertising or analytics
              tracking. If you have a question or privacy request, email{" "}
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or contact
              us on{" "}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="terms-footer">
        <Link className="brand footer-brand" href="/">
          <Image
            alt=""
            aria-hidden="true"
            className="brand-mark"
            height={500}
            src="/pj-logo.png"
            width={500}
          />
          <span className="brand-name">P&amp;J&apos;s <strong>Errands &amp; Deliveries</strong></span>
        </Link>
        <span>Nairobi and nearby areas · Mon–Sat, 9:30am–7:00pm</span>
      </footer>
    </>
  );
}
