import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets:["latin"],
});


export const metadata: Metadata = {
  title: "DevDigest",
  description: `A personalized dashboard that pulls GitHub trends, 
  blog articles, YouTube videos, and Reddit posts based on your learning goals.`,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
