import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RefreshCw, MapPin, ExternalLink, ChevronRight, Info, Layers } from 'lucide-react';
import { World } from './types';
import { EUROPEAN_SUMMER_WORLD } from './data';
import { remixWorld } from './services/geminiService';

const WorldCard = ({ world, title, isRemix = false }: { world: World; title: string; isRemix?: boolean }) => {
  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
      <div className="p-6 border-bottom border-white/5 bg-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40">{title}</span>
          {isRemix && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Remixed</span>
            </div>
          )}
        </div>
        <h2 className="text-3xl font-light tracking-tight text-white mb-2">{world.name}</h2>
        <p className="text-sm text-white/60 leading-relaxed italic font-serif">{world.description}</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {world.stops.map((stop, idx) => (
          <motion.div 
            key={stop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4">
              <img 
                src={stop.image} 
                alt={stop.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-widest mb-1">
                  <MapPin className="w-3 h-3" />
                  {stop.location}
                </div>
                <h3 className="text-xl font-medium text-white">Day {stop.day}: {stop.title}</h3>
              </div>
            </div>
            
            <p className="text-sm text-white/70 leading-relaxed mb-4 font-light">
              {stop.narrative}
            </p>

            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30">Curated Products</span>
              {stop.products.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <h4 className="text-xs font-medium text-white">{product.name}</h4>
                    <p className="text-[10px] text-white/40">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-emerald-400 block">{product.price}</span>
                    <a href={product.link} className="text-[9px] text-white/30 hover:text-white transition-colors flex items-center gap-1 justify-end uppercase tracking-wider">
                      View <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 bg-white/5 border-t border-white/5">
        <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3 h-3" />
            {world.stops.length} Stops
          </div>
          <div className="flex items-center gap-1.5">
            <Info className="w-3 h-3" />
            {world.aesthetic.split(',')[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [remixPrompt, setRemixPrompt] = useState('');
  const [isRemixing, setIsRemixing] = useState(false);
  const [remixedWorld, setRemixedWorld] = useState<World | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRemix = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remixPrompt.trim()) return;

    setIsRemixing(true);
    setError(null);
    try {
      const result = await remixWorld(EUROPEAN_SUMMER_WORLD, remixPrompt);
      setRemixedWorld(result);
    } catch (err) {
      console.error(err);
      setError('Failed to remix the world. Please try again.');
    } finally {
      setIsRemixing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-[1600px] mx-auto px-6 py-12 flex flex-col min-h-screen">
        {/* Header & Onboarding */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Layers className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/40">VIVERE World Remixer</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6">
                Personalize any <span className="italic font-serif">World.</span>
              </h1>
              <p className="text-lg text-white/50 max-w-xl leading-relaxed">
                VIVERE Worlds are curated travel templates. Use the Remixer to "fork" a world—instantly changing its duration, budget, or theme while keeping the same aesthetic.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" /> How it works
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { step: '01', label: 'Pick a World', desc: 'Start with a curated template' },
                  { step: '02', label: 'Give a Prompt', desc: 'Tell the AI what to change' },
                  { step: '03', label: 'Get a Remix', desc: 'A custom fork is born' },
                ].map((s) => (
                  <div key={s.step} className="space-y-1">
                    <div className="text-[10px] font-mono text-white/20">{s.step}</div>
                    <div className="text-xs font-bold text-white/80">{s.label}</div>
                    <div className="text-[10px] text-white/40 leading-tight">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* The Action Bar */}
        <section className="mb-12 sticky top-6 z-50">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-2 shadow-2xl shadow-emerald-500/10">
              <form onSubmit={handleRemix} className="relative flex items-center">
                <div className="absolute left-6 text-emerald-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={remixPrompt}
                  onChange={(e) => setRemixPrompt(e.target.value)}
                  placeholder="Step 2: Describe your changes (e.g. 'Make it 3 days for a wine lover on a budget')"
                  className="w-full bg-transparent py-5 pl-14 pr-32 text-base focus:outline-none transition-all placeholder:text-white/20"
                  disabled={isRemixing}
                />
                <button 
                  type="submit"
                  disabled={isRemixing || !remixPrompt.trim()}
                  className="absolute right-2 px-6 py-3 rounded-2xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {isRemixing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Remixing...</span>
                    </>
                  ) : (
                    <>
                      <span>Remix World</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <span className="text-[10px] text-white/20 uppercase tracking-widest py-1">Try these:</span>
              {[
                { label: 'Wine & Vineyards', prompt: 'Focus on wine regions and vineyards' },
                { label: 'Budget Friendly', prompt: 'Make it budget-friendly with local stays' },
                { label: 'Short Trip (2 Days)', prompt: 'Condense this into a 2-day highlight reel' },
              ].map(tag => (
                <button 
                  key={tag.label}
                  onClick={() => setRemixPrompt(tag.prompt)}
                  className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 uppercase tracking-widest transition-all"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:h-[800px] min-h-0 relative">
          {/* Visual Connector (Desktop Only) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20 pointer-events-none">
            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
              <div className="p-4 rounded-full border border-emerald-500/50 bg-emerald-500/10">
                <RefreshCw className={`w-8 h-8 text-emerald-500 ${isRemixing ? 'animate-spin' : ''}`} />
              </div>
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
            </div>
          </div>

          {/* Original World */}
          <div className="h-[600px] lg:h-full relative z-10">
            <div className="absolute -top-8 left-0 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              Step 1: The Original Template
            </div>
            <WorldCard world={EUROPEAN_SUMMER_WORLD} title="Curated Original" />
          </div>

          {/* Remixed World */}
          <div className="relative h-[600px] lg:h-full z-10">
            <div className="absolute -top-8 left-0 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              Step 3: Your Personalized Remix
            </div>
            <AnimatePresence mode="wait">
              {isRemixing ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl border border-emerald-500/20 rounded-3xl"
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-2 border-emerald-500/20 rounded-full animate-ping" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-emerald-500 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-light tracking-wide mb-3">Crafting your world...</h3>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Rewriting narratives</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Optimizing stops</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Sourcing products</p>
                  </div>
                </motion.div>
              ) : remixedWorld ? (
                <motion.div 
                  key="remixed"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="h-full"
                >
                  <WorldCard world={remixedWorld} title="Your Custom Fork" isRemix />
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <RefreshCw className="w-8 h-8 text-white/10" />
                  </div>
                  <h3 className="text-xl font-light text-white/60 mb-4">Ready for your instructions</h3>
                  <p className="text-sm text-white/30 max-w-xs mx-auto leading-relaxed">
                    Type a request in the bar above to see this world transform into a personalized itinerary.
                  </p>
                  <div className="mt-8 grid grid-cols-1 gap-3 w-full max-w-xs">
                    <div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Try a scenario:</div>
                    <button 
                      onClick={() => setRemixPrompt('A romantic 4-day honeymoon version')}
                      className="text-left p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/40 hover:bg-white/10 hover:text-emerald-400 transition-all"
                    >
                      "A romantic 4-day honeymoon version"
                    </button>
                    <button 
                      onClick={() => setRemixPrompt('Focus on local street food and hidden gems')}
                      className="text-left p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/40 hover:bg-white/10 hover:text-emerald-400 transition-all"
                    >
                      "Focus on local street food and hidden gems"
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {error && (
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <footer className="mt-8 flex items-center justify-between text-[10px] text-white/20 uppercase tracking-[0.3em]">
          <div>VIVERE © 2026 — Personalization Engine v1.0</div>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini 3.1 Pro</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Real-time Search Grounding Enabled</span>
          </div>
        </footer>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
