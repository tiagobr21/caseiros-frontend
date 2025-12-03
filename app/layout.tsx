import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/header/page";
import Footer from "@/components/Footer";
import { CarrinhoProvider } from "@/context/CarrinhoContext";
import ClientVisibility from "@/components/ClientVisibility";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Caseiros | Cestas Regionais",
  description: "Monte sua cesta com o sabor do sítio 🍅",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <CarrinhoProvider>
          <ClientVisibility>
            {children}
          </ClientVisibility>
        </CarrinhoProvider>
      </body>
    </html>
  );
}
