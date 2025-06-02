import Footer from "@/components/Footer";
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
      <Footer />
    </>
  );
}
