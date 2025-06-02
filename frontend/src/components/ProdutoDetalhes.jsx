import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const { adicionarProduto } = useCarrinho();
  const MotionLink = motion(Link);


  useEffect(() => {
    fetch(`http://localhost:8000/api/produtos/${id}/`)
      .then((res) => res.json())
      .then(setProduto)
      .catch((err) => console.error('Erro ao buscar produto:', err));
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto py-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 bg-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              />
            )}
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {produto.nome}
            </h2>
            <p className="text-gray-700 mb-4">{produto.descricao}</p>
            <span className="text-xl font-bold text-blue-600 block mb-4">
              R$ {Number(produto.preco).toFixed(2).replace('.', ',')}
            </span>
            <div className="flex items-center mb-4">
              <label htmlFor="quantidade" className="mr-2">Quantidade:</label>
              <input
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                min="1"
                className="w-16 border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <MotionLink
                  to="/carrinho"
                  onClick={() => adicionarProduto({ ...produto, quantidade })}
                  className="
                    bg-green-500 
                    text-black 
                    px-6 py-3 
                    rounded-lg 
                    shadow-md 
                    transition 
                    duration-200 
                    ease-in-out
                    hover:bg-green-600 
                    active:bg-green-700
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-green-400
                    cursor-pointer
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🛒 Adicione ao Carrinho
                </MotionLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
