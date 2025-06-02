import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/produtos/?search=${encodeURIComponent(searchTerm)}`)
      .then((res) => res.json())
      .then(setProdutos)
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Resultados para: "{searchTerm}"
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {produto.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {produto.descricao}
                </p>
                <span className="text-xl font-bold text-pet-600">
                  R$ {Number(produto.preco).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
