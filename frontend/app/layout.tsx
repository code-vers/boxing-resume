import type { Metadata } from "next";
import { Inter, Oswald, Bebas_Neue } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { Providers } from "@/providers/app-providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boxing Resume",
  description: "Boxing Resume | World Boxing Database The Complete Boxing Record. Search fighters, explore full bout histories, compare head-to-head stats, and follow live rankings across every weight class.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${oswald.variable} ${bebasNeue.variable} antialiased`}>
      <body className='min-h-full flex flex-col'>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
