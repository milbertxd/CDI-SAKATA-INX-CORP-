import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { API_ENDPOINTS, getImageUrl, API_BASE_URL } from '../config/api';
import { Palette, Zap, Shield, Leaf, Sparkles, ChevronRight, Flame, Star, Award, Globe, Target, Send, Plus, Minus, X, Mail, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('digital');
  const [dynamicProducts, setDynamicProducts] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{ image: string; title: string } | null>(null);
  
  // Certificate state
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certificatesLoading, setCertificatesLoading] = useState(true);
  
  // Cart state
  const [cart, setCart] = useState<Array<{id: string, title: string, subtitle: string, quantity: number}>>([]);
  const [showCart, setShowCart] = useState(false);

  // Check URL parameters for category on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && ['digital', 'offset', 'specialty', 'sustainable'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);

  // Add to cart function
  const addToCart = (product: any) => {
    const productId = `${product.title}-${activeCategory}`;
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: productId,
        title: product.title,
        subtitle: product.subtitle,
        quantity: 1
      }]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Generate email with cart contents
  const sendCartEmail = () => {
    const subject = encodeURIComponent('Product Request from CDI SAKATA Website');
    const cartDetails = cart.map(item => 
      `• ${item.title} (${item.subtitle}) - Quantity: ${item.quantity}`
    ).join('\n');
    
    const body = encodeURIComponent(`
Dear CDI SAKATA INX CORP Team,

I would like to request information and quotations for the following products:

${cartDetails}

Please provide:
- Product specifications
- Pricing information
- Minimum order quantities
- Delivery timeframes
- Technical support details

Contact Information:
[Please fill in your details]
- Name: 
- Company: 
- Email: 
- Phone: 
- Address: 

Thank you for your assistance.

Best regards,
[Your Name]
    `);

    const mailtoLink = `mailto:mico.alano999@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Clear cart after sending
    setCart([]);
    setShowCart(false);
    
    // Show confirmation
    alert('Your email client should open with the product request. Please fill in your contact information and send the email.');
  };

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`🔍 Fetching from ${API_ENDPOINTS.PRODUCTS}`);
        const response = await axios.get(API_ENDPOINTS.PRODUCTS);
        const allProducts = response.data;
        
        console.log(`✅ Successfully fetched ${allProducts.length} products`);
        
        // Group products by category
        const groupedProducts = {
          digital: allProducts.filter((p: any) => p.category === 'digital'),
          offset: allProducts.filter((p: any) => p.category === 'offset'),
          specialty: allProducts.filter((p: any) => p.category === 'specialty'),
          sustainable: allProducts.filter((p: any) => p.category === 'sustainable'),
        };
        
        setDynamicProducts(groupedProducts);
        setLoading(false);
      } catch (error) {
        console.error('❌ Failed to fetch products:', error);
        console.log('💡 Make sure your backend server is running!');
        console.log('💡 Run: cd backend && node server-with-routes.js');
        setLoading(false);
        // Fallback to static data if API fails
        setDynamicProducts(staticProducts);
      }
    };

    fetchProducts();
  }, []);

  // Fetch certificates from database
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        console.log(`🏆 Fetching certificates from ${API_ENDPOINTS.CERTIFICATES}`);
        const response = await axios.get(API_ENDPOINTS.CERTIFICATES);
        setCertificates(response.data);
        console.log(`✅ Successfully fetched ${response.data.length} certificates`);
        setCertificatesLoading(false);
      } catch (error) {
        console.error('❌ Failed to fetch certificates:', error);
        setCertificatesLoading(false);
        // Fallback to empty array if API fails
        setCertificates([]);
      }
    };

    fetchCertificates();
  }, []);

  const productCategories = [
    { id: 'digital', name: 'Solvent-Based Inks', icon: Flame },
    { id: 'offset', name: 'Water-Based Inks', icon: Palette },
    { id: 'specialty', name: 'Metal Coating and Glass Enamel', icon: Shield },
    { id: 'sustainable', name: 'Eco-Friendly and Others', icon: Leaf },
  ];

  // Static fallback data (same as your original data)
  const staticProducts = {

    offset: [

  {
    title: "W-Flex / CF Inks",
    subtitle: "Water-Based Flexographic Inks",
    description: "High-quality flexo inks for corrugated board and paper packaging, offering excellent adhesion and print sharpness.",
    features: ["Low odor", "Quick drying", "Strong color hold", "FDA-compliant"],
    applications: ["Corrugated boxes", "Paper cups", "Tissue packaging", "Food wraps"],
    image: "/w-flex.png"
  }
],


    digital: [
  {
    title: "Lamiall Inks",
    subtitle: "Solvent-Based Lamination Series",
    description: "High-gloss inks made for laminated flexible packaging with strong solvent resistance and print fidelity.",
    features: ["High bond strength", "Glossy finish", "Excellent printability", "Solvent resistance"],
    applications: ["Snack packaging", "Flexible pouches", "Chips bags", "Condiment sachets"],
    image: "/images/lamiall.jpg"
  },
  {
    title: "New PPL Inks",
    subtitle: "Solvent Series for Film Substrates",
    description: "Premium solvent-based inks developed for various plastic films like OPP and PET, offering quick drying and vibrant color.",
    features: ["Fast drying", "Film-compatible", "Sharp dot reproduction", "Resistant to smudging"],
    applications: ["Ice cream wrappers", "Bottle labels", "Plastic sachets", "Cosmetic packaging"],
    image: "/newppl.png"
  }
],

    specialty: [
  {
    title: "Metal Coatings",
    subtitle: "Protective Industrial Finishes",
    description: "Durable coatings for metal surfaces providing resistance to corrosion, chemicals, and high temperatures.",
    features: ["Scratch-resistant", "High chemical stability", "Smooth finish", "Strong adhesion on metal"],
    applications: ["Steel cans", "Aerosol containers", "Metal signs", "Toolboxes"],
    image: "/metal.png"
  },
  {
    title: "Tin Printing Inks",
    subtitle: "High-Gloss Metal Decorating",
    description: "Specialized inks for tinplate printing with vibrant color, gloss retention, and resistance to baking temperatures.",
    features: ["Heat-resistant", "Sharp registration", "Gloss retention", "Food-safe options available"],
    applications: ["Canned goods", "Decorative tins", "Biscuit cans", "Paint pails"],
    image: "/tin.png"
  },
  {
    title: "2-Piece Can Inks",
    subtitle: "High-Speed Beverage Can Printing",
    description: "Advanced inks formulated for 2-piece beverage cans, offering excellent adhesion, drying speed, and print clarity under high-speed production.",
    features: ["High-speed compatibility", "Excellent abrasion resistance", "Gloss or matte finish", "Suitable for aluminum substrates"],
    applications: ["Soft drink cans", "Energy drink cans", "Beer cans", "Aerosol cans"],
    image: "/can2.png"
  }
],

    sustainable: [
        {
    title: "Offset Inks",
    subtitle: "Commercial & Packaging Grade",
    description: "Water-based offset inks designed for sharp image reproduction, consistent drying, and high-speed commercial printing.",
    features: ["Smooth ink transfer", "Fast water balance", "Excellent print definition", "Eco-compliant formulation"],
    applications: ["Books", "Magazines", "Brochures", "Cartons"],
    image: "/images/offset-inks.jpg"
  },
      {
        title: "Bio-Based Ink Series",
        subtitle: "100% Renewable",
        description: "Revolutionary bio-based inks made from renewable resources with zero environmental impact.",
        features: ["100% bio-based", "Biodegradable", "Carbon neutral", "Non-toxic formula"],
        applications: ["Eco packaging", "Children's books", "Organic products", "Green marketing"],
        image: "/images/bio-based-placeholder.jpg"
      }
    ]
  };


  // Cart Modal Component
  const CartModal = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[80vh] overflow-auto relative animate-pop">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-700 flex items-center">
              <Mail className="w-8 h-8 mr-3" />
              Your Requests ({cart.reduce((total, item) => total + item.quantity, 0)} items)
            </h2>
            <button
              className="text-gray-400 hover:text-red-500 text-2xl font-bold p-2"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl">No requests yet</p>
              <p className="text-sm">Add some products to request information!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-blue-600 text-sm">{item.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setCart([])}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    Clear Requests
                  </button>
                  <button
                    onClick={sendCartEmail}
                    className="flex-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Request via Email
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  This will open your email client with the product request details
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Certificate Modal Component
  const CertificateModal = ({ certificate, onClose }: { certificate: { image: string; title: string } | null; onClose: () => void }) => {
    if (!certificate) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <div className="relative max-w-4xl w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
          >
            <span className="text-2xl font-bold">×</span>
          </button>
          
          {/* Certificate image */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-auto max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Certificate title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <h3 className="text-white text-xl font-bold">{certificate.title}</h3>
              <p className="text-gray-200 text-sm">
                Official certification document
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEO 
        title="Premium Printing Inks & Digital Solutions - CDI SAKATA INX Products"
        description="Explore CDI SAKATA INX's comprehensive range of premium printing inks: offset inks, digital printing solutions, eco-friendly inks, specialty coatings, and industrial ink products. ISO-certified quality for professional printing."
        keywords="printing inks, offset inks, digital printing, eco-friendly inks, ink products, CDI Sakata products, specialty coatings, industrial inks, professional printing, ink solutions"
        canonical="/products"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ProductCatalog",
          "name": "CDI SAKATA INX Product Catalog",
          "description": "Comprehensive range of premium printing inks and digital solutions",
          "provider": {
            "@type": "Organization",
            "name": "CDI SAKATA INX CORP"
          },
          "numberOfItems": "100+",
          "category": ["Printing Inks", "Digital Solutions", "Eco-friendly Inks", "Specialty Coatings"]
        }}
      />
      <Header />
      
      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed top-32 right-6 z-40">
          <button
            onClick={() => setShowCart(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-all duration-300 relative"
          >
            <Mail className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && <CartModal onClose={() => setShowCart(false)} />}

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/bg-product.png"
            alt="Products Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-60"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6">
            OUR <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">PRODUCTS</span>
            </h1>
             <div
  className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[600px] h-[6px] sm:h-[8px] lg:h-[10px] mt-3 rounded-full mx-auto"
  style={{
    background: 'linear-gradient(to right, #dcdcdc 0%, #bfbfbf 75%, #0072ce 75%, #0072ce 100%)'
  }}
></div>

            {/* <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mt-8">
              Premium printing inks and coatings engineered for excellence across diverse applications
            </p> */}
            <div className="flex flex-wrap justify-center gap-6 text-lg font-semibold text-white mt-8">
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />ISO 9001 Certified
              </span>
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />Industry Award Winner
              </span>
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />Global Distribution
              </span>
            </div>
          </div>
        </div>
      </div>  
      {/* Product Categories */}
      <div id="product-categories" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center animate-fade-in">
            Product <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Categories</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {productCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group flex items-center px-8 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${
                    activeCategory === category.id ? 'text-white' : 'text-blue-500'
                  }`} />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Product Details */}
          <div className="space-y-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-600 text-xl">Loading products...</div>
              </div>
            ) : (
              dynamicProducts[activeCategory as keyof typeof dynamicProducts]?.map((product: any, index: number) => (
                <div
                  key={index}
                  className="group bg-blue-100 backdrop-blur-xl border border-blue-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] animate-fade-in shadow-lg hover:bg-blue-200"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* LEFT: Info */}
                    <div>
                      <div className="flex items-center mb-4">
                        <Sparkles className="w-8 h-8 text-blue-500 mr-3" />
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-blue-600 font-semibold">{product.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xl font-bold text-blue-600 mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {(product.features || []).map((feature: string, idx: number) => (
                              <li key={idx} className="text-gray-700 flex items-center group/item">
                                <ChevronRight className="w-4 h-4 text-green-500 mr-2 group-hover/item:translate-x-1 transition-transform" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-green-600 mb-3">Applications</h4>
                          <div className="flex flex-wrap gap-2">
                            {(product.applications || []).map((app: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm border border-green-200 hover:scale-110 transition-transform cursor-default"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <button
                          onClick={() => addToCart(product)}
                          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-semibold shadow transition-all duration-300 hover:scale-105"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Request
                        </button>
                        
                        {/* TDS Download Button */}
                        {product.tds_file && (
                          <button
                            onClick={() => {
                              const fileUrl = product.tds_file.startsWith('/uploads/') 
                                ? `${API_BASE_URL}${product.tds_file}` 
                                : product.tds_file;
                              window.open(fileUrl, '_blank');
                            }}
                            className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow transition-all duration-300 hover:scale-105"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download TDS
                          </button>
                        )}
                        
                        {/* SDS Download Button */}
                        {product.sds_file && (
                          <button
                            onClick={() => {
                              const fileUrl = product.sds_file.startsWith('/uploads/') 
                                ? `${API_BASE_URL}${product.sds_file}` 
                                : product.sds_file;
                              window.open(fileUrl, '_blank');
                            }}
                            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-full font-semibold shadow transition-all duration-300 hover:scale-105"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download SDS
                          </button>
                        )}
                      </div>
                    </div>
                    {/* RIGHT: Image */} 
                    <div className="flex items-center justify-center">
                      <img
                        src={(() => {
                          const imageUrl = product.image_url || product.image || "/pic.jpg";
                          return imageUrl.startsWith('/uploads/') 
                            ? getImageUrl(imageUrl) 
                            : imageUrl;
                        })()}
                        alt={product.title}
                        className="w-full object-contain rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg border border-gray-100"
                        style={{ background: "#f8fafc" }}
                        onError={(e) => {
                          console.log(`❌ Failed to load product image: ${product.image_url || product.image}`);
                          (e.target as HTMLImageElement).src = "/pic.jpg";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            
          </div>
        </div>
      </div>

      {/* Industry Recognition - Certificates */}
      <div id="industry-recognition" className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
           Industry <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Recognition</span>
          </h2>
          
          {certificatesLoading ? (
            <div className="flex justify-center">
              <div className="text-gray-600 text-xl">Loading certificates...</div>
            </div>
          ) : certificates.length === 0 ? (
            <div className="flex justify-center">
              <div className="text-gray-500 text-xl">No certificates available</div>
            </div>
          ) : (
            <div className="flex justify-center gap-12 flex-wrap">
              {certificates.map((certificate) => (
                <div 
                  key={certificate.id}
                  className="group cursor-pointer" 
                  onClick={() => {
                    setSelectedCertificate({ 
                      image: certificate.certificate_image.startsWith('/uploads/') 
                        ? getImageUrl(certificate.certificate_image) 
                        : certificate.certificate_image, 
                      title: certificate.title 
                    });
                    setShowCertificateModal(true);
                  }}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl w-64 h-64 flex flex-col justify-center">
                    <img
                      src={certificate.logo_image.startsWith('/uploads/') 
                        ? getImageUrl(certificate.logo_image) 
                        : certificate.logo_image}
                      alt={certificate.title}
                      className="w-40 h-32 object-contain mx-auto group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        console.log(`❌ Failed to load certificate image: ${certificate.logo_image}`);
                        // Fallback to a placeholder or hide the image
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <p className="text-center text-gray-600 text-sm mt-4 font-medium">{certificate.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-center text-gray-500 text-sm mt-8">
            Click on any certificate to view the full document
          </p>
        </div>
      </div>

      {/* News Link Section */}
      <div className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Stay Updated with <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Product News</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover the latest innovations, launches, and updates from our ink technology experts.
          </p>
          <a
            href="/news"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Read Product News
          </a>
        </div>
      </div>
      {showCertificateModal && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => {
            setShowCertificateModal(false);
            setSelectedCertificate(null);
          }}
        />
      )}
      <Footer />
    </div>
  );
};

export default Products;

// Add this to your CSS (e.g., global.css or tailwind config)
// .animate-pop { animation: pop-in 0.3s cubic-bezier(.68,-0.55,.27,1.55) both; }
// @keyframes pop-in { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
