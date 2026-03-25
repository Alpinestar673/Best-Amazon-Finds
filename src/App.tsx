/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  Heart, 
  ShoppingCart, 
  ChevronRight, 
  Star, 
  Filter, 
  Menu, 
  X, 
  Play, 
  BarChart3, 
  Mail, 
  Clock, 
  ArrowUpRight,
  Flame,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Product, Category, CATEGORIES, MOCK_PRODUCTS } from './types';

// --- Components ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'trending' | 'deal' | 'bestseller' }) => {
  const styles = {
    default: 'bg-gray-100 text-gray-800',
    trending: 'bg-orange-100 text-orange-600',
    deal: 'bg-red-100 text-red-600',
    bestseller: 'bg-yellow-100 text-yellow-700'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};

const ProductCard = ({ product, onWishlist, isWishlisted, onTrackClick }: { 
  product: Product, 
  onWishlist: (id: string) => void, 
  isWishlisted: boolean,
  onTrackClick: (id: string) => void,
  key?: string | number
}) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.isTrending && <Badge variant="trending">🔥 Trending</Badge>}
          {product.isBestSeller && <Badge variant="bestseller">⭐ Best Seller</Badge>}
          {product.isLimitedDeal && <Badge variant="deal">⚡ Limited Deal</Badge>}
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); onWishlist(product.id); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:text-red-500'}`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        {product.videoUrl && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Play size={10} fill="white" /> WATCH VIDEO
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">{product.rating}</span>
        </div>
        
        <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-orange-500 transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 italic mb-3 line-clamp-1">"{product.hook}"</p>
        
        <ul className="space-y-1 mb-4 flex-grow">
          {product.benefits.slice(0, 2).map((benefit, i) => (
            <li key={i} className="text-[11px] text-gray-600 flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-orange-400" />
              {benefit}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-lg font-black text-gray-900">${product.price}</span>
          <a 
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackClick(product.id)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            Shop Now <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const VideoFeedItem = ({ product, onTrackClick }: { product: Product, onTrackClick: (id: string) => void, key?: string | number }) => {
  return (
    <div className="h-full w-full relative bg-black snap-start flex items-center justify-center overflow-hidden">
      {/* Mock Video Background */}
      <div className="absolute inset-0 opacity-60">
        <img src={product.image} className="w-full h-full object-cover blur-xl" alt="" />
      </div>
      
      <div className="relative z-10 w-full max-w-md aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {product.videoUrl ? (
          <video 
            src={product.videoUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600">
             <Play size={64} className="text-white opacity-50" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge variant="trending">🔥 Viral Find</Badge>
          <h2 className="text-2xl font-black mt-2 leading-tight">{product.title}</h2>
          <p className="text-lg font-medium text-orange-400 mt-1 italic">"{product.hook}"</p>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Price</span>
              <span className="text-2xl font-black">${product.price}</span>
            </div>
            <a 
              href={product.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackClick(product.id)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
            >
              SHOP ON AMAZON <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'video-feed' | 'wishlist' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [analytics, setAnalytics] = useState<{ [key: string]: { clicks: number, views: number } }>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load persistence
  useEffect(() => {
    const savedWishlist = localStorage.getItem('amazon_finds_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    
    const savedAnalytics = localStorage.getItem('amazon_finds_analytics');
    if (savedAnalytics) setAnalytics(JSON.parse(savedAnalytics));
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem('amazon_finds_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('amazon_finds_analytics', JSON.stringify(analytics));
  }, [analytics]);

  const trackView = (id: string) => {
    setAnalytics(prev => ({
      ...prev,
      [id]: {
        clicks: prev[id]?.clicks || 0,
        views: (prev[id]?.views || 0) + 1
      }
    }));
  };

  const trackClick = (id: string) => {
    setAnalytics(prev => ({
      ...prev,
      [id]: {
        views: prev[id]?.views || 0,
        clicks: (prev[id]?.clicks || 0) + 1
      }
    }));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.hook.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const trendingProducts = useMemo(() => {
    return [...MOCK_PRODUCTS].sort((a, b) => (analytics[b.id]?.clicks || 0) - (analytics[a.id]?.clicks || 0)).slice(0, 10);
  }, [analytics]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-600">
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <ShoppingCart size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tighter hidden sm:block">AMAZON<span className="text-orange-500">FINDS</span></span>
          </div>

          <div className="flex-grow max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search viral finds..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('video-feed')}
              className={`p-2.5 rounded-xl transition-all ${view === 'video-feed' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Video Feed"
            >
              <Play size={20} fill={view === 'video-feed' ? 'white' : 'none'} />
            </button>
            <button 
              onClick={() => setView('wishlist')}
              className={`p-2.5 rounded-xl transition-all relative ${view === 'wishlist' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Wishlist"
            >
              <Heart size={20} fill={view === 'wishlist' ? 'white' : 'none'} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`p-2.5 rounded-xl transition-all ${view === 'admin' ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Analytics"
            >
              <BarChart3 size={20} />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t border-gray-50 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === 'All' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All Finds
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${selectedCategory === cat.name ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <cat.icon size={14} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              {!searchQuery && selectedCategory === 'All' && (
                <section className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 text-white p-8 md:p-16">
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-6 gap-4 rotate-12 scale-150">
                      {MOCK_PRODUCTS.slice(0, 12).map((p, i) => (
                        <img key={i} src={p.image} className="aspect-square object-cover rounded-2xl" alt="" />
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <Badge variant="trending">New Viral Finds Daily</Badge>
                    <h1 className="text-4xl md:text-6xl font-black mt-6 leading-tight">
                      Amazon Finds That Actually <span className="text-orange-500">Make Life Easier</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-6 font-medium">
                      Viral, useful & affordable products you didn't know you needed. Hand-picked for maximum utility.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-10">
                      <button 
                        onClick={() => {
                          const el = document.getElementById('explore');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-orange-500/20"
                      >
                        Start Exploring <ChevronRight size={20} />
                      </button>
                      <button 
                        onClick={() => setView('video-feed')}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95"
                      >
                        Watch Feed <Play size={20} fill="white" />
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* Trending Section */}
              {!searchQuery && selectedCategory === 'All' && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                        <Flame size={20} fill="currentColor" />
                      </div>
                      <h2 className="text-2xl font-black">Trending Now</h2>
                    </div>
                    <div className="flex gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Updated 5m ago</span>
                    </div>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
                    {trendingProducts.map(product => (
                      <div key={product.id} className="min-w-[280px] snap-start">
                        <ProductCard 
                          product={product} 
                          onWishlist={toggleWishlist} 
                          isWishlisted={wishlist.includes(product.id)}
                          onTrackClick={trackClick}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Main Grid */}
              <section id="explore">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black">
                    {selectedCategory === 'All' ? 'All Viral Finds' : selectedCategory}
                    <span className="ml-3 text-sm font-medium text-gray-400">({filteredProducts.length} items)</span>
                  </h2>
                  <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                    <button className="p-2 bg-white rounded-lg shadow-sm text-gray-900"><Menu size={18} /></button>
                    <button className="p-2 text-gray-400 hover:text-gray-600"><Filter size={18} /></button>
                  </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onWishlist={toggleWishlist} 
                        isWishlisted={wishlist.includes(product.id)}
                        onTrackClick={trackClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No finds found</h3>
                    <p className="text-gray-500 mt-2">Try searching for something else or change the category.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                      className="mt-6 text-orange-500 font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </section>

              {/* Newsletter Section */}
              <section className="bg-orange-500 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10 max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">Get the best Amazon Finds before everyone else</h2>
                  <p className="text-orange-100 font-medium mb-10">Join 50,000+ shoppers who get our weekly viral product alerts.</p>
                  
                  {isSubscribed ? (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white text-orange-600 p-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                      <Zap size={20} fill="currentColor" /> You're on the list!
                    </motion.div>
                  ) : (
                    <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        required
                        placeholder="Enter your email..." 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-4 placeholder:text-orange-100 outline-none focus:bg-white focus:text-gray-900 transition-all"
                      />
                      <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black hover:bg-orange-50 transition-all active:scale-95">
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </section>

              {/* Deals & Urgency */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                    <Clock size={120} />
                  </div>
                  <div>
                    <Badge variant="deal">Flash Sale</Badge>
                    <h3 className="text-3xl font-black mt-4">Today's Limited Deals</h3>
                    <p className="text-red-100 mt-2 max-w-xs">Up to 60% off on viral home essentials. Ends in 04:22:15.</p>
                  </div>
                  <button className="bg-white text-red-600 w-fit px-6 py-3 rounded-xl font-bold mt-8 flex items-center gap-2">
                    Shop Deals <ChevronRight size={18} />
                  </button>
                </div>
                <div className="bg-yellow-400 rounded-[2.5rem] p-8 text-gray-900 flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                    <TrendingUp size={120} />
                  </div>
                  <div>
                    <Badge variant="bestseller">Must Have</Badge>
                    <h3 className="text-3xl font-black mt-4">Best Sellers of 2026</h3>
                    <p className="text-yellow-900 mt-2 max-w-xs">The products that defined the year. See what everyone is buying.</p>
                  </div>
                  <button className="bg-gray-900 text-white w-fit px-6 py-3 rounded-xl font-bold mt-8 flex items-center gap-2">
                    View List <ChevronRight size={18} />
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'video-feed' && (
            <motion.div 
              key="video-feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black h-screen w-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar"
            >
              <button 
                onClick={() => setView('home')}
                className="fixed top-6 left-6 z-[70] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="fixed top-6 right-6 z-[70] flex flex-col gap-4">
                <div className="flex flex-col items-center gap-1">
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
                    <Heart size={24} />
                  </button>
                  <span className="text-[10px] text-white font-bold">12.4k</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:text-orange-500 transition-colors">
                    <ArrowUpRight size={24} />
                  </button>
                  <span className="text-[10px] text-white font-bold">Share</span>
                </div>
              </div>

              <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-2 pointer-events-none opacity-50">
                <ChevronUp size={20} className="text-white animate-bounce" />
                <span className="text-[10px] text-white font-bold uppercase tracking-widest">Swipe for more</span>
              </div>

              {MOCK_PRODUCTS.filter(p => p.videoUrl || p.isTrending).map(product => (
                <VideoFeedItem key={product.id} product={product} onTrackClick={trackClick} />
              ))}
            </motion.div>
          )}

          {view === 'wishlist' && (
            <motion.div 
              key="wishlist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black flex items-center gap-3">
                  <Heart size={32} fill="currentColor" className="text-red-500" />
                  Your Wishlist
                </h2>
                <button 
                  onClick={() => setView('home')}
                  className="text-orange-500 font-bold flex items-center gap-1 hover:underline"
                >
                  Back to shopping <ChevronRight size={18} />
                </button>
              </div>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {MOCK_PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onWishlist={toggleWishlist} 
                      isWishlisted={true}
                      onTrackClick={trackClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-gray-50 rounded-[3rem]">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart size={40} className="text-red-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h3>
                  <p className="text-gray-500 mt-2 max-w-sm mx-auto">Save products you love to keep track of them and get notified about price drops.</p>
                  <button 
                    onClick={() => setView('home')}
                    className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
                  >
                    Discover Products
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div 
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black flex items-center gap-3">
                  <BarChart3 size={32} className="text-orange-500" />
                  Analytics Dashboard
                </h2>
                <button 
                  onClick={() => setView('home')}
                  className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold"
                >
                  Exit Admin
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Clicks</span>
                  <div className="text-4xl font-black mt-2 text-orange-500">
                    {Object.values(analytics).reduce((acc: number, curr: any) => acc + curr.clicks, 0)}
                  </div>
                </div>
                <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Views</span>
                  <div className="text-4xl font-black mt-2 text-gray-900">
                    {Object.values(analytics).reduce((acc: number, curr: any) => acc + curr.views, 0)}
                  </div>
                </div>
                <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg. Conversion</span>
                  <div className="text-4xl font-black mt-2 text-green-500">
                    {(() => {
                      const totalClicks = Object.values(analytics).reduce((acc: number, curr: any) => acc + curr.clicks, 0) as number;
                      const totalViews = Object.values(analytics).reduce((acc: number, curr: any) => acc + curr.views, 0) as number;
                      return ((totalClicks / (totalViews || 1)) * 100).toFixed(1);
                    })()}%
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-bold">Product Performance</h3>
                  <Badge variant="trending">Real-time Data</Badge>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Views</th>
                        <th className="px-6 py-4">Clicks</th>
                        <th className="px-6 py-4">CTR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {MOCK_PRODUCTS.sort((a, b) => (analytics[b.id]?.clicks || 0) - (analytics[a.id]?.clicks || 0)).slice(0, 15).map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                              <span className="font-bold text-sm">{p.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{p.category}</td>
                          <td className="px-6 py-4 text-sm font-medium">{analytics[p.id]?.views || 0}</td>
                          <td className="px-6 py-4 text-sm font-bold text-orange-500">{analytics[p.id]?.clicks || 0}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-orange-500" 
                                  style={{ width: `${Math.min(((analytics[p.id]?.clicks || 0) / (analytics[p.id]?.views || 1)) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold">
                                {(((analytics[p.id]?.clicks || 0) / (analytics[p.id]?.views || 1)) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                  <ShoppingCart size={24} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-black tracking-tighter">AMAZON<span className="text-orange-500">FINDS</span></span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                We find the best, most useful, and viral products on Amazon so you don't have to. 
                Our team tests hundreds of items to bring you only the ones that actually make life easier.
              </p>
              <div className="flex gap-4 mt-8">
                {['Instagram', 'TikTok', 'YouTube', 'Facebook'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setView('home')} className="text-gray-500 hover:text-orange-500 font-medium transition-colors">Home</button></li>
                <li><button onClick={() => setView('video-feed')} className="text-gray-500 hover:text-orange-500 font-medium transition-colors">Video Feed</button></li>
                <li><button onClick={() => setView('wishlist')} className="text-gray-500 hover:text-orange-500 font-medium transition-colors">Wishlist</button></li>
                <li><button onClick={() => setView('admin')} className="text-gray-500 hover:text-orange-500 font-medium transition-colors">Analytics</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6">Categories</h4>
              <ul className="space-y-4">
                {CATEGORIES.slice(0, 4).map(cat => (
                  <li key={cat.name}>
                    <button 
                      onClick={() => { setSelectedCategory(cat.name); setView('home'); window.scrollTo(0, 0); }}
                      className="text-gray-500 hover:text-orange-500 font-medium transition-colors"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 font-medium">© 2026 Amazon Finds. All rights reserved.</p>
            <p className="text-[10px] text-gray-400 max-w-md text-center md:text-right">
              As an Amazon Associate, we earn from qualifying purchases. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <AnimatePresence>
        {view === 'home' && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-6 right-6 z-40 md:hidden"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('explore');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              👉 EXPLORE TODAY'S FINDS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
