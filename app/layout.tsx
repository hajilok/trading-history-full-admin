import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "The Editorial Ledger",
  description: "A premium editorial trading history interface for modern portfolio storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable}`}>
        <Script id="material-symbols-setup" strategy="afterInteractive">
          {`document.documentElement.classList.add("material-symbols-ready");`}
        </Script>
        <div className="editorial-shell flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
