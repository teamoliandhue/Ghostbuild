import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GlobalNexs International — Study Abroad Consultancy, Kochi",
  description:
    "Kerala's most trusted study abroad consultancy. 92% visa approval rate. 100+ partner universities across UK, Australia, Canada & Europe. Book a free assessment today.",
  keywords: [
    "study abroad consultancy kochi",
    "overseas education kerala",
    "ielts coaching kochi",
    "uk student visa kerala",
    "australia university admission",
  ],
  openGraph: {
    title: "GlobalNexs International",
    description: "Land your seat at the right university, in the right country.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
