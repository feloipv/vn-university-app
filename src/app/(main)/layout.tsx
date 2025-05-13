import Header from "@/components/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="max-w-7xl m-auto">{children}</main>
      <footer className="w-full h-[500px] text-center">footer</footer>
    </>
  );
}
