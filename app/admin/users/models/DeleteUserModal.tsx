"use client";

import { api } from "@/services/api";

export default function DeleteUserModal({ user, onClose, onSuccess }: any) {
  const submit = async () => {
    await api.delete(`${process.env.NEXT_PUBLIC_URL_BACK}/users/${user.id}`);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[360px]">
        <h2 className="text-xl font-bold mb-4 text-red-600">
          Excluir Usuário
        </h2>

        <p className="mb-6">
          Tem certeza que deseja excluir <strong>{user.name}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>
          <button
            onClick={submit}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
