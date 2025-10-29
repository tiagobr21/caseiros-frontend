import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Coluna 1 - Logo e slogan */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/logo.jpg" alt="Logo Caseiros" width={45} height={45} style={{borderRadius:50}}/>
            <h2 className="text-2xl font-bold">Caseiros</h2>
          </div>
          <p className="text-green-100 text-sm leading-relaxed">
            Cestas Regionais com o <strong>Sabor do Sítio</strong> 🍅  
            Produtos frescos e selecionados diretamente da roça.
          </p>
        </div>

        {/* Coluna 2 - Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navegação</h3>
          <ul className="space-y-2 text-green-100">
            <li>
              <Link href="/" className="hover:text-white transition">🏠 Início</Link>
            </li>
            <li>
              <Link href="/cesta" className="hover:text-white transition">🧺 Monte sua Cesta</Link>
            </li>
            <li>
              <Link href="/carrinho" className="hover:text-white transition">🛒 Carrinho</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3 - Contato */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contato</h3>
          <ul className="text-green-100 space-y-2">
            <li>📞 (92) 99999-9999</li>
            <li>📧 contato@caseiros.com.br</li>
            <li>📍 Manaus - AM</li>
          </ul>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="border-t border-green-700 py-4 text-center text-sm text-green-100">
        © {new Date().getFullYear()} <strong>Caseiros</strong> - Todos os direitos reservados.
      </div>
    </footer>
  );
}
