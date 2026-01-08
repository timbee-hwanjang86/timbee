
import React, { useState } from 'react';
import { Product, SiteConfig, Brand } from '../types';
import { Button } from './Button';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Settings, 
  Package, 
  X, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  DollarSign, 
  Tag,
  Eye,
  Layout,
  Globe,
  ShoppingCart,
  MapPin,
  LogOut
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  config: SiteConfig;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateConfig: (config: SiteConfig) => void;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  config,
  onUpdateProducts,
  onUpdateConfig,
  onClose,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'general' | 'footer'>('products');

  // Product Edit Form State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (products.find(p => p.id === editingProduct.id)) {
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      onUpdateProducts([...products, editingProduct]);
    }
    setEditingProduct(null);
  };

  const initiateNewProduct = () => {
    setEditingProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      category: '',
      brand: 'NEOFECT',
      description: '',
      price: '',
      imageUrl: '',
      amazonUrl: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto selection:bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your NEOFECT & UPWELLY product lines and site configurations.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onLogout} className="flex items-center gap-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200">
              <LogOut size={18} /> Log Out
            </Button>
            <Button variant="outline" onClick={onClose} className="flex items-center gap-2 border-gray-200 hover:border-gray-900">
              <X size={18} /> Close
            </Button>
          </div>
        </header>

        <div className="flex gap-2 mb-10 bg-gray-100 p-1.5 rounded-xl max-w-lg">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'products' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'general' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Settings size={18} /> General
          </button>
          <button 
            onClick={() => setActiveTab('footer')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'footer' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Layout size={18} /> Footer
          </button>
        </div>

        {/* --- Products Tab --- */}
        {activeTab === 'products' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Catalog Management</h2>
                <p className="text-gray-500 text-sm">{products.length} products total</p>
              </div>
              <Button onClick={initiateNewProduct} className="flex items-center gap-2 shadow-lg shadow-blue-500/20" style={{ backgroundColor: config.primaryColor }}>
                <Plus size={18} /> Add New Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="group border border-gray-100 rounded-2xl p-5 flex gap-5 bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 truncate pr-2">{product.name}</h3>
                        <div className="flex gap-1 mt-1">
                          <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase rounded-md ${product.brand === 'NEOFECT' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                            {product.brand}
                          </span>
                          <span className="inline-block px-2 py-0.5 bg-gray-100 text-[9px] font-bold uppercase text-gray-500 rounded-md">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingProduct(product)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-blue-600" style={{ color: config.primaryColor }}>{product.price}</p>
                      <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900"><LinkIcon size={14} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- General Tab --- */}
        {activeTab === 'general' && (
          <div className="animate-in fade-in duration-500 max-w-2xl bg-gray-50 p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><Settings className="text-blue-600" style={{ color: config.primaryColor }} /> General Settings</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Website Branding</label>
                <div className="space-y-4">
                   <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 font-medium">Brand Display Name</span>
                    <input 
                      type="text" 
                      value={config.brandName} 
                      onChange={(e) => onUpdateConfig({...config, brandName: e.target.value})}
                      className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 font-medium">Primary UI Color</span>
                    <div className="flex gap-3 items-center">
                      <input 
                        type="color" 
                        value={config.primaryColor} 
                        onChange={(e) => onUpdateConfig({...config, primaryColor: e.target.value})}
                        className="h-12 w-16 p-1 border border-gray-200 rounded-xl cursor-pointer bg-white"
                      />
                      <input 
                        type="text" 
                        value={config.primaryColor} 
                        onChange={(e) => onUpdateConfig({...config, primaryColor: e.target.value})}
                        className="flex-1 border-gray-200 border rounded-xl px-4 py-3 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Meta Information</label>
                <textarea 
                  rows={3}
                  value={config.seoDescription} 
                  onChange={(e) => onUpdateConfig({...config, seoDescription: e.target.value})}
                  className="w-full border-gray-200 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Website description..."
                />
              </div>
            </div>
          </div>
        )}

        {/* --- Footer Tab --- */}
        {activeTab === 'footer' && (
          <div className="animate-in fade-in duration-500 max-w-2xl bg-gray-50 p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><Layout className="text-blue-600" style={{ color: config.primaryColor }} /> Footer Settings</h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 font-medium">About Section Text</span>
                  <textarea 
                    rows={4}
                    value={config.footerAbout} 
                    onChange={(e) => onUpdateConfig({...config, footerAbout: e.target.value})}
                    className="w-full border-gray-200 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Short description for the footer..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 font-medium">Copyright Text</span>
                  <input 
                    type="text" 
                    value={config.footerCopyright} 
                    onChange={(e) => onUpdateConfig({...config, footerCopyright: e.target.value})}
                    className="w-full border-gray-200 border rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <ShoppingCart size={16} /> Global Amazon Link
                </label>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Main Amazon Storefront URL</span>
                  <input 
                    type="text" 
                    value={config.amazonUrl} 
                    onChange={(e) => onUpdateConfig({
                      ...config, 
                      amazonUrl: e.target.value
                    })}
                    placeholder={`https://amazon.com/your-store`}
                    className="w-full border-gray-200 border rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- PRODUCT MODAL --- */}
        {editingProduct && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{editingProduct.name ? 'Edit Product' : 'New Product'}</h3>
                  <p className="text-gray-500 text-sm">Assign to NEOFECT or UPWELLY brand lines.</p>
                </div>
                <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X /></button>
              </div>

              <form onSubmit={handleSaveProduct} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <Tag size={12} /> Product Name
                    </label>
                    <input 
                      placeholder="Product Name" 
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      value={editingProduct.name} 
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      Brand Category
                    </label>
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                      {['NEOFECT', 'UPWELLY'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setEditingProduct({...editingProduct, brand: b as Brand})}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${editingProduct.brand === b ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Package size={12} /> Category
                      </label>
                      <input 
                        placeholder="e.g., Rehab" 
                        className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        value={editingProduct.category} 
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <DollarSign size={12} /> Price
                      </label>
                      <input 
                        placeholder="$0.00" 
                        className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        value={editingProduct.price} 
                        onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <LinkIcon size={12} /> Amazon Link
                    </label>
                    <input 
                      placeholder="https://..." 
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      value={editingProduct.amazonUrl} 
                      onChange={e => setEditingProduct({...editingProduct, amazonUrl: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                    <textarea 
                      rows={3}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                      value={editingProduct.description} 
                      onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon size={12} /> Image URL
                    </label>
                    <input 
                      placeholder="https://..." 
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      value={editingProduct.imageUrl} 
                      onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><Eye size={12}/> Preview</label>
                    <div className="aspect-square w-full bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-center overflow-hidden">
                      {editingProduct.imageUrl ? (
                        <img src={editingProduct.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={32} className="text-gray-200" />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1 py-4" style={{ backgroundColor: config.primaryColor }}>Save</Button>
                    <Button type="button" variant="outline" className="flex-1 py-4" onClick={() => setEditingProduct(null)}>Cancel</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
