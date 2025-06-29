import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'PS5':
        return 'bg-blue-100 text-blue-800';
      case 'PS4':
        return 'bg-blue-100 text-blue-700';
      case 'Xbox Series X/S':
        return 'bg-green-100 text-green-800';
      case 'Xbox One':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0] || 'https://via.placeholder.com/300x400'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          
          {/* Platform Badge */}
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-semibold ${getPlatformColor(product.platform)}`}>
            {product.platform}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                R$ {product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${
              product.inStock ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.inStock ? 'Em estoque' : 'Fora de estoque'}
            </span>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">Comprar</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;