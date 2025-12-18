"use client";

import { useState } from "react";
import { api } from "@/services/api";

export default function EditUserModal({ user, onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    password: "", // NOVO
  });

  const submit = async () => {
    const payload: any = {
      name: form.name,
      email: form.email,
      role: form.role,
    };

    if (form.password && form.password.length >= 6) {
      payload.password = form.password;
    }

    await api.put(`${process.env.NEXT_PUBLIC_URL_BACK}/users/${user.id}`, payload);

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>

        <input
          className="border p-2 rounded w-full mb-2"
          value={form.name}
          placeholder="Nome"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full mb-2"
          value={form.email}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* <select
          className="border p-2 rounded w-full mb-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
        </select> */}

        <input
          type="password"
          className="border p-2 rounded w-full mb-4"
          placeholder="Nova senha (opcional)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
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
