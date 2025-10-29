"use client";
import { createContext, useContext, useState } from "react";

interface CarrinhoContextType {
  carrinho: any[];
  adicionarItem: (produto: any) => void;
  removerItem: (id: number) => void;
  limparCarrinho: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  
  const [carrinho, setCarrinho] = useState<any[]>([]);

  const adicionarItem = (produto: any) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerItem = (id: number) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarItem, removerItem, limparCarrinho }}>
          {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho must be used within a CarrinhoProvider");
  }
  return context;
};
