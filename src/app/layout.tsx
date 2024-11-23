import type { Metadata } from "next";
import { Roboto, Lexend_Deca, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-lexend-deca",
});

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
      <body
        className={`${roboto.variable} ${lexendDeca.variable} ${pacifico.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
