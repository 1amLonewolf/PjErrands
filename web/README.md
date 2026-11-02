# P&J's Errands and Deliveries

Mobile-first booking site for P&J's Errands and Deliveries in Nairobi.

## Run locally

From this folder:

```powershell
npm.cmd run dev
```

Open `http://localhost:3000`.

## Booking storage setup

The booking form saves requests to Supabase before offering WhatsApp follow-up.
It shows service-specific text fields for locations, shopping lists/budgets,
office and bill references, or parcel details. Shopping-list file uploads are
not part of the MVP; customers should never submit a PIN or password.

1. Create a Supabase project.
2. Run the initial schema migrations in order in the Supabase SQL editor:
   `20261031000000_create_booking_requests.sql`,
   then `20261102000000_add_booking_email.sql`.
3. Copy `.env.example` to `.env.local` and set the server-side values described below.
4. Restart the development server after changing environment variables.

The booking API writes to Supabase with `SUPABASE_SERVICE_ROLE_KEY` from the
project's API settings. It must remain server-only and must never use a
`NEXT_PUBLIC_` prefix. Set
`BOOKING_RATE_LIMIT_SECRET` to a unique random value of at least 32 characters;
generate one with
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
Use a separate value for local development and Vercel. The database stores only
a keyed hash of the client IP and allows five valid booking attempts per
10-minute window.

For a no-downtime production rollout, first configure the server-side Vercel
environment variables and apply
`20261103000000_add_booking_rate_limit.sql`. Deploy this app version and verify
bookings work, then apply `20261104000000_restrict_public_booking_inserts.sql`.
That final migration disables direct anonymous inserts; apply it only after the
server-side booking API is deployed.

If Supabase is not configured or a request cannot be stored, the form reports an error and does not show a success state or WhatsApp follow-up link.

## Booking email notifications

The booking API sends EmailJS notifications only after Supabase confirms that a
request was saved. Set `EMAILJS_SERVICE_ID`, `EMAILJS_PUBLIC_KEY`,
`EMAILJS_PRIVATE_KEY`, `EMAILJS_TEMPLATE_BUSINESS`, and
`EMAILJS_TEMPLATE_CLIENT` in `.env.local` for local development and in the Vercel
project settings for production. Keep all of these server-side; never use a
`NEXT_PUBLIC_` prefix for EmailJS configuration or put the private key in the
browser.

Create two EmailJS templates. Configure the business template to send to the
business inbox. Configure the customer template's recipient as `{{to_email}}`.
Both templates can use `from_name`, `from_email`, `phone`, `service`,
`booking_time`, `instructions`, and `to_email`, as well as
`customer_name`, `customer_phone`, `customer_email`, `pickup_location`,
`dropoff_location`, `shopping_list`, `budget_kes`, `office_name`,
`bill_details`, `parcel_details`, `preferred_time`, and `details`.
The customer template should include only a brief booking acknowledgement and
avoid repeating sensitive request details.
Disable EmailJS email history for these templates so booking details are not
retained in EmailJS logs longer than needed. Email failures do not undo a saved
booking; the success page asks the customer to continue on WhatsApp.

Customer email is optional; when provided, it is stored with the booking and
used for the acknowledgement. If an email fails, the booking remains saved and
the page offers WhatsApp follow-up.

## Validation

```powershell
npm.cmd run lint
npm.cmd run build
```

Customer sign-in and additional authentication methods are future scope; Supabase Auth can be configured for those when that feature is planned.
