"use client";

import { useEffect, useState } from "react";
import CreateProductModal from "./models/CreateProductModal";
import EditProductModal from "./models/EditProductModal";
import DeleteProductModal from "./models/DeleteProductModal";
import { api } from "@/services/api";
import Alert from "@/app/alert/alert";
import { CiImageOn, CiImageOff } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
      loadProducts();
  }, []);
    
    const viewImage = async (id: number) => { 
        
        console.log(process.env.NEXT_PUBLIC_URL_BACK);
        
        setImagemSelecionada(`${process.env.NEXT_PUBLIC_URL_BACK}/products/image/${id}`);  
    } 
    
     useEffect(() => {
      console.log(imagemSelecionada);
      
  }, [imagemSelecionada]); 
    

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Gerenciar Produtos</h1>
       
          <Alert/>
          
      <button
        onClick={() => setOpenCreate(true)}
        className="bg-green-700 text-white px-4 py-2 rounded-lg mb-4"
      >
        <IoIosAddCircle size={24} />
      </button>

      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">ID</th>
              <th className="py-2 text-left">Nome</th>
              <th className="py-2 text-left">Preço</th>
              <th className="py-2 text-left">Imagem</th>
              <th className="py-2 text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.id}</td>
                <td className="py-2">{p.name}</td>
                <td className="py-2">R$ {Number(p.price).toFixed(2)}</td>
                {p.image ? 
                
                 <td className="py-2"> <button
                    onClick={() => viewImage(p.id)} // << NOVO !!
                    className="text-green-600"
                >
                    <CiImageOn size={24} />
                        </button></td>
                : <td className="py-2"><CiImageOff size={24} /></td>      
               
                 } 
                <td className="py-2">
                  <button
                    onClick={() => setOpenEdit(p)}
                    className="text-blue-600 mr-3"
                  >
                   <MdEdit size={24} />
                  </button>

                  <button
                    onClick={() => setOpenDelete(p)}
                    className="text-red-600"
                  >
                  <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modais */}
      {openCreate && (
        <CreateProductModal
          onClose={() => setOpenCreate(false)}
          onSuccess={loadProducts}
        />
      )}

      {openEdit && (
        <EditProductModal
          product={openEdit}
          onClose={() => setOpenEdit(null)}
          onSuccess={loadProducts}
        />
      )}

      {openDelete && (
        <DeleteProductModal
          product={openDelete}
          onClose={() => setOpenDelete(null)}
          onSuccess={loadProducts}
        />
          )}
          

          {imagemSelecionada && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="relative p-4 max-w-[100%] max-h-[100%]">
                
                    <button
                      onClick={() => setImagemSelecionada(null)}
                      className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full w-10 h-10 text-2xl flex items-center justify-center shadow-lg hover:bg-red-700"
                    >
                      ×
                    </button>

                    <img
                      src={imagemSelecionada}
                      alt="Imagem ampliada"
                      className="rounded-xl max-h-[85vh] mx-auto shadow-2xl"
                    />
                  </div>
                </div>
            )
            }
        
    </div>
  );
}
