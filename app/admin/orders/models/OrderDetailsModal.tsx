export default function OrderDetailsModal({ order, onClose }: any) {
     
    
    const formatDate = (dateStr: string) => {

    const date = new Date(dateStr);
    return date.toLocaleString("pt-BR");
      

  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Detalhes do Pedido #{order.id}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Cliente</p>
            <p className="font-semibold">{order.customer_name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Telefone</p>
            <p className="font-semibold">{order.customer_phone}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm">Endereço</p>
            <p className="font-semibold">{order.address}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Bairro</p>
            <p className="font-semibold">{order.neighborhood}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Data</p>
            <p className="font-semibold">{formatDate(order.created_at)}</p>
          </div>

          {/* Valores */}
          <div>
            <p className="text-gray-500 text-sm">Subtotal</p>
            <p className="font-bold text-green-700">
              R$ {Number(order.subtotal).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Entrega</p>
            <p className="font-bold text-green-700">
              R$ {Number(order.delivery_price).toFixed(2)}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-2xl font-extrabold text-green-800">
              R$ {Number(order.total).toFixed(2)}
            </p>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
