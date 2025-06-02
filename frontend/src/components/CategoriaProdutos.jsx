// src/components/CategoriaProdutos.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function CategoriaProdutos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Buscar lista de categorias
        const categoriasRes = await fetch('http://localhost:8000/api/categorias/', {
          signal: controller.signal
        });
        
        if (!categoriasRes.ok) throw new Error('Erro ao carregar categorias');
        const categoriasData = await categoriasRes.json();
        setCategorias(categoriasData);

        // Verificar se a categoria existe
        const categoriaExistente = categoriasData.find(c => c.id.toString() === id);
        if (!categoriaExistente) {
          throw new Error(`Categoria #${id} não encontrada`);
        }

        // Buscar detalhes da categoria e produtos
        const [categoriaRes, produtosRes] = await Promise.all([
          fetch(`http://localhost:8000/api/categorias/${id}/`, {
            signal: controller.signal
          }),
          fetch(`http://localhost:8000/api/produtos/categoria/${id}/`, {
            signal: controller.signal
          })
        ]);

        // Tratar erros individuais
        if (!categoriaRes.ok) {
          throw new Error(`Erro na categoria: ${categoriaRes.statusText}`);
        }

        if (!produtosRes.ok) {
          throw new Error(`Erro nos produtos: ${produtosRes.statusText}`);
        }

        // Processar dados
        const categoriaData = await categoriaRes.json();
        const produtosData = await produtosRes.json();

        // Validar dados
        if (!categoriaData?.id) throw new Error('Dados inválidos da categoria');
        
        setCategoria(categoriaData);
        setProdutos(produtosData);

      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error('Erro detalhado:', {
            error: err,
            id,
            endpoint: `http://localhost:8000/api/categorias/${id}/`
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-lg mb-4 max-w-md text-center">
          {error.includes('não encontrada') ? (
            <>
              <p className="text-2xl mb-2">⛔ Categoria não encontrada</p>
              <p className="text-sm">Categorias disponíveis:</p>
              <ul className="list-disc mt-2">
                {categorias.map(c => (
                  <li key={c.id}>
                    <Link 
                      to={`/categoria/${c.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {c.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            error
          )}
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Voltar à Página Inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar categorias={categorias} />
        
        <main className="flex-1 p-8 ml-64">
  <h1 className="text-2xl font-bold mb-6">Categoria: {categoria?.nome}</h1>

  {produtos.length === 0 ? (
    <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-40 object-cover mb-4 rounded"
          />
          <h2 className="text-lg font-semibold">{produto.nome}</h2>
          <p className="text-gray-600 text-sm">{produto.descricao}</p>
          <p className="text-blue-600 font-bold mt-2">
            R$ {Number(produto.preco).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )}
</main>
      </div>
    </div>
  );
}