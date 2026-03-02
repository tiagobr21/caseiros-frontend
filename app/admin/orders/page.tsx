"use client";

import { useEffect, useState } from "react";
import OrderDetailsModal from "./models/OrderDetailsModal";
import { HiOutlineShoppingBag } from "react-icons/hi";
import "./page.css"

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 

  const loadOrders = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/orders`);
    const data = await res.json();
    console.log(data);
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentOrders = orders.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="p-0">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Pedidos</h1>


      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Pedido</th>
              <th className="py-2 text-left">Cliente</th>
              <th className="py-2 text-left">Total</th>
              <th className="py-2 text-left">Detalhes</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.map((o: any) => (
              <tr key={o.id} className="border-b">
                <td className="py-2">{o.id}</td>
                <td className="py-2">{o.customer_name}</td>
                <td className="py-2">R$ {Number(o.total).toFixed(2)}</td>
                <td className="py-2">
                  <button
                    className="text-green-800 hover:underline"
                    onClick={() => setSelectedOrder(o)}
                  >
                    <HiOutlineShoppingBag size={24} className="ml-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

           <div  className="flex justify-between items-center mt-4">
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

      {/* MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
