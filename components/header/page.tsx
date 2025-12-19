"use client";
import Image from "next/image";
import Link from "next/link";
import { useCarrinho } from "@/context/CarrinhoContext";
import "./style.css";
import { use, useEffect, useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiInbox } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { IoIosLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

export default function Header() {
  const context = useCarrinho();
  const carrinho = context?.carrinho ?? [];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);
  
    const verifyAuth = async () => { 
      let token = localStorage.getItem("token");
    
      const res = await api.get(`${process.env.NEXT_PUBLIC_URL_BACK}/auth/validate-token/${token}`);
  
      if (res.data.statusCode === 401) { 
          setLoggedIn(false);
      }
      
  }

  useEffect(() => { 
    verifyAuth();
  })
   
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  }

  const logIn = () => { 
    router.push("/login");
  }

  return (
    <>

    <header className="bg-white shadow-sm sticky top-0 z-100 relative">
      <div className="max-w-10xl mx-auto flex items-center justify-between p-4">

        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <Image src="/logo.jpg" alt="Caseiros" width={50} height={50} />
          <h1 className="title font-bold text-green-800 text-xl">Caseiros</h1>
        </Link>

 
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/cesta" style={{display:'flex'}} className="text-green-800 hover:text-green-600">
            Monte sua cesta <FiInbox size={24} style={{marginLeft:5}} />
          </Link>
          <Link href="/carrinho" style={{display:'flex'}} className="relative text-green-800 hover:text-green-600">
            Carrinho <FiShoppingCart size={24}  style={{marginLeft:3}} /> 
            {carrinho.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {carrinho.length}
              </span>
            )}
            </Link>
            {loggedIn &&
           <Link href="/admin" style={{display:'flex'}} className="text-green-800 hover:text-green-600">
            Admin <MdAdminPanelSettings size={24} style={{marginLeft:5}} />
              </Link>
            }
              
            {loggedIn ? 
              
       
              <CiLogout size={24} style={{marginLeft:5}} onClick={()=> logOut()}  className="text-green-800 hover:text-green-600"/>
     
              
              :

              <IoIosLogIn size={24} style={{marginLeft:5}}  onClick={()=> logIn()} className="text-green-800 hover:text-green-600"  />
  
          }
         
            
        </nav>
        
 
          <div className="md:hidden">
            

             {carrinho.length > 0 && !isMenuOpen && (
              <span className="relative left-3 top-0.5 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {carrinho.length}
              </span>
          )}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-green-800"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

         
        </div>
      

        </div>
        
        


      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col p-4 gap-4">
          <Link
            href="/cesta"
             style={{display:'flex'}}
            className="text-green-800 hover:text-green-600"
            onClick={closeMobileMenu} 
          >
          Monte sua cesta <FiInbox size={24} style={{marginLeft:5}} />
          </Link>
          <Link
            href="/carrinho"
            style={{display:'flex'}}
            className="relative w-fit text-green-800 hover:text-green-600"
            onClick={closeMobileMenu} 
          >
            Carrinho <FiShoppingCart size={24} style={{marginRight:5}} />
            {carrinho.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {carrinho.length}
              </span>
            )}
            </Link>
            
             {loggedIn &&
           <Link href="/admin" className=" flex text-green-800 hover:text-green-600">
                Admin <MdAdminPanelSettings size={24} style={{ marginLeft: 5 }} />
                
              <div className="flex justify-between w-full">
               <CiLogout size={24}  onClick={()=> logOut()}  className="ml-auto text-green-800 hover:text-green-600"/>
              </div>
              </Link>
            }

                
            {!loggedIn &&
            
              <div className="flex">
                <IoIosLogIn size={24} style={{marginLeft:5}}  onClick={()=> logIn()} className="ml-auto text-green-800 hover:text-green-600"  />
              </div>
          }
        </nav>
      )}
        </header>
  
    </>
  );
}