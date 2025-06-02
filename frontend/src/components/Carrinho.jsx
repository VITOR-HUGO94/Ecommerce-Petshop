// src/components/Carrinho.jsx
import { FiShoppingCart, FiX, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';

export default function Carrinho() {
  const {
    carrinho,
    atualizarQuantidade,
    removerProduto,
    checkout,
  } = useCarrinho();

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>

        {carrinho.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FiShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">Seu carrinho está vazio</p>
            <Link
              to="/"
              className="mt-6 inline-block bg-pet-500 text-white px-6 py-3 rounded-lg hover:bg-pet-600 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                <div className="col-span-6">Produto</div>
                <div className="col-span-3">Quantidade</div>
                <div className="col-span-2 text-right">Preço</div>
                <div className="col-span-1" />
              </div>
            </div>

            {carrinho.map((produto) => (
              <div
                key={produto.id}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6 flex items-center">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                        {produto.imagem && (
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">
                          {produto.nome}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Código: {produto.id}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <input
                        type="number"
                        value={produto.quantidade}
                        min="1"
                        onChange={(e) =>
                          atualizarQuantidade(
                            produto.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-pet-500 focus:border-pet-500"
                      />
                    </div>

                    <div className="col-span-2 text-right">
                      <span className="text-lg font-semibold text-pet-600">
                        R${' '}
                        {(produto.preco * produto.quantidade)
                          .toFixed(2)
                          .replace('.', ',')}
                      </span>
                    </div>

                    <div className="col-span-1 text-right">
                      <button
                        onClick={() => removerProduto(produto.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-6 bg-gray-50">
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between mb-3">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold text-pet-600">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button
                    onClick={checkout}
                    className="block text-left bg-white rounded-xl shadow-md overflow-hidden
                    transform hover:scale-105 active:scale-95 active:shadow-sm
                    transition-transform duration-200 ease-out
                    hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pet-600
                    cursor-pointer flex items-center"
                  >
                    Finalizar Compra
                    <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
