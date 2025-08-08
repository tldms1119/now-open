import NavBar from "@/components/NavBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" min-h-screen flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}
