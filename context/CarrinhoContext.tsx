"use client";
import { createContext, useContext, useState } from "react";
import { CarrinhoItem } from "@/app/interfaces/CarrinhoItem";



interface CarrinhoContextType {
  carrinho: CarrinhoItem[];
  adicionarItem: (produto: CarrinhoItem) => void;
  removerItem: (id: number) => void;
  limparCarrinho: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);

  const adicionarItem = (produto: CarrinhoItem) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.id === produto.id);

      if (existente) {
        // incrementa quantidade
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      // adiciona novo item com quantity = 1
      return [...prev, { ...produto, quantity: 1 }];
    });
  };

  const removerItem = (id: number) => {
    setCarrinho((prev) => {
      const item = prev.find((p) => p.id === id);
      if (!item) return prev;

      if (item.quantity > 1) {
        // diminui quantidade
        return prev.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        );
      }

      // remove item quando quantity chega a 0
      return prev.filter((p) => p.id !== id);
    });
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <CarrinhoContext.Provider 
      value={{ carrinho, adicionarItem, removerItem, limparCarrinho }}
    >
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
