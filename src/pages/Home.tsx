import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Gamepad2, Truck, Shield, Headphones } from 'lucide-react';
import { getProducts } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/shop/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getProducts();
        
        // Get featured products (highest rated)
        const featured = products
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
        
        // Get new products (most recent)
        const newest = products
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 8);
        
        setFeaturedProducts(featured);
        setNewProducts(newest);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Os Melhores Jogos
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Para Você
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Descubra os últimos lançamentos para PlayStation e Xbox com os melhores preços
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Explorar Loja</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/shop?platform=PS5"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Jogos PS5
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Receba seus jogos em casa rapidamente com nosso sistema de entrega express</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-gray-600">Suas transações são protegidas com os mais altos padrões de segurança</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Nossa equipe está sempre disponível para ajudar você</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Jogos em Destaque</h2>
              <Link
                to="/shop"
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1"
              >
                <span>Ver todos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Lançamentos</h2>
              <Link
                to="/shop?sortBy=newest"
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1"
              >
                <span>Ver todos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Platform Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Escolha Sua Plataforma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/shop?platform=PS5"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
              <div className="relative">
                <Gamepad2 className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">PlayStation 5</h3>
                <p className="text-blue-100 mb-4">
                  Experimente os jogos mais avançados com gráficos de nova geração
                </p>
                <div className="flex items-center text-blue-200 group-hover:text-white transition-colors">
                  <span>Ver jogos PS5</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link
              to="/shop?platform=Xbox Series X/S"
              className="group relative bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
              <div className="relative">
                <Gamepad2 className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Xbox Series X/S</h3>
                <p className="text-green-100 mb-4">
                  Jogue os melhores títulos com desempenho superior e Quick Resume
                </p>
                <div className="flex items-center text-green-200 group-hover:text-white transition-colors">
                  <span>Ver jogos Xbox</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;