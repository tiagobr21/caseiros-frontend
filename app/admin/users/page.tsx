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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 
    

  const loadUsers = async () => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_URL_BACK}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

   const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentUsers = users.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const totalPages = Math.ceil(users.length / itemsPerPage);


  return (
    <div className="p-4">
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
            {currentUsers.map((u) => (
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

        <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>

            <div style={{textAlign:'center'}} className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={`px-3 py-1 rounded-lg border 
                  ${currentPage === 1 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-white hover:bg-gray-100"}`}
              >
                Anterior
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={`px-3 py-1 rounded-lg border 
                  ${currentPage === totalPages 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-white hover:bg-gray-100"}`}
              >
                Próxima
              </button>
            </div>
          </div>
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
