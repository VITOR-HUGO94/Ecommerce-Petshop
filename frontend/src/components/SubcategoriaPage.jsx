import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

// Componente funcional para exibir produtos por subcategoria
export default function SubcategoriaPage() {
  const { id } = useParams()
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProdutos() {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/produtos/?subcategoria=${id}`
        )
        setProdutos(data)
      } catch (err) {
        console.error(err)
        setError('Erro ao carregar produtos.')
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (produtos.length === 0) return <p>Nenhum produto encontrado.</p>

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Produtos da Subcategoria</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtos.map((produto) => {
          const preco = parseFloat(produto.preco) || 0
          const precoFormatado = preco.toFixed(2).replace('.', ',')

          return (
            <Link
              key={produto.id}
              to={`/produto/${produto.id}`}
              className="block text-left bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 active:scale-95 active:shadow-sm transition-transform duration-200 ease-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pet-600 cursor-pointer"
            >
              <div className="p-4">
                <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  {produto.imagem && (
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 inline">
                  {produto.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-4 inline line-clamp-2">
                  {produto.descricao}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-pet-600">
                    R$ {precoFormatado}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
