import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plus, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
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
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        referrerPolicy="no-referrer"
      />
      
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

const CustomDropGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt) return;
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: `A high-end Supreme style fashion product: ${prompt}. Minimalist white background, professional studio lighting, lo-fi aesthetic.` }] },
        config: { imageConfig: { aspectRatio: "1:1", imageSize: size } },
      });
      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }
      if (!foundImage) throw new Error("No image generated");
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      setError(err.message || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-32 border-t-4 border-black bg-[#F6F6F6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-20 items-start">
          <div className="flex-1">
            <h2 className="futura-bold-oblique text-6xl mb-6">Custom Drop</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-black/60 mb-12 max-w-md leading-relaxed">
              Generate your own exclusive Supreme-style items using the Gemini 3 Pro Image engine.
            </p>
            <div className="space-y-8">
              <div>
                <label className="block text-[11px] font-black uppercase mb-3 tracking-widest">Item Description</label>
                <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. Red Box Logo Toaster" className="w-full bg-white border-4 border-black p-5 font-bold focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase mb-3 tracking-widest">Resolution</label>
                <div className="flex gap-4">
                  {(['1K', '2K', '4K'] as const).map(s => (
                    <button key={s} onClick={() => setSize(s)} className={`flex-1 py-3 border-4 border-black font-black text-xs ${size === s ? 'bg-black text-white' : 'bg-white'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={generateImage} disabled={isGenerating || !prompt} className="w-full bg-supreme-red text-white py-6 futura-bold-oblique text-2xl hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-4">
                {isGenerating ? <Loader2 className="animate-spin" /> : <Plus size={24} />}
                {isGenerating ? 'Generating...' : 'Generate Item'}
              </button>
              {error && <div className="text-supreme-red text-[11px] font-black uppercase flex items-center gap-3"><AlertCircle size={16} />{error}</div>}
            </div>
          </div>
          <div className="flex-1 w-full aspect-square bg-white border-8 border-black flex items-center justify-center relative overflow-hidden shadow-2xl">
            {generatedImage ? <img src={generatedImage} className="w-full h-full object-cover" /> : <div className="text-center p-16 opacity-20"><ImageIcon size={100} className="mx-auto mb-6" /><p className="text-[11px] font-black uppercase tracking-[0.4em]">Awaiting Generation</p></div>}
            {isGenerating && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"><div className="text-center"><Loader2 className="animate-spin mx-auto mb-6 text-supreme-red" size={48} /><p className="futura-bold-oblique text-2xl animate-pulse">Crafting Hype...</p></div></div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Optimized Hero Section */}
      <section className="mb-24 relative h-[70vh] md:h-[90vh] overflow-hidden bg-black group">
        <img 
          src="https://picsum.photos/seed/supremehero/1920/1080" 
          alt="Supreme Spring/Summer 2026 Hero"
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[4s] ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0" />
        
        {/* Hype Overlays */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="futura-bold-oblique text-6xl sm:text-8xl md:text-[10rem] mb-12 md:mb-16 tracking-tighter leading-[0.9] select-none drop-shadow-2xl">
              SPRING<br/>SUMMER
            </h1>
            <div className="flex items-center justify-center gap-8 mb-16 md:mb-24">
              <span className="h-px w-16 md:w-24 bg-white/60" />
              <span className="text-xl md:text-4xl font-black uppercase tracking-[0.6em] drop-shadow-lg">2026</span>
              <span className="h-px w-16 md:w-24 bg-white/60" />
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-10 justify-center">
              <button className="bg-supreme-red text-white px-12 md:px-16 py-5 md:py-6 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 text-sm md:text-base shadow-xl">
                Shop New Arrivals
              </button>
              <button className="border-2 border-white text-white px-12 md:px-16 py-5 md:py-6 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 text-sm md:text-base shadow-xl">
                View Lookbook <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Badge */}
        <motion.div 
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: -15, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-10 right-10 hidden lg:block z-20"
        >
          <div className="bg-supreme-red text-white px-4 py-2 futura-bold-oblique text-2xl border-2 border-white shadow-2xl">
            DROP 01
          </div>
        </motion.div>
      </section>

      <div className="flex justify-between items-end mb-12 px-2">
        <h2 className="futura-bold-oblique text-5xl uppercase tracking-tighter">Latest Drops</h2>
        <Link to="/shop" className="text-[11px] font-black uppercase tracking-widest hover:text-supreme-red transition-colors flex items-center gap-2 mb-2">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5 mb-32">
        {products.slice(0, 6).map(product => (
          <ProductCard key={product.id} product={product} onQuickBuy={(p, s) => addToCart({ ...p, size: s })} />
        ))}
      </div>

      <CustomDropGenerator />
    </div>
  );
};
