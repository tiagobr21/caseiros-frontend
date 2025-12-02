"use client";

import { useState } from "react";
import { api } from "@/services/api";

export default function EditProductModal({ product, onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
  });

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {

    if (image) {
      const img = new FormData();
      img.append("file", image);

       await api.post(`/products/upload_image/${form.id}` , img, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    await api.put(`/products/${product.id}`, {
      ...form,
      price: Number(form.price),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

        <input
          className="w-full border p-2 rounded mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded mb-2"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          className="w-full border p-2 rounded mb-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <label className="block text-sm font-semibold">Imagem:</label>
        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <div className="flex justify-end space-x-3">
          <button onClick={onClose}>Cancelar</button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
