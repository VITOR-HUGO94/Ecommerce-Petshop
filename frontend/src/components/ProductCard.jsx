import { Link } from 'react-router-dom';

export default function ProductCard({ produto }) {
  const preco = parseFloat(produto.preco) || 0;
  const precoFormatado = preco.toFixed(2).replace('.', ',');
  return (
    <Link to={`/produto/${produto.id}`} className="block bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-200">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img src={produto.imagem} alt={produto.nome} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{produto.nome}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{produto.descricao}</p>
        <span className="text-xl font-bold text-pet-600">R$ {precoFormatado}</span>
      </div>
    </Link>
  );
}
