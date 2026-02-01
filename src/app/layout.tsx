import type { Metadata } from "next";
import { Fredoka, VT323 } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import DeviceFrame from "@/components/layout/DeviceFrame";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-plastic",
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pairnest — Galaxy Plastic",
  description: "A glossy, gamified two-person space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${vt323.variable} antialiased flex min-h-screen items-center justify-center bg-[#1a0526] bg-[url('/assets/galaxy-grid.jpg')] bg-cover bg-center`}
      >
        <ClientProviders>
          <DeviceFrame>{children}</DeviceFrame>
        </ClientProviders>
      </body>
    </html>
  );
}
