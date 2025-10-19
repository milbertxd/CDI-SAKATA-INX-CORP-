import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import 'swiper/css';

const accentCyan = '#00fbff';
const accentGray = '#808080';
const accentWhite = '#FFFFFF';
const accentTeal = '#437070';

const heroImages = [
  '/bg-cdi.png',
  '/cd-building.jpg',
];

const stats = [
  { label: 'Founded', value: '1964', img: '/cd-building.jpg' },
  { label: 'Years of Excellence', value: '60+', img: '/building.jpg' },
  { label: 'Countries', value: '15+', img: '/china1.jpg' },
  { label: 'Trusted Partner', value: 'Global', img: '/cdipic1.jpg' },
];

const Hero = () => {
  // Commented out since botanical sections are disabled
  // const [showBotanical, setShowBotanical] = useState(false);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Add these new states for dynamic gallery
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  // Add this helper function at the top of your component
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's an uploaded file path, prepend API base URL
    if (imagePath.startsWith('/uploads/')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    
    // For public images (like /solvent.jpg), return as is
    return imagePath;
  };

  // Fetch gallery images from database
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setGalleryLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/gallery`);
        console.log('Gallery images loaded:', response.data);
        
        // Transform the data and ensure proper URLs
        const transformedImages = response.data.map((item: any) => ({
          src: getImageUrl(item.image_url), // Use the helper function here too
          title: item.title,
          description: item.description,
          id: item.id
        }));
        
        console.log('🔍 Transformed gallery images:', transformedImages);
        setGalleryImages(transformedImages);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Fallback to static images if API fails
        const fallbackImages = [
          { src: '/solvent.jpg', title: 'Premium Solvent Solutions', description: 'High-quality solvent-based inks' },
          { src: '/belle-color.jpg', title: 'Belle Color Technology', description: 'Premium color technology' },
          { src: '/spvc.jpg', title: 'SPVC Printing Systems', description: 'Specialized SPVC systems' },
          { src: '/dx-60.jpg', title: 'DX-60 Advanced Formula', description: 'Advanced DX-60 formula' },
          { src: '/dlo.jpg', title: 'DLO High-Performance Inks', description: 'High-performance DLO inks' },
          { src: '/new-ppl.jpg', title: 'New PPL Technology', description: 'Next-generation PPL technology' },
          { src: '/rotoflex.jpg', title: 'Rotoflex Printing Solutions', description: 'Professional rotoflex systems' },
          { src: '/nt-spvc.jpg', title: 'NT-SPVC Next Generation', description: 'Advanced NT-SPVC technology' },
        ];
        setGalleryImages(fallbackImages);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Update your gallery calculations to use dynamic data
  const cardWidth = 320;
  const cardGap = 32;
  const cardStep = cardWidth + cardGap;
  const totalImages = galleryImages.length || 8; // fallback to 8 if no images
  
  const [translateX, setTranslateX] = useState(-totalImages * cardStep);

  // Update your animation logic
  useEffect(() => {
    if (!isManualControl && galleryImages.length > 0) {
      const interval = setInterval(() => {
        setTranslateX(current => {
          const newPos = current - 2;
          
          if (newPos <= -2 * totalImages * cardStep) {
            return -totalImages * cardStep;
          }
          
          return newPos;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isManualControl, totalImages, cardStep, galleryImages.length]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    
    setIsManualControl(true);
    setIsTransitioning(true);
    
    // Move to next slide
    const newTranslate = translateX - cardStep;
    setTranslateX(newTranslate);
    
    // After transition completes, check if we need to seamlessly reset position
    setTimeout(() => {
      setIsTransitioning(false);
      
      // If we've moved past the second set, instantly reset to the first set position
      // This happens when the user can't see it (during the smooth transition)
      const resetThreshold = -2 * totalImages * cardStep;
      if (newTranslate <= resetThreshold) {
        // Instantly jump back to equivalent position in first set (invisible to user)
        setTranslateX(-totalImages * cardStep);
      }
      
      // Resume auto-animation immediately
      setIsManualControl(false);
    }, 300); // Match transition duration
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    
    setIsManualControl(true);
    setIsTransitioning(true);
    
    // Move to previous slide
    const newTranslate = translateX + cardStep;
    setTranslateX(newTranslate);
    
    // After transition completes, check if we need to seamlessly reset position
    setTimeout(() => {
      setIsTransitioning(false);
      
      // If we've moved before the first set, instantly reset to the second set position
      const resetThreshold = 0;
      if (newTranslate >= resetThreshold) {
        // Instantly jump to equivalent position in second set (invisible to user)
        setTranslateX(-2 * totalImages * cardStep + cardStep);
      }
      
      // Resume auto-animation immediately
      setIsManualControl(false);
    }, 300); // Match transition duration
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-60" />
        </div>

        <div className="relative z-20 px-6 max-w-6xl mx-auto text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-black text-white mb-5 leading-tight text-left mx-auto max-w-5xl ml-2 sm:ml-4 lg:ml-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CDI SAKATA INX CORP.
            </span>
          </h1>  
          <div
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[850px] h-[6px] sm:h-[8px] lg:h-[10px] mt-4 rounded-full ml-1 sm:ml-3 lg:ml-5 mb-8 sm:mb-12 lg:mb-16"
            style={{
              background: 'linear-gradient(to right, #dcdcdc 0%, #bfbfbf 75%, #0072ce 75%, #0072ce 100%)'
            }}
          ></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              to="/products"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
            >
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="group border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-start px-8 py-20"
        style={{ background: `linear-gradient(135deg, ${accentCyan}20 0%, ${accentWhite} 100%)` }}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Swiper
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            modules={[Autoplay]}
            className="w-full h-full"
          >
            {heroImages.map((src, i) => (
              <SwiperSlide key={i}>
                <img src={src} alt={`Slide ${i + 1}`} className="w-full h-full object-cover opacity-60" />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Gradient overlay on top of image */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400/60 to-transparent z-10" />
        </div>
       
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight drop-shadow-xl" style={{ color: '#203f56ff' }}>
            shaping tomorrow together
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: 'white' }}>
           We aim to be the most cost-efficient plant in the industry—
driving innovation, sustainability, and excellence in ink technologies,
while cultivating a culture of joy, color, and purpose.


          </h3>
        </div>
      </section>

      {/* Featured Ink Solutions - Premium Redesign */}
      <section id="innovation" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-200/20 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/20 rounded-full blur-lg animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Premium Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                Innovation Showcase
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Featured <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent ">Ink Solutions</span>
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our revolutionary ink technologies that power everyday products across industries, 
              delivering exceptional quality and sustainable innovation.
            </p>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-32"></div>
              <div className="mx-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-32"></div>
            </div>
          </div>

          {/* Updated Product Showcase */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
            >
              <ArrowRight className="w-6 h-6 text-gray-700 rotate-180 group-hover:text-blue-600 transition-colors" />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
            >
              <ArrowRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>

            {/* Product Cards Container - Updated */}
            <div className="overflow-hidden mx-12">
              {galleryLoading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="ml-4 text-gray-600">Loading gallery...</span>
                </div>
              ) : (
                <div 
                  className={`flex gap-8 ${isTransitioning ? 'transition-transform duration-300 ease-in-out' : ''}`}
                  style={{ 
                    transform: `translateX(${translateX}px)`
                  }}
                >
                  {/* Create triple array for seamless infinite scroll */}
                  {[...galleryImages, ...galleryImages, ...galleryImages].map((item, i) => {
                    const imageIndex = i % galleryImages.length;
                    const setIndex = Math.floor(i / galleryImages.length);
                    
                    return (
                      <div key={`set-${setIndex}-img-${imageIndex}`} className="group flex-shrink-0 relative">
                        <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-4">
                          <img 
                            src={getImageUrl(item.src)} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              console.error('Image failed to load:', item.src);
                              console.log('Attempting fallback for:', item.title);
                              // Try fallback image
                              e.currentTarget.src = '/solvent.jpg';
                            }}
                            onLoad={() => {
                              console.log('✅ Image loaded successfully:', item.title);
                            }}
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="mb-3">
                              <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide">
                                Premium Series
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                              {item.title}
                            </h3>
                            <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 bg-white rounded-full animate-ping"></div>
                          </div>
                        </div>
                        
                        <div className="absolute -top-0 -right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                          #{imageIndex + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Bottom CTA Section */}
          <div className="text-center mt-20">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="text-left flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Explore Our Complete Portfolio</h3>
                <p className="text-gray-600 text-sm">Discover over 15+ specialized ink solutions</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                >
                  View All Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/policies"
                  className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                >
                  Quality Policies
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* 
     BOTANICAL INK SECTION - COMMENTED OUT
     <section id="botanical" className="relative py-32 overflow-hidden">
       ...all botanical section content...
     </section>

     INDUSTRIAL INKJET INKS SECTION - COMMENTED OUT  
     <section id="industrial" className="relative py-32 overflow-hidden">
       ...all industrial section content...
     </section>
*/}

      <section id="impact" className="py-16" style={{ background: accentWhite }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: accentTeal }}>
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-lg h-64 flex items-center justify-center p-6"
              >
                {/* Background Image */}
                <img
                  src={stat.img}
                  alt={stat.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Black gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

                {/* Text content */}
                <div className="relative z-20 text-center">
                  <div className="text-xl md:text-2xl font-bold mb-5 text-cyan-300 drop-shadow-lg">
                    {stat.label}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Animations & Styles */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes slideShow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes seamlessSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        
        /* Smooth scrolling for the gallery */
        @media (prefers-reduced-motion: no-preference) {
          .flex { 
            scroll-behavior: smooth; 
          }
        }
        
        /* Custom gradient animation */
        .bg-gradient-animated {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Glow effect for interactive elements */
        .hover\\:glow:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3);
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
};

export default Hero;
