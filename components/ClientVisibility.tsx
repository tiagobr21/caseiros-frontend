"use client";

import Header from "@/components/header/page";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function ClientVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideIn = ["/login", "/admin/login"];

  const shouldHide = hideIn.includes(pathname);

  return (
    <>
      {!shouldHide && <Header />}
      
      {children}
      
      {!shouldHide && <Footer />}
    </>
  );
}
