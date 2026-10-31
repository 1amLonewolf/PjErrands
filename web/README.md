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

## Validation

```powershell
npm.cmd run lint
npm.cmd run build
```

Customer sign-in and additional authentication methods are future scope; Supabase Auth can be configured for those when that feature is planned.
