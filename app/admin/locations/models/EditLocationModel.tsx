"use client";

import { useState } from "react";
import { api } from "@/services/api";

export default function EditLocationModal({ location, onClose, onSuccess }: any) {
  
  const [form, setForm] = useState({
    price: location.price,
    neighborhood: location.neighborhood,
  });

  const submit = async () => {
    const payload: any = {
      price: form.price,
      neighborhood: form.neighborhood,
    };

    await api.put(`${process.env.NEXT_PUBLIC_URL_BACK}/delivery/zones/${location.id}`, payload);

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Editar Bairro (Frete)</h2>

        <input
          className="border p-2 rounded w-full mb-2"
          value={form.price}
          placeholder="Preço"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full mb-2"
          value={form.neighborhood}
          placeholder="Bairro"
          onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
        />
      
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>
          <button
            onClick={submit}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}
