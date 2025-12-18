"use client";

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  const login = async () => {

    const user: UserInterface = {
      email: email,
      password: password,
    }

    const res = await api.post(`${process.env.NEXT_PUBLIC_URL_BACK}/auth/login`, 
      user,
    );

    const data = res.data;

    if (res.status == 201) {
      localStorage.setItem("token", data.token);
       router.push("/admin");;
    }
  };


  return (
    <>
   
      <FaArrowLeft size={24} className="m-4 cursor-pointer" onClick={() => router.push("/")} />  

    <div className="bg-white shadow-xl rounded-xl p-8 w-full h-full max-w-md mx-auto mt-40">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Login
      </h1>


      <input
        className="border p-3 rounded w-full mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-3 rounded w-full mb-4"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
      >
        Entrar
      </button>
      </div>
      </>
  );
}
