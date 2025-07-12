import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Kabayan AI",
  description: "Kabayan AI - Your Virtual Assistant",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${poppins.className} ${roboto.className} `}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
