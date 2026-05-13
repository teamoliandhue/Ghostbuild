import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Globalnex International · A seat at a world-class university in 14 weeks",
  description:
    "Kerala-grown study abroad consultancy. 75+ students placed across UK, US, Australia, Ireland, Finland, Germany and France. 94% visa approval, first-time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={heebo.variable}>
      <body>{children}</body>
    </html>
  );
}
