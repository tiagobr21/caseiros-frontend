"use client";

import { useState } from "react";
import { api } from "@/services/api";

export default function CreateLocationModal({ onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const submit = async () => {
    await api.post(`${process.env.NEXT_PUBLIC_URL_BACK}/delivery/zones`, form);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Criar Usuário</h2>

        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Preço"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Bairro"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />


        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2">
            Cancelar
          </button>
          <button
            onClick={submit}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
