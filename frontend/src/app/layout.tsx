// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { Providers } from "./component/auth/AuthProvider";
// Import the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediLink",
  description: "Quickly identify medicines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Providers>
            <Header />
            <main className="flex-grow">{children}</main>
            {/* main should take available space */}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
