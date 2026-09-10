import { Container, Footer, Header } from "@/components/layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Container className="flex flex-1 flex-col py-10">{children}</Container>
      <Footer />
      {/* Chat popup mounts here later: features/chat */}
    </>
  );
}
