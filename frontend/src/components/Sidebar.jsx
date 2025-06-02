// src/components/Sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ICON_MAP } from '../icons';
import PropTypes from 'prop-types';

export default function Sidebar({ categorias = [] }) {
  const [openCats, setOpenCats] = useState({});

  const toggle = (id) =>
    setOpenCats(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="
      w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] 
      bg-gradient-to-br          /* direção do degradê: bottom-right */
      from-pink-500              /* ponto inicial rosa vivo */
      via-red-500                /* ponto intermediário vermelho intenso */
      to-yellow-400              /* ponto final amarelo vibrante */
      
      border-r border-gray-200 dark:border-gray-700
      shadow-lg rounded-r-2xl overflow-y-auto p-4
    ">
      <h3 className="flex items-center justify-between text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Categorias
      </h3>
      
      <nav className="space-y-4">
        {categorias.map(({ id, nome, subcategorias = [] }) => {
          const isOpen = openCats[id];
          return (
            <div key={id}>
              <button
                onClick={() => toggle(id)}
                className="w-full flex items-center justify-between px-4 py-2
                           text-gray-700 dark:text-gray-200 font-medium
                           hover:bg-gray-100 dark:hover:bg-gray-700
                           rounded-lg transition-colors"
              >
                {nome}
                <ChevronDown
                  size={18}
                  className={`
                    transform transition-transform 
                    ${isOpen ? 'rotate-180' : ''}
                    text-gray-600 dark:text-gray-400
                  `}
                />
              </button>

              {isOpen && subcategorias.length > 0 && (
                <div className="mt-2 ml-6 space-y-1">
                  {subcategorias.map(({ id: subId, nome: subNome, icon_name }) => {
                    const Icon = ICON_MAP[icon_name] || ICON_MAP.default;
                    return (
                      <Link
                        key={subId}
                        to={`/subcategoria/${subId}`}
                        className="
                          flex items-center px-4 py-2 text-gray-700 dark:text-gray-200
                          rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900
                          hover:text-blue-600 dark:hover:text-blue-400
                          transition-colors
                        "
                      >
                        <Icon size={18} className="mr-3" />
                        {subNome}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  categorias: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      subcategorias: PropTypes.array,
    })
  ),
};
Sidebar.defaultProps = {
  categorias: [],
};
