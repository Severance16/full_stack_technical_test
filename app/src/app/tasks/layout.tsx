import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        <section className="max-w-screen-2xl mx-auto mt-4 p-5">
            {children}
        </section>
        <Footer />
    </>
    );
}