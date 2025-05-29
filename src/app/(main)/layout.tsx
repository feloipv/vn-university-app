import Header from "@/components/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="max-w-7xl min-h-screen m-auto">{children}</main>
      <footer className="w-full h-16 mt-10 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] grid place-items-center capitalize">
        phan văn lợi university
      </footer>
    </>
  );
}
