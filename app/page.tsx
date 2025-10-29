import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center py-5 bg-green-50">
      <div className="max-w-4xl mx-auto">
        <Image
          src="/logo.jpg"
          alt="Logo Caseiros"
          width={100}
          height={100}
          className="mx-auto mb-4"
          style={{borderRadius:50}}
        />
        <h2 className="text-3xl font-bold text-green-800 mb-5">Cestas Regionais</h2>
        <p className="text-green-700 mb-6">
          Monte sua cesta com produtos frescos e sabor do sítio 🍅
        </p>
        <Link
          href="/cesta"
          className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
        >
          Monte sua Cesta
        </Link>
      </div>
    </section>
  );
}
