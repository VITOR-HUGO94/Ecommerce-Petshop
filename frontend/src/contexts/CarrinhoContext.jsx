// src/contexts/CarrinhoContext.jsx
import { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext({
   itens: [],
   adicionarProduto: () => {},
   atualizarQuantidade: () => {},
   removerProduto: () => {},
   checkout: () => {},
   total: 0, // default fallback
 });

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarProduto = (produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const atualizarQuantidade = (id, quantidade) => {
    setCarrinho((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: Math.max(1, quantidade) } : p
      )
    );
  };

  const removerProduto = (id) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const checkout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtos: carrinho }),
      });
      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
    }
  };

    // Novo cálculo de total
  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );


  return (
    <CarrinhoContext.Provider
            value={{
        carrinho,
        adicionarProduto,
        atualizarQuantidade,
        removerProduto,
        checkout,
        total,          // agora incluído
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);
