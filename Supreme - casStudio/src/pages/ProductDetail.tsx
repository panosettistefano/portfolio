import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  sizes: string[];
  soldOut: boolean;
  category: string;
  description: string;
}

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-supreme-red" size={40} />
    </div>
  );

  if (!product) return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <h1 className="futura-bold-oblique text-4xl mb-4">Product Not Found</h1>
      <button onClick={() => navigate('/shop')} className="border-2 border-black px-8 py-2 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Back to Shop</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest mb-16 hover:text-supreme-red transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="bg-[#F6F6F6] border-8 border-black p-12 aspect-square flex items-center justify-center shadow-xl">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-16">
          <div>
            <h1 className="futura-bold-oblique text-6xl md:text-8xl mb-6 tracking-tighter leading-none">{product.name}</h1>
            <p className="text-4xl font-black">${product.price}</p>
          </div>

          <div className="space-y-8">
            <p className="text-sm font-bold leading-relaxed text-black/60 max-w-md">
              {product.description}
            </p>
            <p className="text-[11px] font-black uppercase tracking-widest">Category: {product.category}</p>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-[11px] font-black uppercase mb-5 tracking-widest">Select Size</p>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border-4 border-black py-4 text-[13px] font-bold transition-all uppercase ${selectedSize === size ? 'bg-black text-white' : 'bg-white hover:bg-black/5'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                if (selectedSize) {
                  addToCart({ ...product, size: selectedSize });
                }
              }}
              disabled={!selectedSize || product.soldOut}
              className="w-full bg-black text-white py-8 futura-bold-oblique text-3xl hover:bg-supreme-red transition-colors disabled:opacity-50 flex items-center justify-center gap-6"
            >
              {product.soldOut ? 'Sold Out' : (
                <>
                  <ShoppingCart size={28} />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          <div className="border-t-4 border-black pt-12 space-y-6">
            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
              <span>Shipping & Returns</span>
              <span className="opacity-40">Free Worldwide</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
              <span>Authenticity</span>
              <span className="opacity-40">100% Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
