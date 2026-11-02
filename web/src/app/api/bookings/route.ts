import { NextResponse } from "next/server";
import { serviceNames } from "@/lib/services";

const services = new Set<string>(Object.values(serviceNames));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isWithinLength(value: string, maximum: number): boolean {
  return value.length <= maximum;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (rawBody.length > 5000) {
    return NextResponse.json({ message: "Your request is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Please check your request and try again." }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ message: "Please check your request and try again." }, { status: 400 });
  }

  if (getText(payload.website)) {
    return NextResponse.json({ message: "Please check your request and try again." }, { status: 400 });
  }

  const fullName = getText(payload.fullName);
  const phone = getText(payload.phone);
  const email = getText(payload.email);
  const service = getText(payload.service);
  const pickupLocation = getText(payload.pickupLocation);
  const dropoffLocation = getText(payload.dropoffLocation);
  const shoppingList = getText(payload.shoppingList);
  const budgetInput = getText(payload.budget);
  const officeName = getText(payload.officeName);
  const billDetails = getText(payload.billDetails);
  const parcelDetails = getText(payload.parcelDetails);
  const details = getText(payload.details);
  const preferredTimeInput = getText(payload.preferredTime);
  const phoneDigits = phone.replace(/\D/g, "");
  const preferredTime = preferredTimeInput ? new Date(preferredTimeInput) : null;
  const budget = budgetInput ? Number(budgetInput) : null;
  const needsLocations =
    service === serviceNames.delivery || service === serviceNames.parcel;

  if (
    fullName.length < 2 ||
    !isWithinLength(fullName, 100) ||
    !/^[+()\d\s-]+$/.test(phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    (payload.email !== undefined && typeof payload.email !== "string") ||
    email.length > 254 ||
    (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
    !services.has(service) ||
    !isWithinLength(pickupLocation, 200) ||
    !isWithinLength(dropoffLocation, 200) ||
    !isWithinLength(shoppingList, 1500) ||
    !isWithinLength(officeName, 150) ||
    !isWithinLength(billDetails, 1200) ||
    !isWithinLength(parcelDetails, 1000) ||
    !isWithinLength(details, 1500) ||
    (needsLocations && (!pickupLocation || !dropoffLocation)) ||
    (service === serviceNames.delivery && details.length < 3) ||
    (service === serviceNames.shopping && shoppingList.length < 3) ||
    (service === serviceNames.queueing && (officeName.length < 2 || billDetails.length < 3)) ||
    (service === serviceNames.parcel && parcelDetails.length < 3) ||
    (budget !== null && (!Number.isFinite(budget) || budget < 0 || budget > 999999999)) ||
    (preferredTimeInput &&
      (!/(Z|[+-]\d{2}:\d{2})$/i.test(preferredTimeInput) ||
        !preferredTime ||
        Number.isNaN(preferredTime.getTime()))) ||
    payload.consent !== true
  ) {
    return NextResponse.json(
      { message: "Please check the required fields and try again." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { message: "Booking is not configured yet. Please contact us directly on WhatsApp." },
      { status: 503 },
    );
  }

  let endpoint: URL;
  try {
    endpoint = new URL("/rest/v1/booking_requests", supabaseUrl);
  } catch {
    console.error("The configured Supabase URL is invalid.");
    return NextResponse.json(
      { message: "We couldn’t save your request. Please contact us on WhatsApp." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: fullName,
        phone,
        email: email || null,
        service,
        pickup_location: pickupLocation || null,
        dropoff_location: dropoffLocation || null,
        shopping_list: shoppingList || null,
        budget_kes: budget,
        office_name: officeName || null,
        bill_details: billDetails || null,
        parcel_details: parcelDetails || null,
        preferred_time: preferredTime?.toISOString() ?? null,
        details: details || null,
        privacy_acknowledged: true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(`Supabase booking insert failed with status ${response.status}.`);
      return NextResponse.json(
        { message: "We couldn’t save your request. Please try again or contact us on WhatsApp." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Supabase booking request failed.", error);
    return NextResponse.json(
      { message: "We couldn’t reach the booking service. Please try again or contact us on WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
