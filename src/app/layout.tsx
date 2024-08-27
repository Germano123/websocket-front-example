import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "./organisms/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Example",
  description: "This app is an example of websocket functions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
