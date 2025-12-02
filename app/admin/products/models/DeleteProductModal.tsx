"use client";

import { api } from "@/services/api";

export default function DeleteProductModal({ product, onClose, onSuccess }: any) {

  const confirmDelete = async () => {
    await api.delete(`/products/${product.id}`);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[380px]">
        <h2 className="text-xl font-bold mb-4 text-red-700">
          Excluir Produto
        </h2>

        <p className="mb-6">
          Tem certeza que deseja excluir o produto:
          <strong> {product.name}</strong>?
        </p>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose}>Cancelar</button>

          <button
            onClick={confirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
