export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="min-h-screen">
            <div className="py-10 lg:py-20 mx-auto w-[450px]">
                <div className="mt-10">
                    {children}
                </div>
            </div>
        </div>
    </>
  );
}