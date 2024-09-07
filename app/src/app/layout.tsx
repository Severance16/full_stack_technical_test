import type { Metadata } from "next";
import "./globals.css";
import AuthContextProvider from "@/context";


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
        className={`antialiased`}
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
