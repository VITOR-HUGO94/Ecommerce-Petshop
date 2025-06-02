import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import ProductCard from './ProductCard' // componente reutilizável
import axios from 'axios'

// URL base da API, fallback para localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

// Componente Home com listagem de categorias e produtos
export default function Home() {
  const [categorias, setCategorias] = useState([])
  const [produtosPorCategoria, setProdutosPorCategoria] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Busca categorias
        const { data: cats } = await axios.get(`${API_URL}/categorias/`)
        setCategorias(cats)

        // Busca produtos por categoria em paralelo
        const promises = cats.map(cat =>
          axios
            .get(`${API_URL}/produtos/categoria/${cat.id}/`)
            .then(res => ({ id: cat.id, produtos: res.data }))
        )
        const results = await Promise.all(promises)
        const agrupados = results.reduce((acc, { id, produtos }) => ({
          ...acc,
          [id]: produtos,
        }), {})
        setProdutosPorCategoria(agrupados)
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
        setError('Erro ao carregar dados do site. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="p-8 text-center">Carregando produtos...</p>
  if (error) return <p className="p-8 text-red-600 text-center">{error}</p>

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex">
        <Sidebar categorias={categorias} />
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto space-y-12">
            {categorias.map(categoria => (
              <section key={categoria.id}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {categoria.nome}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {produtosPorCategoria[categoria.id]?.length > 0 ? (
                    produtosPorCategoria[categoria.id].map(produto => (
                      <ProductCard key={produto.id} produto={produto} />
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhum produto nesta categoria.</p>
                  )}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
