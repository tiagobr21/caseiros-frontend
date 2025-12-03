"use client";

import { api } from "@/services/api";
import { useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      window.location.href = "/admin";
    }
  };


  return (
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mx-auto mt-60">
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
  );
}
