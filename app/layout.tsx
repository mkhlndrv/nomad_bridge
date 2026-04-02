import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { NotificationBell } from "./_components/NotificationBell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NomadBridge",
  description: "Connect digital nomads with Thai university communities",
};

const MOCK_USER_ID = "user-alice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-gray-900">
              NomadBridge
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
              <Link href="/forum" className="hover:text-gray-900">Forum</Link>
              <Link href="/events" className="hover:text-gray-900">Events</Link>
              <Link href="/recordings" className="hover:text-gray-900">Recordings</Link>
              <NotificationBell userId={MOCK_USER_ID} />
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
