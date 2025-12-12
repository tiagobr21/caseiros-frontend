"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Alert from "../alert/alert";
import { useEffect, useState } from "react";
import {  FiX } from "react-icons/fi"; // ÍCONES DO REACT-ICONS
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/admin" },
    { name: "Produtos", href: "/admin/products" },
    { name: "Pedidos", href: "/admin/orders" },
    { name: "Usuários", href: "/admin/users" },
  ];

  const verifyAuth = async () => { 
    let token = localStorage.getItem("token");
  
    const res = await api.get(`${process.env.NEXT_PUBLIC_URL_BACK}/auth/validate-token/${token}`);

    if (res.data.statusCode === 401) { 
        router.push("/login");
        return false;
    }
    
  }

  useEffect(() => {
    
    verifyAuth();

  })

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== BOTÃO HAMBÚRGUER - MOBILE ===== */}
      <button
        className="lg:hidden fixed top-25 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpenMenu(true)}
      >
        <HiOutlineMenuAlt2 size={24} />
      </button>

      {/* ===== OVERLAY MOBILE ===== */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <nav
        className={`
          fixed lg:static z-50
          bg-white shadow-md p-6 space-y-4
          w-64 min-h-full
          transform transition-transform duration-300
          ${openMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* BOTÃO X PARA FECHAR (MOBILE) */}
        <button
          className="lg:hidden mb-4"
          onClick={() => setOpenMenu(false)}
        >
          <FiX size={28} />
        </button>

        <h2 className="text-2xl font-bold text-green-800 mb-6">Painel Admin</h2>

        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-lg ${
              pathname === item.href
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setOpenMenu(false)} // fecha menu no mobile
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <main className="flex-1 p-10 mt-14 lg:mt-0">
        <Alert />
        {children}
      </main>
    </div>
  );
}
