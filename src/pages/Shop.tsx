import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, Filter } from 'lucide-react';
import { getProducts } from '../services/api';
import { Product, Platform, Category } from '../types';
import ProductCard from '../components/shop/ProductCard';
import ProductFilters from '../components/shop/ProductFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  // Filters
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        
        // Apply URL parameters
        const platformParam = searchParams.get('platform') as Platform;
        const categoryParam = searchParams.get('category') as Category;
        const searchQuery = searchParams.get('search');
        
        if (platformParam) setSelectedPlatform(platformParam);
        if (categoryParam) setSelectedCategory(categoryParam);
        
        // Filter by search query if present
        let filtered = productsData;
        if (searchQuery) {
          filtered = productsData.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    // Platform filter
    if (selectedPlatform) {
      filtered = filtered.filter(product => product.platform === selectedPlatform);
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      default:
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(filtered);
  }, [products, selectedPlatform, selectedCategory, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedPlatform('');
    setSelectedCategory('');
    setPriceRange([0, 500]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Loja de Jogos</h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="rating">Melhor Avaliado</option>
              <option value="newest">Mais Recente</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters
              selectedPlatform={selectedPlatform}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              onPlatformChange={setSelectedPlatform}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum jogo encontrado com os filtros selecionados.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;