// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingCart } from 'react-icons/fi';
import { useCarrinho } from '../contexts/CarrinhoContext'; // :contentReference[oaicite:2]{index=2}

import logo from '../img/favicon.png';

function Navbar() {
  const { total } = useCarrinho();
  const safeTotal = typeof total === 'number' ? total : 0; // fallback para 0 :contentReference[oaicite:0]{index=0}
  //console.log('Navbar renderizou - total:', total); // 👈 Verifique se aparece no F12
  
  const totalFormatado = safeTotal
    .toFixed(2)         // duas casas decimais
    .replace('.', ','); // trocar ponto por vírgula


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo à esquerda */}
          <Link
            to="/"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-pet-500 rounded-md"
          >
            <img src={logo} alt="Logo PetShop" className="h-8 w-8" />
            <span className="text-2xl font-bold text-pet-600">PetShop</span>
          </Link>

          {/* Links à direita */}
          <nav className="flex space-x-4 items-center">
            <Link
              to="/"
              className="flex items-center px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pet-600 text-gray-700 hover:bg-pet-50 hover:text-pet-700"
            >
              <FiHome size={22} className="mr-3" aria-hidden="true" />
              <span className="text-base font-semibold">Home</span>
            </Link>

            <Link
              to="/carrinho"
              className="flex items-center px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pet-600 text-gray-700 hover:bg-pet-50 hover:text-pet-700"
            >
              <FiShoppingCart size={22} className="mr-3" aria-hidden="true" />
              <span className="text-base font-semibold">Carrinho</span>
              <span className="ml-2 text-base font-semibold text-green-600">
                R$ {totalFormatado}
              </span> {/* :contentReference[oaicite:3]{index=3} */}
            
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;