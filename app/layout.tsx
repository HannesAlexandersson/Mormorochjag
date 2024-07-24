import type { Metadata } from "next";
import { Rowdies } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const rowdies = Rowdies({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Mormor och jag",
  description: "Generated by Hannes Alexandersson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rowdies.className}>
        <Navbar />
        {children}
      </body>
      
    </html>
  );
}
