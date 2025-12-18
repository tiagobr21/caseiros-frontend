"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { alertService } from "@/services/alert";
import Alert from "../../../alert/alert";

export default function CreateProductModal({ onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
     
    const products = await api.post(`${process.env.NEXT_PUBLIC_URL_BACK}/products`, {
      ...form,
      price: Number(form.price),
    });
 

    alertService.success("Pedido realizado com Sucesso !!!");
   

     
    if (image) {
  
      const imgData = new FormData();
      imgData.append("file", image);

       const upload = await api.post(`${process.env.NEXT_PUBLIC_URL_BACK}/products/upload_image/${products.data.id}`, imgData, {
        headers: { "Content-Type": "multipart/form-data" },
       });

 
    }

    onSuccess();
    onClose();
  };

  return (
    
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">

  
        <h2 className="text-xl font-bold mb-4">Criar Produto</h2>
      
        <input
          placeholder="Nome"
          className="w-full border p-2 rounded mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Descrição"
          className="w-full border p-2 rounded mb-2"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Preço"
          type="number"
          className="w-full border p-2 rounded mb-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full mb-4"
        />

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2">Cancelar</button>

          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
