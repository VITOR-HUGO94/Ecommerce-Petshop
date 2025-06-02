import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import './output.css';
import ProdutoDetalhes from './components/ProdutoDetalhes';
import SearchResults from './components/SearchResults';
import CategoriaProdutos from './components/CategoriaProdutos'; // Componente que você criará
import Layout from './components/Layout'; // Importa o Layout
import SubcategoriaPage from './components/SubcategoriaPage'


function App() {
    return (
        
          <CarrinhoProvider>
          <Router>
            <Layout>
              <Navbar />
              <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/produto/:id" element={<ProdutoDetalhes />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/categoria/:id" element={<CategoriaProdutos />} />
                    <Route path="/subcategoria/:id" element={<SubcategoriaPage />} />

              </Routes>
              </Layout>
          </Router>
          </CarrinhoProvider>    
    );
}

export default App;