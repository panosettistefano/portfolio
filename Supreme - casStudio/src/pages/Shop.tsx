import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  sizes: string[];
  soldOut: boolean;
  category: string;
}

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onQuickBuy: (p: Product, s: string) => void;
}

const ProductCard = ({ product, onQuickBuy }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group border border-black/5 aspect-square bg-[#F6F6F6] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-tighter text-white truncate">
          {product.name}
        </p>
        <p className="text-[10px] font-bold text-white">${product.price}</p>
      </div>

      {product.soldOut && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
          <span className="futura-bold-oblique text-supreme-red text-4xl -rotate-12 border-4 border-supreme-red px-4 py-1">
            Sold Out
          </span>
        </div>
      )}

      <AnimatePresence>
        {isHovered && !product.soldOut && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-6 z-20"
          >
            <p className="text-[10px] font-black uppercase mb-4 tracking-widest">Select Size</p>
            <div className="grid grid-cols-2 gap-2 w-full">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => onQuickBuy(product, size)}
                  className="border border-black py-2 text-[12px] font-bold hover:bg-black hover:text-white transition-colors uppercase"
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Shop = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const categories = [
    'Jackets', 'Shirts', 'Tees', 'Sweatshirts', 'Pants', 'Hats', 'Accessories'
  ];

  useEffect(() => {
    const url = category ? `/api/products?category=${category}` : '/api/products';
    fetch(url).then(res => res.json()).then(setProducts);
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b-8 border-black pb-6 gap-8">
        <div>
          <h1 className="futura-bold-oblique text-6xl md:text-8xl uppercase tracking-tighter leading-none">
            {category || 'All Items'}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
            <Link to="/shop" className={`text-[11px] font-black uppercase tracking-widest hover:text-supreme-red transition-colors ${!category ? 'text-supreme-red' : 'opacity-40'}`}>All</Link>
            {categories.map(cat => (
              <Link 
                key={cat} 
                to={`/shop/${cat.toLowerCase()}`} 
                className={`text-[11px] font-black uppercase tracking-widest hover:text-supreme-red transition-colors ${category === cat.toLowerCase() ? 'text-supreme-red' : 'opacity-40'}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
        <p className="text-[11px] font-black uppercase tracking-widest opacity-40 mb-2">
          {products.length} Items Found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onQuickBuy={(p, s) => addToCart({ ...p, size: s })} 
          />
        ))}
      </div>
    </div>
  );
};
