import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | P&J's Errands and Deliveries",
  description:
    "Read the booking, service, payment, and customer responsibilities for P&J's Errands and Deliveries.",
};

const whatsappNumber = "254798873024";
const emailAddress = "pjerrands01@gmail.com";

export default function TermsPage() {
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
          <h1>Terms &amp; Conditions</h1>
          <p className="terms-updated">Working draft · 31 October 2026</p>

          <aside className="terms-review-note" role="note">
            <strong>Business review required before publication</strong>
            <p>
              This draft reflects the details currently confirmed for the
              website. P&amp;J should review the pricing, cancellation, and
              service policies below before treating these terms as final.
            </p>
          </aside>

          <p className="terms-intro">
            These terms explain how errand and delivery requests are made and
            confirmed. By sending a request to P&amp;J&apos;s Errands and
            Deliveries (“P&amp;J”, “we”, “us”), you agree to discuss the
            arrangements described here with us before work begins.
          </p>

          <section className="terms-section">
            <h2>1. Our services</h2>
            <p>
              P&amp;J offers delivery services, shopping and grocery errands,
              queueing and bill-payment errands, and parcel pickup and
              drop-off. Service is available in Nairobi and nearby areas,
              subject to location, availability, and confirmation by P&amp;J.
            </p>
            <p>
              Our listed business hours are Monday to Saturday, 9:30am to
              7:00pm, excluding Sunday. Sending a request outside these hours
              does not guarantee an immediate response or service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Requests and confirmation</h2>
            <p>
              A form submission, phone call, email, or WhatsApp message is a
              request—not an accepted booking. A booking is confirmed only
              after P&amp;J has contacted you and both sides have agreed the
              task details, availability, timing, applicable charges, and
              payment arrangement.
            </p>
            <p>
              Please provide accurate contact details, locations, instructions,
              and any limits for purchases or other spending. Preferred times
              are requests and are not confirmed until P&amp;J agrees to them.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Charges and payment</h2>
            <p>
              Charges depend on the service and request. Before confirming,
              P&amp;J will discuss applicable service or delivery charges and
              any agreed shopping budget or other costs with you.
            </p>
            <p>
              This website does not currently accept online payments. Confirm
              the payment method and recipient directly with P&amp;J before
              sending money. Never share an M-Pesa PIN, bank PIN, password, or
              one-time verification code.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Your responsibilities</h2>
            <ul>
              <li>Give clear, accurate instructions and remain reachable while an errand is being arranged.</li>
              <li>Confirm that you are authorized to request the task and provide any item or account references needed to identify it.</li>
              <li>For shopping, agree the list, budget, and how substitutions should be handled before the shop begins.</li>
              <li>Do not request unlawful tasks or send items that are illegal, unsafe, or otherwise unsuitable for transport.</li>
              <li>Do not send confidential authentication credentials, including PINs, passwords, or one-time codes, through the website or chat.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Changes, cancellations, and delays</h2>
            <p>
              Contact P&amp;J by phone or WhatsApp as soon as possible if you
              need to change or cancel a request. Changes depend on availability
              and may affect timing or charges. Before proceeding, ask P&amp;J
              to confirm any costs already incurred and any applicable
              cancellation or refund arrangement.
            </p>
            <p>
              Travel, queues, shop availability, and other circumstances can
              affect timing. If a delay or issue arises, P&amp;J will discuss
              the next steps with you.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Personal information</h2>
            <p>
              We ask for contact and task details so we can respond to your
              request and, if accepted, coordinate the errand. Please share
              only information relevant to the task. Do not include payment
              credentials or unrelated sensitive information.
            </p>
            <p>
              Contact P&amp;J if you have a question about information you have
              submitted or want to request its correction or deletion. Read our{" "}
              <Link href="/privacy">Privacy Notice</Link> for details about
              handling and retention.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Contact us</h2>
            <p>
              For a booking question, change, cancellation, or concern, contact
              us through one of these channels:
            </p>
            <ul className="terms-contact-list">
              <li><a href="tel:+254798873024">Call: 0798873024</a></li>
              <li><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp: 0798873024</a></li>
              <li><a href={`mailto:${emailAddress}`}>{emailAddress}</a></li>
            </ul>
          </section>

          <aside className="terms-review-note terms-final-note" role="note">
            <strong>Before these terms go live</strong>
            <p>
              Confirm nearby-area coverage, how charges are calculated,
              cancellation/refund handling, and any service exclusions.
              Consider having the final terms reviewed for applicable Kenyan
              requirements.
            </p>
          </aside>
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
        <span className="terms-footer-links">
          <Link href="/privacy">Privacy Notice</Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <span aria-hidden="true">·</span>
          Nairobi and nearby areas · Mon–Sat, 9:30am–7:00pm
        </span>
      </footer>
    </>
  );
}
