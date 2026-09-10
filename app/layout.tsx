import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAELIS ESTATES — Private Architectural Worlds",
  description:
    "CAELIS ESTATES designs impossible villas, towers, and private worlds for those who have seen everything and still expect to be moved. Luxury is not decoration — it is precision made emotional.",
  keywords: [
    "luxury architecture",
    "private villas",
    "luxury towers",
    "bespoke estates",
    "architectural design",
    "CAELIS ESTATES",
    "Caelis",
    "luxury real estate",
    "private worlds",
  ],
  authors: [{ name: "CAELIS ESTATES" }],
  openGraph: {
    title: "CAELIS ESTATES — Private Architectural Worlds",
    description:
      "Some structures are built. Others are summoned. CAELIS ESTATES shapes impossible private worlds suspended beyond expectation.",
    type: "website",
    locale: "en_US",
    siteName: "CAELIS ESTATES",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAELIS ESTATES — Private Architectural Worlds",
    description:
      "Some structures are built. Others are summoned. Luxury is precision made emotional.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Inter + Cormorant Garamond */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
