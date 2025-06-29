import React from 'react';
import { Platform, Category } from '../../types';

interface ProductFiltersProps {
  selectedPlatform: Platform | '';
  selectedCategory: Category | '';
  priceRange: [number, number];
  onPlatformChange: (platform: Platform | '') => void;
  onCategoryChange: (category: Category | '') => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

const platforms: Platform[] = ['PS4', 'PS5', 'Xbox One', 'Xbox Series X/S'];
const categories: Category[] = ['Action', 'Adventure', 'RPG', 'Sports', 'Racing', 'Shooter', 'Strategy', 'Fighting'];

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedPlatform,
  selectedCategory,
  priceRange,
  onPlatformChange,
  onCategoryChange,
  onPriceRangeChange,
  onClearFilters
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Limpar filtros
        </button>
      </div>

      {/* Platform Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Plataforma</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="platform"
              checked={selectedPlatform === ''}
              onChange={() => onPlatformChange('')}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Todas</span>
          </label>
          {platforms.map((platform) => (
            <label key={platform} className="flex items-center">
              <input
                type="radio"
                name="platform"
                checked={selectedPlatform === platform}
                onChange={() => onPlatformChange(platform)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Categoria</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ''}
              onChange={() => onCategoryChange('')}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Todas</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Faixa de Preço</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Preço mínimo</label>
            <input
              type="number"
              min="0"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="R$ 0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Preço máximo</label>
            <input
              type="number"
              min="0"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="R$ 500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;