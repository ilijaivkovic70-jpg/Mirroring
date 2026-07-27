import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AuthStatus } from "@/components/auth-status";
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
  title: "Mirroring",
  description: "Anoniman, konstruktivan fidbek unutar tvoje grupe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[url('/pozadina.jpg')] bg-cover bg-center bg-no-repeat text-foreground">
        <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
          <div className="mx-auto flex min-h-14 max-w-2xl flex-wrap items-center gap-x-2 gap-y-1.5 px-4 py-2">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <Image
                src="/logo.png"
                alt="Mirroring"
                width={120}
                height={45}
                priority
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold tracking-tight">
                Mirroring
              </span>
            </Link>
            <AuthStatus />
          </div>
        </header>
        <main className="mx-auto my-4 w-[calc(100%-1.5rem)] max-w-2xl flex-1 rounded-2xl bg-background/92 shadow-sm backdrop-blur-md sm:my-8 sm:w-[calc(100%-3rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
