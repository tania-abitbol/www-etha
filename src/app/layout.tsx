import type { Metadata } from "next";
import { Roboto, Lexend_Deca } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const lexendDeca = Lexend_Deca({ subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: "Etha Studio",
  description:
    "Etha Studio, le studio de création d'applications mobile de divertissements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={`${lexendDeca.className} ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
