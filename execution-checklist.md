# P&J's Errands and Deliveries — Build Checklist

Use this file to track work from the first MVP release through the full web app. Check an item only when it is complete and verified. Keep decisions that need the business owner's input in the **Open decisions** section until confirmed.

## Project scope

- **MVP:** Mobile-first landing page, service information, service-specific text booking fields (no file uploads), booking requests saved to the backend, and WhatsApp follow-up.
- **Full version:** Secure admin dashboard, order management, notifications, and M-Pesa payments.
- **Brand:** Deep navy `#0B2240`, orange `#F28C28`, and off-white `#F9F8F6`.
- **Service area:** Nairobi, Kenya.

## Open decisions

- [ ] Confirm the four services and descriptions are current.
- [x] Confirm service hours and whether Sunday bookings are accepted — Monday–Saturday, 9:30 AM–7:00 PM; Sunday closed.
- [x] Confirm the business phone/WhatsApp number and email shown on the flyer — 0798873024 and bahatishalyn52@gmail.com.
- [x] Add the supplied P&J logo to the site header, footer, and browser icon.
- [ ] Define which nearby areas are covered before launch.
- [ ] Confirm service pricing, estimates, refunds, and cancellation charges before finalizing customer-facing terms.
- [ ] Confirm any prohibited or unsupported items and task types.
- [ ] Review the draft FAQ and Terms & Conditions; have the terms checked against the business's actual policies and applicable Kenyan requirements.
- [ ] Confirm final privacy notice, data use, retention, and deletion process.
- [ ] Approve the required form details for each service (delivery locations/item, shopping list/budget, bank/office and bill details, parcel description/dimensions).
- [ ] Agree how prices, delivery fees, and customer budgets should be handled.
- [x] Agree whether customers pay on delivery, by manual M-Pesa, or online — no online payment in the MVP; arrange payment manually.
- [x] Confirm MVP booking behavior — save the request on the website, then offer WhatsApp follow-up.
- [ ] Confirm who will have admin access and how they should receive new-order alerts.
- [ ] Before adding customer accounts, decide which sign-in methods are needed (for example email/password, magic link, Google).
- [ ] Choose and register a domain name.

## Phase 1 — Requirements and content

- [x] Confirm MVP scope and defer nonessential full-version features.
- [ ] Confirm the booking process from request submission through job completion.
- [ ] Confirm required booking details for each service with the business owner.
- [ ] Write and approve homepage headline, supporting copy, service descriptions, and calls to action.
- [ ] Approve the business overview and FAQ answers.
- [x] Confirm contact information and business hours.
- [x] Confirm service area — Nairobi and nearby areas.
- [ ] Confirm that the four listed services and descriptions are still current.
- [ ] Gather approved logo, photos, and any customer testimonials.
- [ ] Document privacy requirements for customer names, phone numbers, addresses, and order details.

**Complete when:** The MVP content, contact information, and booking flow are approved by the business owner.

## Phase 2 — UX and visual design

- [ ] Sketch a mobile-first homepage layout.
- [ ] Design the header and navigation.
- [ ] Design the hero section with clear booking and contact actions.
- [ ] Design the four service cards.
- [ ] Design the “Why choose us” and “How it works” sections.
- [ ] Design the booking form and its validation, success, and error states.
- [ ] Design the contact section and footer.
- [ ] Design the mobile call/WhatsApp action bar.
- [ ] Check contrast, readable type sizes, keyboard use, and tap target sizes.
- [x] Review the design at mobile, tablet, and desktop widths.
- [x] Confirm visual direction — keep the clean, premium navy/orange design.

**Complete when:** The business owner approves the page structure and key mobile/desktop layouts.

## Phase 3 — MVP landing page

- [x] Set up the Next.js application with TypeScript and Tailwind in `web`.
- [ ] Confirm the intended Git root and source-control tracking for the app.
- [x] Build the first responsive page draft using the brand colors.
- [x] Add navigation links that move to the correct page sections.
- [x] Add the hero with a clear “Book an Errand” action.
- [x] Replace the illustrative hero artwork with the supplied delivery photo and style it for responsive layouts.
- [ ] Add all four services with accurate descriptions.
- [x] Add the benefits and three-step “How it works” explanation.
- [x] Add an About section with confirmed service area, hours, and contact details.
- [x] Add an FAQ section for coverage, hours, requests, confirmation, payment, cancellations, and information customers should not share.
- [x] Add a standalone Terms & Conditions draft linked from the footer.
- [ ] Business owner to review and approve the About copy, FAQ answers, and Terms & Conditions before launch.
- [x] Build a first-draft booking form.
- [ ] Confirm the booking form fields with the business owner.
- [x] Validate required fields and phone number input; show helpful errors.
- [ ] Connect the form to the booking backend and save requests before showing success.
- [x] After a successful save, offer WhatsApp follow-up with a readable, URL-encoded message.
- [x] Make the WhatsApp action open a chat with the confirmed business number.
- [x] Add click-to-call and email links.
- [x] Display the confirmed service area.
- [x] Add confirmed business hours and contact details.
- [x] Add the mobile action bar and check it does not obscure form controls.
- [x] Add the page title, description, and brand favicon.
- [ ] Add social-sharing metadata after the public domain is selected.
- [x] Add accessible labels, alt text where needed, and visible keyboard focus.
- [x] Test that the WhatsApp message includes submitted details and encodes special characters.
- [x] Check the page at mobile, tablet, and desktop widths.
- [ ] Confirm no contact details or business claims are inaccurate.

**MVP acceptance criteria**

- [ ] A customer can understand the services and how to request one.
- [ ] A customer can submit a request that is saved successfully, then choose WhatsApp follow-up.
- [ ] Call, email, navigation, and WhatsApp links work on supported devices.
- [ ] The page is usable on small screens and with a keyboard.
- [ ] No payment, admin, or notification behavior is implied unless it has been implemented.

## Phase 4 — MVP backend and booking records

- [x] Select the backend/database provider — Supabase; it can support multiple authentication methods for a later account feature.
- [ ] Configure separate development and production environments.
- [x] Define the booking schema, including service-specific details, customer contact, status, and timestamps.
- [x] Define allowed order statuses: pending, in progress, and completed.
- [x] Implement the server-side booking submission endpoint.
- [x] Validate and normalize submitted data on the server.
- [ ] Add protections against spam and abusive submissions.
- [x] Store only the customer information needed to fulfill and manage an order.
- [x] Write a migration with row-level security and anonymous insert-only access.
- [ ] Apply the migration and verify public users cannot read or alter other customers' orders.
- [x] Add clear submission success and failure states.
- [x] Test that missing service-specific fields are rejected and valid requests reach the backend-configuration check.
- [ ] Test persisted valid submissions, malformed requests, and duplicate handling against Supabase.
- [ ] Document data retention and deletion procedures.

**Complete when:** Valid MVP requests are stored reliably and customer/order data is not publicly accessible.

## Phase 5 — Admin dashboard

- [ ] Define admin roles and access requirements.
- [ ] Implement secure admin sign-in and sign-out.
- [ ] Restrict all dashboard and order-management routes to authorized admins.
- [ ] Build an order list with newest requests visible first.
- [ ] Show the customer, service, request details, and submission time for each order.
- [ ] Add order detail view and links to call or message the customer.
- [ ] Add status updates for pending, in progress/dispatched, and completed orders.
- [ ] Add filtering by status and service.
- [ ] Add search for relevant order/customer fields.
- [ ] Show useful loading, empty, and error states.
- [ ] Test that signed-out users cannot access order data or admin actions.
- [ ] Test that order changes persist and are reflected consistently.

**Complete when:** An authorized business user can review and manage orders without exposing customer data.

## Phase 6 — Notifications and customer communication

- [ ] Choose an email or SMS provider and confirm ongoing costs.
- [ ] Notify the business when a new booking is received.
- [ ] Send a customer acknowledgement only after the booking is successfully recorded.
- [ ] Include a safe, minimal order reference in notifications.
- [ ] Avoid sending unnecessary sensitive order details through email or SMS.
- [ ] Add delivery failure logging and a way to identify missed notifications.
- [ ] Test notification delivery in a non-production environment.

**Complete when:** The business can reliably notice new orders and customers receive an accurate acknowledgement.

## Phase 7 — M-Pesa payments

- [ ] Confirm payment timing, refund/cancellation handling, and who resolves payment disputes.
- [ ] Register/configure the required Safaricom Daraja credentials outside source control.
- [ ] Implement STK Push initiation on the server.
- [ ] Validate callback authenticity and match callbacks to the correct order/payment attempt.
- [ ] Store payment amount, status, provider reference, and timestamps.
- [ ] Handle pending, successful, failed, cancelled, and timed-out payments.
- [ ] Prevent duplicate payment processing and avoid trusting the browser as proof of payment.
- [ ] Show payment status in the customer flow and admin dashboard.
- [ ] Test success and failure scenarios using the provider's test environment before production.
- [ ] Document reconciliation and support procedures.

**Complete when:** Payment state is verified server-side and accurately associated with the relevant booking.

## Phase 8 — Quality, privacy, and launch

- [ ] Configure a formatter and automated test suite.
- [ ] Run automated tests for booking and admin flows.
- [x] Run ESLint on application source and complete the production build/type checks.
- [ ] Review the 16 moderate development-dependency advisories; production dependencies currently report none.
- [ ] Test core flows on current mobile and desktop browsers.
- [ ] Test booking form validation, WhatsApp message generation, order storage, and admin permissions.
- [ ] Test slow network, server errors, and notification/payment failures.
- [ ] Check accessibility basics: headings, labels, focus, contrast, and keyboard navigation.
- [ ] Check performance and optimize oversized images and unnecessary scripts.
- [ ] Add a privacy notice explaining what booking data is collected and why.
- [ ] Add and test server-side rate limiting or challenge protection for the public booking endpoint.
- [ ] Verify production environment variables and confirm secrets are not committed.
- [ ] Configure the production domain and HTTPS.
- [ ] Configure backups and a basic recovery procedure for persisted order data.
- [ ] Obtain business-owner sign-off on the production site.
- [ ] Publish the MVP; release full-version features only after their acceptance checks pass.
- [ ] Verify the live site, contact links, and booking flow after deployment.

**Complete when:** The live release passes the agreed acceptance checks and the business owner can receive and act on bookings.

## Phase 9 — After launch

- [ ] Monitor errors, uptime, form submissions, and notification delivery.
- [ ] Ask the business owner and initial customers for feedback.
- [ ] Review which services receive requests and where customers abandon booking.
- [ ] Prioritize improvements based on real usage.
- [ ] Review access permissions, data retention, and backups periodically.
- [ ] Update this checklist with completed items and any newly agreed work.

## Progress log

| Date | Phase/item | Update |
|---|---|---|
| 2026-10-31 | Requirements | Confirmed contact details, business hours, WhatsApp follow-up after booking, and manual payment for MVP. |
| 2026-10-31 | Backend decision | Selected Supabase; multiple sign-in methods are a future requirement, not part of the MVP. |
| 2026-10-31 | MVP first draft | Built the responsive landing page, booking form UI/API, and Supabase migration draft; lint/build and browser layout checks passed. |
| 2026-10-31 | Next dependency | Supabase project is not configured yet, so live booking storage and the real database success path still need credentials and migration verification. |
| 2026-10-31 | Priority change | Paused Supabase setup to refine the landing-page content and form first. |
| 2026-10-31 | Page refinement | Confirmed Nairobi and nearby areas, kept the clean navy/orange direction, and chose service-specific text fields without file uploads. |
| 2026-10-31 | Service forms | Added conditional fields for delivery, shopping, queueing/bill payment, and parcel requests; API validation checks required fields before attempting storage. |
| 2026-10-31 | Form verification | Checked conditional fields for all four services and confirmed WhatsApp messages encode each service’s details. |
| 2026-10-31 | Professional content | Added an About section, seven FAQs, and a standalone Terms & Conditions working draft; owner review remains required. |
| 2026-10-31 | Page hierarchy | Moved About directly below the hero and placed FAQs after How It Works, keeping the established page styling and responsive layout. |
