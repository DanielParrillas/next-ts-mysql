export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav></nav>
      <div className="bg-gray-100 h-screen p-10">
        <div className="container mx-auto h-full">{children}</div>
      </div>
    </>
  );
}
