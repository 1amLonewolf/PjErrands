"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";
import { serviceNames } from "@/lib/services";

const services = [
  {
    number: "01",
    icon: "/service-delivery.png",
    title: serviceNames.delivery,
    description: "Door-to-door delivery for documents, packages, and everyday essentials.",
  },
  {
    number: "02",
    icon: "/service-shopping.png",
    title: serviceNames.shopping,
    description: "Share your list and budget. We’ll shop while you get on with your day.",
  },
  {
    number: "03",
    icon: "/service-queueing.png",
    title: serviceNames.queueing,
    description: "We can queue and handle bill payments at banks, offices, and more.",
  },
  {
    number: "04",
    icon: "/service-parcel.png",
    title: serviceNames.parcel,
    description: "Have a parcel collected and delivered safely across Nairobi and nearby areas.",
  },
];

const phoneNumber = "0798873024";
const whatsappNumber = "254798873024";
const emailAddress = "bahatishalyn52@gmail.com";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [selectedService, setSelectedService] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const needsLocations =
    selectedService === serviceNames.delivery || selectedService === serviceNames.parcel;
  const isShopping = selectedService === serviceNames.shopping;
  const isQueueing = selectedService === serviceNames.queueing;
  const isDelivery = selectedService === serviceNames.delivery;
  const isParcel = selectedService === serviceNames.parcel;

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setErrorMessage("");
    setWhatsappUrl("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const preferredTimeInput = String(formData.get("preferredTime") ?? "");
    const parsedPreferredTime = preferredTimeInput ? new Date(preferredTimeInput) : null;
    const booking = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      pickupLocation: String(formData.get("pickupLocation") ?? ""),
      dropoffLocation: String(formData.get("dropoffLocation") ?? ""),
      preferredTime:
        parsedPreferredTime && !Number.isNaN(parsedPreferredTime.getTime())
          ? parsedPreferredTime.toISOString()
          : "",
      shoppingList: String(formData.get("shoppingList") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      officeName: String(formData.get("officeName") ?? ""),
      billDetails: String(formData.get("billDetails") ?? ""),
      parcelDetails: String(formData.get("parcelDetails") ?? ""),
      details: String(formData.get("details") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "We couldn’t save your request. Please try again.");
      }

      const message = [
        "Hello P&J's Errands and Deliveries, I'd like to request an errand.",
        `Name: ${booking.fullName}`,
        `Phone: ${booking.phone}`,
        `Service: ${booking.service}`,
        booking.pickupLocation && `Pickup: ${booking.pickupLocation}`,
        booking.dropoffLocation && `Drop-off: ${booking.dropoffLocation}`,
        booking.shoppingList && `Shopping list: ${booking.shoppingList}`,
        booking.budget && `Shopping budget: KES ${booking.budget}`,
        booking.officeName && `Bank/office: ${booking.officeName}`,
        booking.billDetails && `Bill details: ${booking.billDetails}`,
        booking.parcelDetails && `Parcel: ${booking.parcelDetails}`,
        booking.preferredTime &&
          `Preferred time: ${new Date(booking.preferredTime).toLocaleString("en-KE")}`,
        booking.details && `Additional details: ${booking.details}`,
      ]
        .filter(Boolean)
        .join("\n");

      setWhatsappUrl(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      );
      setSubmissionState("success");
      form.reset();
      setSelectedService("");
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t save your request. Please try again.",
      );
    }
  }

  function chooseService(service: string) {
    setSelectedService(service);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="P&J's Errands and Deliveries home">
          <Image
            alt=""
            className="brand-mark"
            height={500}
            src="/pj-logo.png"
            width={500}
          />
          <span className="brand-name">
            P&J&apos;s <strong>Errands & Deliveries</strong>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#how-it-works">How it works</a>
          <a href="#faq">FAQs</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="button button-small button-orange header-cta" href="#book">
          Book an errand <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> YOUR DAY, MADE EASIER</p>
              <h1>We handle the errands. <span>You keep your day.</span></h1>
              <p className="hero-description">
                From a quick delivery to the weekly shop, count on a helping hand
                across Nairobi and nearby areas.
              </p>
              <div className="hero-actions">
                <a className="button button-orange" href="#book">
                  Book an errand <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="button button-outline"
                  href={`https://wa.me/${whatsappNumber}`}
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
                  Chat on WhatsApp
                </a>
              </div>
              <div className="hero-note">
                <span className="availability-dot" />
                Nairobi and nearby areas <span className="note-divider">·</span> Mon–Sat, 9:30am–7pm
              </div>
            </div>
            <figure className="hero-visual">
              <div className="hero-photo-frame">
                <Image
                  alt="A customer welcomes a delivery worker at her door"
                  className="hero-photo"
                  height={400}
                  preload
                  sizes="(max-width: 760px) 86vw, (max-width: 1050px) 42vw, 500px"
                  src="/pj-delivery.webp"
                  width={600}
                />
              </div>
              <figcaption className="hero-photo-caption">
                <span aria-hidden="true" />
                A little help, right at your door
              </figcaption>
            </figure>
          </div>
          <div className="hero-bottom">
            <span>YOUR LOCAL ERRAND PARTNER</span>
            <span>RELIABLE HELP, RIGHT WHEN YOU NEED IT <b>↓</b></span>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-intro">
            <p className="eyebrow">A LITTLE ABOUT US</p>
            <h2>A helping hand for <span>everyday life.</span></h2>
          </div>
          <div className="about-copy">
            <p>
              P&J&apos;s Errands and Deliveries is a Nairobi-based service for
              people who need a little more time in their day. From deliveries
              and shopping to queues, bill payments, and parcel drop-offs, we
              help take everyday tasks off your list.
            </p>
            <p>
              We serve Nairobi and nearby areas, Monday to Saturday, from
              9:30am to 7:00pm. Every request is discussed with you so we can
              confirm the details before the errand begins.
            </p>
            <a className="text-link about-link" href="#services">
              Explore our services <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="about-facts" aria-label="Business information">
            <div className="about-fact">
              <span className="about-fact-icon" aria-hidden="true">⌖</span>
              <span><small>WHERE WE WORK</small><strong>Nairobi & nearby areas</strong></span>
            </div>
            <div className="about-fact">
              <span className="about-fact-icon" aria-hidden="true">◷</span>
              <span><small>WHEN WE’RE AVAILABLE</small><strong>Mon–Sat, 9:30am–7:00pm</strong></span>
            </div>
            <div className="about-fact">
              <span className="about-fact-icon" aria-hidden="true">◎</span>
              <span><small>HOW TO REACH US</small><strong>Call or WhatsApp 0798873024</strong></span>
            </div>
          </div>
        </section>

        <section className="services-section section-wrap" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HOW WE CAN HELP</p>
              <h2>More time for <span>what matters.</span></h2>
            </div>
            <p className="section-intro">
              Tell us what needs doing. We’ll take it from here—with care, and
              without the extra running around.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-icon">
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="service-icon-image"
                      height={30}
                      src={service.icon}
                      width={30}
                    />
                  </span>
                  <span className="service-number">{service.number}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button
                  className="text-link"
                  onClick={() => chooseService(service.title)}
                  type="button"
                >
                  Request this service <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-wrap how-inner">
            <div className="how-heading">
              <p className="eyebrow eyebrow-light">SIMPLE FROM THE START</p>
              <h2>Three steps.<br /><span>One less thing to do.</span></h2>
              <p>Easy to request, easy to follow up. We’ll keep you in the loop.</p>
            </div>
            <div className="steps">
              <article className="step">
                <span className="step-number">01</span>
                <span className="step-icon" aria-hidden="true">↗</span>
                <h3>Tell us what you need</h3>
                <p>Share a few details in our short booking form.</p>
              </article>
              <article className="step">
                <span className="step-number">02</span>
                <span className="step-icon" aria-hidden="true">◎</span>
                <h3>We’ll get in touch</h3>
                <p>Your request is saved. Continue the conversation on WhatsApp.</p>
              </article>
              <article className="step">
                <span className="step-number">03</span>
                <span className="step-icon" aria-hidden="true">✓</span>
                <h3>We take it from here</h3>
                <p>We confirm the details and get your errand moving.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-wrap faq-inner">
            <div className="faq-heading">
              <p className="eyebrow">GOOD TO KNOW</p>
              <h2>A few helpful <span>answers.</span></h2>
              <p>Still have a question? Give us a call or send us a WhatsApp message.</p>
              <a className="text-link" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
                Ask us on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What areas do you serve?</summary>
                <p>We serve Nairobi and nearby areas. Contact us with your locations and we’ll confirm whether we can help.</p>
              </details>
              <details className="faq-item">
                <summary>When are you open?</summary>
                <p>Our listed business hours are Monday to Saturday, 9:30am–7:00pm. We’re closed on Sundays.</p>
              </details>
              <details className="faq-item">
                <summary>How do I request an errand?</summary>
                <p>Send a request using the booking form, or contact us directly on 0798873024 by phone or WhatsApp. You can also email bahatishalyn52@gmail.com. Share the service and relevant details so we can discuss and confirm your request.</p>
              </details>
              <details className="faq-item">
                <summary>Is my booking confirmed when I submit a request?</summary>
                <p>No. A request is not a confirmed booking until P&J has contacted you and agreed the service details, availability, and any applicable charges.</p>
              </details>
              <details className="faq-item">
                <summary>How much does a service cost, and how do I pay?</summary>
                <p>Charges depend on the request. P&J will discuss applicable charges and payment arrangements with you before confirming the errand. This website does not currently take online payments.</p>
              </details>
              <details className="faq-item">
                <summary>Can I change or cancel a request?</summary>
                <p>Contact us as soon as possible by phone or WhatsApp. We’ll confirm whether a change is possible and discuss any costs that may already have been incurred.</p>
              </details>
              <details className="faq-item">
                <summary>What information should I include?</summary>
                <p>Include the locations and task details relevant to your service. For security, never share an M-Pesa PIN, bank PIN, password, or other sign-in credential in a request.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="booking-section section-wrap" id="book">
          <div className="booking-copy">
            <p className="eyebrow">LET’S GET IT DONE</p>
            <h2>Your next errand<br /><span>starts here.</span></h2>
            <p>
              Send us the details and we’ll be in touch to confirm. No payment
              is taken online.
            </p>
            <div className="booking-trust">
              <span className="trust-check">✓</span>
              <span><strong>Quick to request</strong><small>A few details is all we need.</small></span>
            </div>
            <div className="booking-trust">
              <span className="trust-check">✓</span>
              <span><strong>Personal follow-up</strong><small>We’ll confirm your request on WhatsApp.</small></span>
            </div>
          </div>
          <div className="booking-panel">
            {submissionState === "success" ? (
              <div className="form-feedback success-feedback" role="status">
                <span className="feedback-icon">✓</span>
                <p className="eyebrow">REQUEST RECEIVED</p>
                <h3>Thanks for reaching out.</h3>
                <p>Your request has been saved. Continue on WhatsApp so we can confirm the details.</p>
                <a
                  className="button button-orange button-full"
                  href={whatsappUrl}
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
                  Continue on WhatsApp <span aria-hidden="true">↗</span>
                </a>
                <button className="text-link new-request" onClick={() => setSubmissionState("idle")} type="button">
                  Send another request
                </button>
              </div>
            ) : (
              <>
                <div className="form-heading">
                  <div>
                    <p className="eyebrow">BOOKING REQUEST</p>
                    <h3>What can we help with?</h3>
                  </div>
                  <span className="form-step">01 <i>/ 01</i></span>
                </div>
                <form className="booking-form" onSubmit={submitBooking}>
                  <div className="form-row">
                    <label>
                      Your name <span className="required-mark">*</span>
                      <input name="fullName" autoComplete="name" maxLength={100} placeholder="e.g. Amina Wanjiku" required />
                    </label>
                    <label>
                      Phone number <span className="required-mark">*</span>
                      <input name="phone" type="tel" autoComplete="tel" maxLength={20} placeholder="e.g. 0712 345 678" required />
                    </label>
                  </div>
                  <label>
                    Service needed <span className="required-mark">*</span>
                    <select
                      name="service"
                      onChange={(event) => setSelectedService(event.target.value)}
                      required
                      value={selectedService}
                    >
                      <option value="" disabled>Choose a service</option>
                      {services.map((service) => (
                        <option key={service.number} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </label>
                  {needsLocations && (
                    <div className="form-row">
                      <label>
                        Pickup location <span className="required-mark">*</span>
                        <input name="pickupLocation" autoComplete="street-address" maxLength={200} placeholder="Area or address" required />
                      </label>
                      <label>
                        Drop-off location <span className="required-mark">*</span>
                        <input name="dropoffLocation" maxLength={200} placeholder="Area or address" required />
                      </label>
                    </div>
                  )}
                  {isShopping && (
                    <>
                      <label>
                        Shopping list <span className="required-mark">*</span>
                        <textarea name="shoppingList" maxLength={1500} placeholder="List the items you need" required rows={3} />
                      </label>
                      <label>
                        Shopping budget (KES)
                        <input name="budget" type="number" min="0" max="999999999" step="0.01" placeholder="Optional" />
                      </label>
                    </>
                  )}
                  {isQueueing && (
                    <>
                      <label>
                        Bank, office, or service location <span className="required-mark">*</span>
                        <input name="officeName" maxLength={150} placeholder="Where should we go?" required />
                      </label>
                      <label>
                        Bill or account reference details <span className="required-mark">*</span>
                        <textarea name="billDetails" maxLength={1200} placeholder="Share the bill details needed to complete the task. Never include a PIN or password." required rows={3} />
                      </label>
                    </>
                  )}
                  {isParcel && (
                    <label>
                      Parcel description and approximate dimensions <span className="required-mark">*</span>
                      <textarea name="parcelDetails" maxLength={1000} placeholder="Describe the parcel and its approximate size" required rows={2} />
                    </label>
                  )}
                  <label>
                    Preferred date & time
                    <input name="preferredTime" type="datetime-local" />
                  </label>
                  <label>
                    {isDelivery ? "Item or delivery details" : "Additional instructions"}
                    {isDelivery && <span className="required-mark"> *</span>}
                    <textarea
                      name="details"
                      maxLength={1500}
                      placeholder={isDelivery ? "What are we collecting or delivering?" : "Anything else we should know? (optional)"}
                      required={isDelivery}
                      rows={3}
                    />
                  </label>
                  <label className="honeypot" aria-hidden="true">
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                  <label className="consent-label">
                    <input name="consent" type="checkbox" required />
                    <span>
                      I agree that P&J can use these details to respond to my booking request.
                    </span>
                  </label>
                  {submissionState === "error" && (
                    <p className="form-error" role="alert">{errorMessage}</p>
                  )}
                  <button
                    className="button button-orange button-full"
                    disabled={submissionState === "submitting"}
                    type="submit"
                  >
                    {submissionState === "submitting" ? "Sending request…" : "Send booking request"}
                    {submissionState !== "submitting" && <span aria-hidden="true">↗</span>}
                  </button>
                  <p className="form-footnote">No online payment. We’ll confirm your request with you directly.</p>
                </form>
              </>
            )}
          </div>
        </section>

        <section className="contact-strip" id="contact">
          <div className="section-wrap contact-inner">
            <div>
              <p className="eyebrow eyebrow-light">HERE WHEN YOU NEED US</p>
              <h2>Let’s make your day<br />a little <span>lighter.</span></h2>
            </div>
            <div className="contact-links">
              <a href={`tel:+${whatsappNumber}`}><Image alt="" aria-hidden="true" className="contact-symbol contact-image-symbol" height={29} src="/call-icon.png" width={29} /><span><small>Give us a call</small><strong>{phoneNumber}</strong></span><b>↗</b></a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><Image alt="" aria-hidden="true" className="contact-symbol whatsapp-contact-icon" height={29} src="/whatsapp-icon.png" width={29} /><span><small>Chat on WhatsApp</small><strong>{phoneNumber}</strong></span><b>↗</b></a>
              <a href={`mailto:${emailAddress}`}><Image alt="" aria-hidden="true" className="contact-symbol contact-image-symbol" height={29} src="/email-icon.png" width={29} /><span><small>Send us an email</small><strong>{emailAddress}</strong></span><b>↗</b></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <Image
            alt=""
            className="brand-mark"
            height={500}
            src="/pj-logo.png"
            width={500}
          />
          <span className="brand-name">P&J&apos;s <strong>Errands & Deliveries</strong></span>
        </a>
        <p>Fast & reliable. We handle your errands so you don&apos;t have to.</p>
        <span className="footer-meta">Nairobi + nearby areas <i>·</i> Mon–Sat, 9:30am–7pm</span>
        <div className="footer-end">
          <a href="/terms">Terms &amp; Conditions</a>
          <span className="copyright">© P&J&apos;s Errands and Deliveries</span>
        </div>
      </footer>

      <nav className="mobile-action-bar" aria-label="Quick contact actions">
        <a className="mobile-call" href={`tel:+${whatsappNumber}`}><Image alt="" aria-hidden="true" className="mobile-contact-icon" height={22} src="/call-icon.png" width={22} /><span>Call</span></a>
        <a className="mobile-whatsapp" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><Image alt="" aria-hidden="true" className="mobile-whatsapp-icon" height={22} src="/whatsapp-icon.png" width={22} /><span>WhatsApp us</span></a>
      </nav>
    </>
  );
}
