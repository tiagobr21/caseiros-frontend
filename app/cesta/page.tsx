"use client";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useCarrinho } from "@/context/CarrinhoContext";
import { FiSearch } from "react-icons/fi";
import "./style.css"

const ITEMS_PER_PAGE = 8;

export default function MonteSuaCesta() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const { adicionarItem } = useCarrinho();

  useEffect(() => {
     api.get("/products").then((res) => setProdutos(res.data));
  }, []);

  console.log(produtos);
  

  const produtosFiltrados = produtos.filter((p) =>
    p.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = produtosFiltrados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(produtosFiltrados.length / ITEMS_PER_PAGE);

  // Funções para os botões
    const handlePrevPage = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Não deixa ir abaixo de 1
  };

    const handleNextPage = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // Não deixa passar do total
  };

  return (
    <div className="max-w-6xl mx-auto py-5 px-3">
      <h2 className="text-2xl font-bold flex text-green-800 mb-2" >
        Monte sua Cesta 
      </h2>
      
      <FiSearch className="magnifying" size={24}/>
      <input
        type="text"
        value={termoBusca}
        onChange={(e) => {
          setTermoBusca(e.target.value);
          // 5. Reseta para a página 1 a cada nova busca
          setCurrentPage(1);
        }}
        placeholder="Buscar Item..."
        className="w-full p-3 border border-gray-300 rounded-xl mb-4
                   focus:outline-none focus:ring-2 focus:ring-green-700"
                   
      />
    

      <div className="grid md:grid-cols-4 gap-6">
        {/* 4. Mapeia os "currentItems" (itens da página atual) */}
        {currentItems.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-md p-4">
            {/* Pequeno ajuste: usei 'mx-auto' (tailwind) para centralizar a imagem */}
       
            <img
              src={p.image}
              alt={p.name}
              width={200}
              height={200}
              className="rounded-xl mb-3 mx-auto"
            />
            <h3 className="font-semibold text-green-800">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="font-bold text-green-700 mt-2">
              R$ {p.price}
       
              
            </p>
            <button
              onClick={() => adicionarItem(p)}
              className="bg-green-700 text-white w-full mt-3 py-2 rounded-lg hover:bg-green-800"
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>

      {/* 6. Botões de Paginação */}
      {/* Só mostra a paginação se houver mais de 1 página */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800
                       disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <span className="text-gray-700 font-medium">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800
                       disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}