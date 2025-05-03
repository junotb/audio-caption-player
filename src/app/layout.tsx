import type { Metadata } from "next";
import { Noto_Sans_KR, Roboto } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audio Caption Player - Audio with Caption Support",
  description: "A module that synchronizes audio playback with VTT subtitle rendering. Displays subtitles in real time based on audio progress. Supports both Next.js and legacy HTML environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansKR.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
