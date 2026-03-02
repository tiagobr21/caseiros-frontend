"use client";
import { useCarrinho } from "@/context/CarrinhoContext";
import { FiShoppingCart } from "react-icons/fi";
import "./style.css";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { alertService } from "@/services/alert";
import Alert from "../alert/alert";
import { DeliverZones } from "../interfaces/DeliverZones";
import { CalculateCart } from "../interfaces/CalculateCart";

export default function CarrinhoPage() {
  const { carrinho, removerItem, limparCarrinho } = useCarrinho();

  console.log(carrinho);
  
  const subtotal = carrinho.reduce(

    (acc, item) => acc + Number(item.price * (item.quantity ?? 1)),
    0
  );

  const [deliveryZones, setdeliveryZones] = useState<DeliverZones[]>([]);
  const [bairroSelecionado, setBairroSelecionado] = useState<string>("");
  const [frete, setFrete] = useState<number>(0);
  const [totalFinal, setTotalFinal] = useState<number>(subtotal);
  const [paymentModal, setPaymentModal ] = useState<boolean>(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [enderecoCliente, setEnderecoCliente] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [validation, setValidation] = useState(false);

  const validationForm = () =>{
    if( 
      nomeCliente == "" ||
      telefoneCliente == "" ||
      enderecoCliente == "" ||
      bairroSelecionado == ""
    ){
      
      setValidation(true)
      return false ;
    }

    setPaymentModal(true)
    setValidation(false)
    return true;
  }

  const gerarMensagemWhatsApp = () => {
      const itensTexto = carrinho
        .map(
          (item) =>
            `• ${item.name} | Qtd: ${item.quantity || 1} | Unit: R$ ${Number(item.price).toFixed(2)}`
        )
        .join("\n");

      const mensagem = `
    🛒 *NOVO PEDIDO*

    👤 *Cliente:* ${nomeCliente}
    📞 *Telefone:* ${telefoneCliente}

    📍 *Endereço:* ${enderecoCliente}
    🏘️ *Bairro:* ${bairroSelecionado}

    📦 *Itens do Pedido:*
    ${itensTexto}

    🚚 *Frete:* R$ ${Number(frete).toFixed(2)}
    💰 *Subtotal:* R$ ${Number(subtotal).toFixed(2)}
    ✅ *Total:* R$ ${Number(totalFinal).toFixed(2)}

      `;

      return encodeURIComponent(mensagem);
  };
  
    const enviarWhatsApp = () => {
    const telefoneEmpresa = "5592984154356";
    const mensagem = gerarMensagemWhatsApp();

    window.open(
      `https://wa.me/${telefoneEmpresa}?text=${mensagem}`,
      "_blank"
    );
  };


  const fetchDeliveryZones = async () => {
    const response = await api.get(`${process.env.NEXT_PUBLIC_URL_BACK}/delivery/zones`);
    setdeliveryZones(response.data);
  };

  const calculateCart = async (delivery_zone: string) => {
    setBairroSelecionado(delivery_zone);

    const zona = deliveryZones.find((z) => z.neighborhood === delivery_zone);
    setFrete(zona ? zona.price : 0);

     

    const newCarrinho = carrinho.map((c) => {
      c.image = null;
      return c;
    });

    const payload: CalculateCart = {
      items: newCarrinho,
      bairro: delivery_zone,
    };
    

    const response = await api.post(`${process.env.NEXT_PUBLIC_URL_BACK}/cart/calculate`, payload);
    

    // Se o backend enviar o total já calculado, você usa:
    if (response.data?.total) {
      setTotalFinal(response.data.total);
    } else {
      // senão calcula manualmente:
      setTotalFinal(subtotal + (zona?.price ?? 0));
    }
  };

  useEffect(() => {
    fetchDeliveryZones();
   
  }, []);

  useEffect(() => {
    setTotalFinal(subtotal + frete);
  }, [subtotal, frete]);

  interface order {
      customer_name: string;
      customer_phone: string;
      address: string;
      neighborhood: string;
      delivery_price: number;
      subtotal: number,
      created_at: Date,
      total: number
      items: {
        product_id: number,
        quantity: number,
        unit_price: number
      }[]
  }

  const createOrder = async () => {

     if(validationForm()){

        setIsDisabled(true)
        
        const items = carrinho.map((c) =>{
          return{
            product_id : c.id,
            quantity : c.quantity,
            unit_price : Number(c.price)
          }
        });
        
        const orderBody:order = {
            customer_name: nomeCliente,
            customer_phone: telefoneCliente,
            address: enderecoCliente,
            neighborhood: bairroSelecionado,
            subtotal: subtotal,
            total: totalFinal,
            created_at: new Date(),
            delivery_price: Number(frete),
            items: items
        }

        await api.post(`${process.env.NEXT_PUBLIC_URL_BACK}/orders`, orderBody);

       alertService.success("Pedido realizado com Sucesso !!!");
       
       enviarWhatsApp();
       limparCarrinho();

    }    
     
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2
        className="text-2xl font-bold text-green-800 mb-6"
        style={{ display: "flex", alignItems: "center" }}
      >
        Seu Carrinho <FiShoppingCart size={20} style={{ marginLeft: 5 }} />
      </h2>
    

      {carrinho.length === 0 ? (
        <p className="text-gray-600">Você ainda não adicionou itens à sua cesta.</p>
      ) : (
        <>
            {/* Lista de Itens */}
  
          <ul className="space-y-4">
            {carrinho.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
              >
                <span>
                  {item.name} <strong>x{item.quantity ?? 1}</strong>
                </span>
                <span className="font-bold text-green-700">
                  R$ {(item.price * (item.quantity ?? 1))}
                </span>
                <button
                  onClick={() => removerItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          
          <form >

            {/* Dados do Cliente */}
              <div className="mt-6">
                <label className="block font-semibold text-green-800 mb-2">
                  Seu Nome: *
                </label>
                <input
                  type="text"
                  name="nome"
                  className="border rounded-xl px-3 py-2 w-full"
                  placeholder="Digite seu nome"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block font-semibold text-green-800 mb-2">
                  Telefone / WhatsApp: *
                </label>
                <input
                  type="text"
                  className="border rounded-xl px-3 py-2 w-full"
                  placeholder="(DDD) 00000-0000"
                  value={telefoneCliente}
                  onChange={(e) => setTelefoneCliente(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block font-semibold text-green-800 mb-2">
                  Endereço:
                </label>
                <input
                  type="text"
                  className="border rounded-xl px-3 py-2 w-full"
                  placeholder="Rua Gonçalve Dias n° 95"
                  value={enderecoCliente}
                  onChange={(e) => setEnderecoCliente(e.target.value)}
                />
              </div>

              {/* Seleção do Bairro */}
              <div className="mt-6">
                <label className="block font-semibold text-green-800 mb-2">
                  Escolha seu bairro para calcular o frete:
                </label>

                <select
                  className="border rounded-xl px-3 py-2 w-full"
                  onChange={(e) => calculateCart(e.target.value)}
                  value={bairroSelecionado}
                >
                  <option value="">Selecione o bairro</option>
                  {deliveryZones.map((b) => (
                    <option key={b.id} value={b.neighborhood}>
                    {b.neighborhood} — R$ {Number(b.price).toFixed(2)}

                    </option>
                  ))}
                </select>
              </div>
               { validation && 
               <span style={{fontSize:'14px'}} className="font-bold text-red-800 text-">* preecha os campos</span>
               }
          </form>  

          {/* Subtotal */}
          <div className="flex justify-between items-center mt-6">
            <strong>Subtotal:</strong>
            <span className="font-bold text-green-800 text-lg">
              R$ {Number(subtotal).toFixed(2)}
            </span>
          </div>

          {/* Frete */}
          <div className="flex justify-between items-center mt-2">
            <strong>Frete:</strong>
            <span className="font-bold text-green-800 text-lg">
              R$ {Number(frete).toFixed(2)}
            </span>
          </div>

          {/* Total Geral */}
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <strong>Total:</strong>
            <span className="font-bold text-green-800 text-xl">
                R$ {Number(totalFinal).toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => validationForm()}
            className="mt-6 bg-green-700 text-white w-full py-3 rounded-xl hover:bg-green-800"
          >
            Prosseguir com a Compra
          </button>

   

          {paymentModal && (
             <div className="fixed mt-20 inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 shadow-xl w-96 relative animate-fade-in">
                
                       
                <Alert/>

                {/* Botão Fechar */}
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                  onClick={() => setPaymentModal(false)}
                >
                  ×
                </button>

                <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
                  Pagamento via PIX
                </h2>

                <p className="text-gray-700 text-center mb-3">
                  Escaneie o QR Code abaixo para finalizar sua compra:
                </p>

                {/* QR CODE */}
                <div className="w-full flex justify-center mb-4">
                  <img
                    src="/qrcode.jpeg"
                    alt="QR Code PIX"
                    className="w-56 h-56 object-contain border rounded-xl"
                  />
                </div>

                    {/* Copiar chave PIX */}
                <button
                  className="bg-gray-500 text-white w-full py-3 rounded-xl hover:bg-green-800"
                  onClick={() => {
                    navigator.clipboard.writeText("SUA_CHAVE_PIX_AQUI");
                    alert("Chave PIX copiada!");
                  }}
                >
                  Copiar Chave PIX
                </button>
                
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                    <strong>Valor:</strong>
                    <span className="font-bold text-green-800 text-xl">
                        R$ {Number(totalFinal).toFixed(2)}
                    </span>
                </div>
              
                <br/>

                  <button
                  disabled={isDisabled}
                   className={isDisabled ? "bg-green-700 text-white w-full py-3  rounded-xl opacity-50 cursor-not-allowed" : "bg-green-700 text-white w-full py-3  rounded-xl hover:bg-green-800"}
                  onClick={()=>createOrder()}
                >
                  Confirmar Pagamento
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
