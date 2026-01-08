
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CONFIG } from './constants';
import { Product, SiteConfig, View, Brand } from './types';
import { Button } from './components/Button';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ShoppingBag, 
  ShieldCheck, 
  Award, 
  Clock, 
  ExternalLink,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Plus,
  Users,
  Target,
  Heart,
  Truck,
  Search,
  CheckCircle,
  ShoppingCart,
  MapPin
} from 'lucide-react';

const App: React.FC = () => {
  // Persistence state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<Brand | 'ALL'>('ALL');

  // Load from LocalStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('timbee_products');
    const savedConfig = localStorage.getItem('timbee_config');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedConfig) setConfig(JSON.parse(savedConfig));
  }, []);

  // Save to LocalStorage
  const updateProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('timbee_products', JSON.stringify(newProducts));
  }, []);

  const updateConfig = useCallback((newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('timbee_config', JSON.stringify(newConfig));
  }, []);

  const handleRedirect = (url: string) => {
    window.open(url, '_blank');
  };

  const filteredProducts = useMemo(() => {
    if (selectedBrandFilter === 'ALL') return products;
    return products.filter(p => p.brand === selectedBrandFilter);
  }, [products, selectedBrandFilter]);

  const NavLink = ({ view, label }: { view: View, label: string }) => (
    <button 
      onClick={() => { setCurrentView(view); setIsMenuOpen(false); }}
      className={`text-sm font-bold tracking-widest transition-colors uppercase py-2 ${currentView === view ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
      style={currentView === view ? { color: config.primaryColor, borderColor: config.primaryColor } : {}}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-blue-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <button onClick={() => setCurrentView('home')} className="text-2xl font-black tracking-tighter text-gray-900 lowercase">
            {config.brandName}
          </button>

          <div className="hidden md:flex items-center gap-10">
            <NavLink view="home" label="Overview" />
            <NavLink view="about" label="About us" />
            <Button 
              onClick={() => setCurrentView('products')} 
              style={{ backgroundColor: config.primaryColor }}
              className="rounded-full px-8"
            >
              Shop All
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b px-6 py-10 flex flex-col gap-8 animate-in slide-in-from-top duration-300">
            <NavLink view="home" label="Overview" />
            <NavLink view="about" label="About us" />
            <Button onClick={() => setCurrentView('products')} style={{ backgroundColor: config.primaryColor }} className="rounded-full">Shop Now</Button>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#fafafa]">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 md:opacity-100">
                <img src="https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Preparing for exercise" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] to-transparent" />
              </div>
              
              <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.2] mb-12 tracking-tight">
                    Browse our latest <br />
                    <span style={{ color: config.primaryColor }}>products</span>
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Button 
                      className="px-12 py-5 text-lg rounded-full shadow-2xl shadow-blue-500/30" 
                      onClick={() => { setSelectedBrandFilter('UPWELLY'); setCurrentView('products'); }}
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      Shop UPWELLY
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-12 py-5 text-lg bg-transparent border-gray-200 rounded-full hover:border-gray-900"
                      onClick={() => { setSelectedBrandFilter('NEOFECT'); setCurrentView('products'); }}
                    >
                      Shop NEOFECT
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Highlight */}
            <section className="py-24 bg-white">
              <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8 justify-items-center">
                <div 
                  className="group relative h-[150px] w-full max-w-[320px] rounded-[2rem] overflow-hidden cursor-pointer bg-[#FFDAB9] border border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6 text-center"
                  onClick={() => { setSelectedBrandFilter('NEOFECT'); setCurrentView('products'); }}
                >
                  <h3 className="text-orange-900 text-2xl font-black mb-1 uppercase tracking-tight">NEOFECT</h3>
                  <p className="text-orange-800 font-medium text-xs">Smart Rehabilitation Solutions</p>
                </div>
                <div 
                  className="group relative h-[150px] w-full max-w-[320px] rounded-[2rem] overflow-hidden cursor-pointer bg-blue-600 border border-blue-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6 text-center"
                  onClick={() => { setSelectedBrandFilter('UPWELLY'); setCurrentView('products'); }}
                >
                  <h3 className="text-white text-2xl font-black mb-1 uppercase tracking-tight">UPWELLY</h3>
                  <p className="text-blue-100 font-medium text-xs">Orthopedic Comfort Series</p>
                </div>
              </div>
            </section>

            {/* Trusted Icons */}
            <section className="bg-gray-50 py-20">
              <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-10 opacity-40">
                {['ISO Certified', 'FDA Approved', 'Physician Recommended', 'Global Shipping', 'Direct Support'].map((txt) => (
                  <span key={txt} className="text-sm font-black uppercase tracking-[0.3em] text-gray-900">{txt}</span>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'about' && (
          <section className="py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                      className="w-full h-full object-cover" 
                      alt="Health supports display"
                    />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600 rounded-full flex items-center justify-center p-8 text-white text-center shadow-xl" style={{ backgroundColor: config.primaryColor }}>
                    <p className="font-black italic text-xl">Connecting you with premium care since 2025.</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight uppercase">
                    Your Trusted <span style={{ color: config.primaryColor }}>Product Gateway</span>
                  </h2>
                  <p className="text-xl text-gray-500 mb-8 leading-relaxed font-medium">
                    {config.brandName} started in 2025 to simplify how you find and purchase the best medical supports. We are a dedicated distributor, not a manufacturer, which allows us to stay objective and only recommend what truly works.
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed font-medium">
                    Our job is simple: we scout for the highest quality gear from brands like NEOFECT and UPWELLY, and we make it easy for you to buy them through Amazon. We handle the curation so you can focus on your recovery with tools that have already been vetted for quality and reliability.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { icon: <Search />, title: "Carefully Selected", desc: "We browse the market to find only the most reliable medical supports for our collection." },
                  { icon: <Truck />, title: "Easy Access", desc: "We link you directly to verified Amazon listings for fast and secure global delivery." },
                  { icon: <CheckCircle />, title: "Verified Brands", desc: "We only partner with established names like NEOFECT and UPWELLY to ensure you get the real deal." }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-12 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-500 group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:scale-110 transition-transform" style={{ color: config.primaryColor }}>
                      {/* Fixed: cast ReactElement to <any> to allow the 'size' prop to be recognized */}
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentView === 'products' && (
          <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Professional Series</h1>
                <div className="flex flex-wrap gap-3">
                  {(['ALL', 'NEOFECT', 'UPWELLY'] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrandFilter(b)}
                      className={`px-8 py-3 rounded-full text-xs font-black tracking-widest transition-all ${selectedBrandFilter === b ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 max-w-sm font-medium">Filtered results for high-performance orthopedic and rehabilitation medical devices.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} config={config} onRedirect={handleRedirect} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-gray-400 font-bold uppercase tracking-widest">No products found for this category.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1">
            <h3 className="text-3xl font-black mb-8 tracking-tighter lowercase">{config.brandName}<span style={{ color: config.primaryColor }}>.</span></h3>
            <p className="text-gray-400 mb-8 leading-relaxed font-medium">
              {config.footerAbout}
            </p>
            <div className="flex flex-col gap-4">
              {config.amazonUrl && (
                <button 
                  onClick={() => window.open(config.amazonUrl, '_blank')}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5 flex items-center justify-center gap-2 group w-fit"
                >
                  <ShoppingCart size={18} className="group-hover:scale-110 transition-transform text-orange-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest mr-1">Shop Amazon</span>
                </button>
              )}
              {config.address && (
                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">
                  <MapPin size={14} className="text-gray-600" />
                  <span>{config.address}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[10px] tracking-[0.3em] uppercase text-gray-500">Brands</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li><button onClick={() => { setSelectedBrandFilter('NEOFECT'); setCurrentView('products'); }} className="hover:text-white transition-colors">NEOFECT Rehabilitation</button></li>
              <li><button onClick={() => { setSelectedBrandFilter('UPWELLY'); setCurrentView('products'); }} className="hover:text-white transition-colors">UPWELLY Orthopedic</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[10px] tracking-[0.3em] uppercase text-gray-500">Support</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Amazon Link Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><button onClick={() => setIsAdminOpen(true)} className="hover:text-white text-[10px] opacity-20">Admin Panel</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[10px] tracking-[0.3em] uppercase text-gray-500">Updates</h4>
            <div className="flex flex-col gap-4">
              <input type="email" placeholder="Professional email" className="bg-white/5 border border-white/10 px-5 py-3 rounded-full text-sm outline-none focus:border-white/30 transition-all" />
              <Button style={{ backgroundColor: config.primaryColor }} className="rounded-full">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] font-black uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {config.brandName}. {config.footerCopyright}</p>
          <p className="flex items-center gap-2 mt-4 md:mt-0">Certified Amazon Affiliate <ExternalLink size={12} /></p>
        </div>
      </footer>

      {/* Admin Dashboard */}
      {isAdminOpen && (
        <AdminDashboard 
          products={products}
          config={config}
          onUpdateProducts={updateProducts}
          onUpdateConfig={updateConfig}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

// Internal Product Card Component
interface ProductCardProps {
  product: Product;
  config: SiteConfig;
  onRedirect: (url: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, config, onRedirect }) => {
  return (
    <div className="group bg-white flex flex-col h-full border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 rounded-3xl overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer" onClick={() => onRedirect(product.amazonUrl)}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg ${product.brand === 'NEOFECT' ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}>
            {product.brand}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="mb-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1 block">{product.category}</span>
          <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
            {product.name}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-8 flex-1 leading-relaxed font-medium line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-gray-900">{product.price}</span>
          <button 
            onClick={() => onRedirect(product.amazonUrl)}
            className="p-3 bg-gray-900 text-white rounded-full hover:scale-110 transition-all group/btn"
            style={{ backgroundColor: config.primaryColor }}
          >
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
