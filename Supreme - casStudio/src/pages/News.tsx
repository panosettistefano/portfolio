import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "Supreme/The North Face Spring 2026",
    date: "03/09/2026",
    image: "https://picsum.photos/seed/news1/1200/600",
    excerpt: "Supreme has worked with The North Face® on a new collection for Spring 2026. The collection consists of a Taped Seam Shell Jacket, Nuptse Jacket, Mountain Pant, Camp Duffel, Shoulder Bag and more."
  },
  {
    id: 2,
    title: "Supreme/Nike Air Force 1 Low Restock",
    date: "03/05/2026",
    image: "https://picsum.photos/seed/news2/1200/600",
    excerpt: "The Supreme/Nike Air Force 1 Low will be restocked this Thursday, March 5th. Available in White, Black and Wheat."
  },
  {
    id: 3,
    title: "New York Store Opening",
    date: "02/28/2026",
    image: "https://picsum.photos/seed/news3/1200/600",
    excerpt: "Supreme will open its new flagship store in New York City this weekend. The space features a custom skate bowl and exclusive opening day items."
  }
];

export const News = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">
      <div className="mb-24 border-b-8 border-black pb-6">
        <h1 className="futura-bold-oblique text-6xl md:text-8xl uppercase tracking-tighter leading-none">News</h1>
      </div>

      <div className="space-y-40">
        {newsItems.map((item, index) => (
          <motion.article 
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group cursor-pointer"
          >
            <div className="aspect-[2/1] bg-[#F6F6F6] border-8 border-black overflow-hidden mb-12 relative shadow-xl">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="max-w-3xl">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 opacity-40">{item.date}</p>
                <h2 className="futura-bold-oblique text-4xl md:text-7xl mb-8 group-hover:text-supreme-red transition-colors leading-none">{item.title}</h2>
                <p className="text-base font-bold leading-relaxed text-black/60 mb-10">
                  {item.excerpt}
                </p>
                <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest hover:underline">
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-48 text-center">
        <button className="border-8 border-black px-16 py-6 futura-bold-oblique text-3xl hover:bg-black hover:text-white transition-all">
          View Archive
        </button>
      </div>
    </div>
  );
};
