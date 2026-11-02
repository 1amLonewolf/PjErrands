import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { serviceNames } from "@/lib/services";

export const maxDuration = 30;

const services = new Set<string>(Object.values(serviceNames));
const requestTimeout = 8000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isWithinLength(value: string, maximum: number): boolean {
  return value.length <= maximum;
}

function getClientIp(request: Request): string | null {
  const forwardedFor =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return null;
  }

  return (
    forwardedFor
      .split(",")
      .reverse()
      .map((address) => address.trim())
      .find((address) => isIP(address) !== 0) ?? null
  );
}

async function sendEmail(
  serviceId: string,
  templateId: string,
  publicKey: string,
  privateKey: string,
  templateParams: Record<string, string>,
): Promise<boolean> {
  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`EmailJS notification failed with status ${response.status}.`);
    }

    return response.ok;
  } catch (error) {
    console.error("EmailJS notification request failed.", error);
    return false;
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 5000) {
    return NextResponse.json({ message: "Your request is too large." }, { status: 413 });
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > 5000) {
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
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const rateLimitSecret = process.env.BOOKING_RATE_LIMIT_SECRET;
  const clientIp =
    getClientIp(request) ??
    (process.env.NODE_ENV === "development" ? "127.0.0.1" : null);
  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    !rateLimitSecret ||
    rateLimitSecret.length < 32 ||
    !clientIp
  ) {
    console.error("Booking API server configuration is incomplete.");
    return NextResponse.json(
      { message: "Booking is not configured yet. Please contact us directly on WhatsApp." },
      { status: 503 },
    );
  }

  let supabaseEndpoint: URL;
  try {
    supabaseEndpoint = new URL(supabaseUrl);
  } catch {
    console.error("The configured Supabase URL is invalid.");
    return NextResponse.json(
      { message: "We couldn’t save your request. Please contact us on WhatsApp." },
      { status: 503 },
    );
  }

  const supabaseHeaders = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
  const ipHash = createHmac("sha256", rateLimitSecret).update(clientIp).digest("hex");
  const rateLimitEndpoint = new URL("/rest/v1/rpc/consume_booking_rate_limit", supabaseEndpoint);

  try {
    const rateLimitResponse = await fetch(rateLimitEndpoint, {
      method: "POST",
      headers: supabaseHeaders,
      body: JSON.stringify({ p_ip_hash: ipHash }),
      cache: "no-store",
      signal: AbortSignal.timeout(requestTimeout),
    });

    if (!rateLimitResponse.ok) {
      console.error(`Booking rate limit check failed with status ${rateLimitResponse.status}.`);
      return NextResponse.json(
        { message: "We couldn’t process your request right now. Please try again later." },
        { status: 503 },
      );
    }

    const allowed = (await rateLimitResponse.json()) as unknown;
    if (allowed !== true) {
      return NextResponse.json(
        { message: "You’ve reached the booking limit. Please wait 10 minutes and try again." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }
  } catch (error) {
    console.error("Booking rate limit request failed.", error);
    return NextResponse.json(
      { message: "We couldn’t process your request right now. Please try again later." },
      { status: 503 },
    );
  }

  const bookingEndpoint = new URL("/rest/v1/booking_requests", supabaseEndpoint);
  try {
    const response = await fetch(bookingEndpoint, {
      method: "POST",
      headers: { ...supabaseHeaders, Prefer: "return=minimal" },
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
      signal: AbortSignal.timeout(requestTimeout),
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

  const emailConfig = {
    serviceId: process.env.EMAILJS_SERVICE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
    businessTemplateId: process.env.EMAILJS_TEMPLATE_BUSINESS,
    customerTemplateId: process.env.EMAILJS_TEMPLATE_CLIENT,
  };
  let notificationFailed = false;

  if (
    !emailConfig.serviceId ||
    !emailConfig.publicKey ||
    !emailConfig.privateKey ||
    !emailConfig.businessTemplateId ||
    !emailConfig.customerTemplateId
  ) {
    console.error("EmailJS booking notification settings are incomplete.");
    notificationFailed = true;
  } else {
    const bookingTime = preferredTime
      ? preferredTime.toLocaleString("en-KE")
      : "Not specified";
    const instructions = [
      pickupLocation && `Pickup location: ${pickupLocation}`,
      dropoffLocation && `Drop-off location: ${dropoffLocation}`,
      shoppingList && `Shopping list: ${shoppingList}`,
      budgetInput && `Shopping budget: KES ${budgetInput}`,
      officeName && `Bank/office: ${officeName}`,
      billDetails && `Bill details: ${billDetails}`,
      parcelDetails && `Parcel: ${parcelDetails}`,
      details && `Additional details: ${details}`,
    ]
      .filter(Boolean)
      .join("\n");
    const templateParams: Record<string, string> = {
      from_name: fullName,
      from_email: email,
      phone,
      service,
      booking_time: bookingTime,
      instructions: instructions || "No additional instructions provided.",
      to_email: email,
      customer_name: fullName,
      customer_phone: phone,
      customer_email: email,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      shopping_list: shoppingList,
      budget_kes: budgetInput,
      office_name: officeName,
      bill_details: billDetails,
      parcel_details: parcelDetails,
      preferred_time: preferredTimeInput,
      details,
    };

    const businessEmailSent = await sendEmail(
      emailConfig.serviceId,
      emailConfig.businessTemplateId,
      emailConfig.publicKey,
      emailConfig.privateKey,
      templateParams,
    );
    notificationFailed = !businessEmailSent;

    if (email) {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      const customerEmailSent = await sendEmail(
        emailConfig.serviceId,
        emailConfig.customerTemplateId,
        emailConfig.publicKey,
        emailConfig.privateKey,
        templateParams,
      );
      notificationFailed ||= !customerEmailSent;
    }
  }

  return NextResponse.json({ ok: true, notificationFailed }, { status: 201 });
}
