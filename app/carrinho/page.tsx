"use client";
import { useCarrinho } from "@/context/CarrinhoContext";
import { FiShoppingCart } from "react-icons/fi";
import "./style.css"


export default function CarrinhoPage() {
  const context = useCarrinho();
  const carrinhoCount = context?.carrinho ?? [];
  const { carrinho, removerItem, limparCarrinho } = useCarrinho();
  const total = carrinho.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {carrinho.length > 0 && (
        <span className="cartCount absolute bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {carrinhoCount.length}
        </span>
      )}
      <h2 className="text-2xl font-bold text-green-800 mb-6" style={{ display: 'flex', alignItems: 'center' }}>Seu Carrinho <FiShoppingCart size={20} style={{ marginLeft: 5 }} /></h2>

      {carrinho.length === 0 ? (
        <p className="text-gray-600">Você ainda não adicionou itens à sua cesta.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrinho.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
                <span>{item.name}</span>
                <span className="font-bold text-green-700">R$ {item.price.toFixed(2)}</span>
                <button onClick={() => removerItem(item.id)} className="text-red-500 hover:text-red-700">Remover</button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <strong>Total:</strong>
            <span className="font-bold text-green-800 text-lg">R$ {total.toFixed(2)}</span>
          </div>

          <button
            onClick={limparCarrinho}
            className="mt-6 bg-green-700 text-white w-full py-3 rounded-xl hover:bg-green-800"
          >
            Prosseguir com a Compra
          </button>
        </>
      )}
    </div>
  );
}
