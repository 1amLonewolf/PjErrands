import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "P&J's Errands and Deliveries | Nairobi",
  description:
    "Fast, reliable errands and deliveries across Nairobi and nearby areas. Book delivery, shopping, queueing, bill payment, and parcel services with P&J.",
  icons: {
    icon: "/pj-logo.png",
    apple: "/pj-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE">
      <body>{children}</body>
    </html>
  );
}
