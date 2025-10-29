import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/header/page";
import Footer from "@/components/Footer";
import { CarrinhoProvider } from "@/context/CarrinhoContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Caseiros | Cestas Regionais",
  description: "Monte sua cesta com o sabor do sítio 🍅",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
   
      <body className={`${roboto.className} bg-gray-50 text-gray-800 flex flex-col min-h-screen`}>
        <CarrinhoProvider>
          <Header />

          <main className="flex-grow">{children}</main>
          <Footer />
        </CarrinhoProvider>
      </body>
    </html>
  );
}