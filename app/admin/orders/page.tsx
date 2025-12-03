"use client";

import { useEffect, useState } from "react";
import OrderDetailsModal from "./models/OrderDetailsModal";
import { HiOutlineShoppingBag } from "react-icons/hi";
import "./page.css"

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const loadOrders = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

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
            {orders.map((o: any) => (
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
