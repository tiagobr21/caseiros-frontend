"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import CreateLocationModal from "./models/CreateLocationModel"
import EditLocationModal from "./models/EditLocationModel";
import DeleteLocationModal from "./models/DeleteLocationModel";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function AdminLocations() {
  const [locations, setLocations] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);

  const loadLocations = async () => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_URL_BACK}/delivery/zones`);
    console.log(res.data);
    
    setLocations(res.data);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold text-green-800 mb-4">
        Gerenciar Bairros (Frete)
      </h1>

      <button
        onClick={() => setOpenCreate(true)}
        className="bg-green-700 text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2"
      >
        <IoIosAddCircle size={22} />
        Criar Bairros (Frete)
      </button>

      <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">ID</th>
              <th className="py-2">Preço</th>
              <th className="py-2">Bairro</th>
              <th className="py-2">Ações</th>
            </tr>
          </thead>

          <tbody>
            {locations.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2">{u.id}</td>
                <td className="py-2">{u.price}</td>
                <td className="py-2">{u.neighborhood}</td>
                <td className="py-2 flex gap-3">
                  <button
                    onClick={() => setOpenEdit(u)}
                    className="text-blue-600"
                  >
                    <MdEdit size={20} />
                  </button>

                  <button
                    onClick={() => setOpenDelete(u)}
                    className="text-red-600"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modais */}
      {openCreate && (
        <CreateLocationModal
          onClose={() => setOpenCreate(false)}
          onSuccess={loadLocations}
        />
      )}

      {openEdit && (
        <EditLocationModal
          location={openEdit}
          onClose={() => setOpenEdit(null)}
          onSuccess={loadLocations}
        />
      )}

      {openDelete && (
        <DeleteLocationModal
          location={openDelete}
          onClose={() => setOpenDelete(null)}
          onSuccess={loadLocations}
        />
      )}
    </div>
  );
}
