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
2. Run `supabase/migrations/20261031000000_create_booking_requests.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the project API settings.
4. Restart the development server after changing environment variables.

Use the project's public anon key only. Do not put a service-role key in the app or expose it to the browser. The migration enables row-level security and grants anonymous visitors insert-only access to booking requests.

If Supabase is not configured or a request cannot be stored, the form reports an error and does not show a success state or WhatsApp follow-up link.

## Booking email notifications

The booking form uses EmailJS after Supabase confirms a request was saved. Set
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`,
`NEXT_PUBLIC_EMAILJS_TEMPLATE_BUSINESS`, and
`NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT` in `.env.local` for local development and
in the Vercel project settings for production. The EmailJS public key is intended
for browser use; never put an EmailJS private key in a `NEXT_PUBLIC_` variable.

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
retained in EmailJS logs longer than needed.

Before deploying this change, apply
`supabase/migrations/20261102000000_add_booking_email.sql` to the configured
Supabase project. Customer email is optional; when provided, it is stored with
the booking and used for the acknowledgement. If an email fails, the booking
remains saved and the page offers WhatsApp follow-up.

## Validation

```powershell
npm.cmd run lint
npm.cmd run build
```

Customer sign-in and additional authentication methods are future scope; Supabase Auth can be configured for those when that feature is planned.
