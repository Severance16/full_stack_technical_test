import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthContextProvider from "@/context";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        className={`${inter.className} bg-gray-800`}
      >
        <AuthContextProvider>
          {children}
          <ToastContainer theme="dark"/>
        </AuthContextProvider>
      </body>
    </html>
  );
}
