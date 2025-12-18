"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import CreateUserModal from "./models/CreateUserModel"
import EditUserModal from "./models/EditUserModal";
import DeleteUserModal from "./models/DeleteUserModal";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);

  const loadUsers = async () => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_URL_BACK}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Gerenciar Usuários
      </h1>

      <button
        onClick={() => setOpenCreate(true)}
        className="bg-green-700 text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2"
      >
        <IoIosAddCircle size={22} />
        Criar Usuário
      </button>

      <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">ID</th>
              <th className="py-2">Nome</th>
              <th className="py-2">Email</th>
              {/* <th className="py-2">Perfil</th> */}
              <th className="py-2">Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2">{u.id}</td>
                <td className="py-2">{u.name}</td>
                <td className="py-2">{u.email}</td>
                {/* <td className="py-2 capitalize">{u.role}</td> */}
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
        <CreateUserModal
          onClose={() => setOpenCreate(false)}
          onSuccess={loadUsers}
        />
      )}

      {openEdit && (
        <EditUserModal
          user={openEdit}
          onClose={() => setOpenEdit(null)}
          onSuccess={loadUsers}
        />
      )}

      {openDelete && (
        <DeleteUserModal
          user={openDelete}
          onClose={() => setOpenDelete(null)}
          onSuccess={loadUsers}
        />
      )}
    </div>
  );
}
