import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";

const font = Red_Hat_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Listing",
  description: "Product Listing App built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-rose-50`}>{children}</body>
    </html>
  );
}
