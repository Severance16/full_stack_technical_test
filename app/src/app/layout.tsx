import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthContextProvider from "@/context";

const inter = Inter({ subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Taskers",
  description: "Aplicación para la gestion de tareas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-700`}
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
