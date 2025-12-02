"use client";

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await fetch("http://localhost:4000/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 mb-6">Pedidos</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Pedido</th>
              <th className="py-2 text-left">Cliente</th>
              <th className="py-2 text-left">Total</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="border-b">
                <td className="py-2">{o.id}</td>
                <td className="py-2">{o.customer_name}</td>
                <td className="py-2">R$ {Number(o.total).toFixed(2)}</td>
                <td className="py-2">Pendente</td>
                <td className="py-2">
                  <button className="text-blue-600">Ver detalhes</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
