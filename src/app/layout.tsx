import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AnimationProvider } from "@/components/AnimationProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Matias Franco",
  description: "Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AnimationProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
        >
          <Header />
          {children}
          <ToastContainer limit={1} autoClose={1000} />
        </body>
      </AnimationProvider>
    </html>
  );
}
