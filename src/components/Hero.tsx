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
  const [showBotanical, setShowBotanical] = useState(false);
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

  // Update your handleNextSlide and handlePrevSlide functions to use galleryImages.length

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

          {/* Bottom CTA Section */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Explore Our Complete Portfolio</h3>
                <p className="text-gray-600 text-sm">Discover over 15+ specialized ink solutions</p>
              </div>
              <Link
                to="/products"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

     {/* Botanical Ink Section - World Class Premium Design */}
<section id="botanical" className="relative py-32 overflow-hidden">
  {/* Dynamic Background with Parallax */}
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
    {/* Animated Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-20 left-1/4 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl animate-float-botanical"></div>
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-teal-300/25 rounded-full blur-2xl animate-drift"></div>
      <div className="absolute bottom-1/3 right-10 w-24 h-24 bg-cyan-300/30 rounded-full blur-xl animate-bounce-slow"></div>
    </div>
    
    {/* Organic Pattern Overlay */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <pattern id="botanical-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="currentColor" className="text-emerald-500">
            <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
          </circle>
          <path d="M5,5 Q10,0 15,5 Q10,10 5,5" fill="currentColor" className="text-teal-400" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0 10 10;360 10 10" dur="20s" repeatCount="indefinite"/>
          </path>
        </pattern>
        <rect width="100%" height="100%" fill="url(#botanical-pattern)"/>
      </svg>
    </div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* Premium Section Header */}
    <div className="text-center mb-20">
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-emerald-500"></div>
        <span className="px-6 py-3 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-bold tracking-widest uppercase border border-emerald-200/50">
          🌱 Sustainable Innovation
        </span>
        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-emerald-500"></div>
      </div>
      
      <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
        <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
          BOTANICAL
        </span>
        <br />
        <span className="text-gray-800">INK REVOLUTION</span>
      </h2>
      
      <div className="flex items-center justify-center mt-6">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-40"></div>
        <div className="mx-6 flex gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping delay-100"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-200"></div>
        </div>
        <div className="h-px bg-gradient-to-l from-transparent via-emerald-400 to-transparent w-40"></div>
      </div>
    </div>

    {/* Main Content Container */}
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      
      {/* Revolutionary Image Showcase */}
      <div className="relative group">
        {/* Main Product Image with 3D Effects */}
        <div className="relative">
          {/* Floating Halo Effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-blue-400/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse-glow"></div>
          
          {/* Glass Card Container */}
          <div className="relative bg-white/40 backdrop-blur-xl border border-white/30 rounded-[2.5rem] p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-4">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="/pic3.jpg"
                alt="Botanical Ink Revolution"
                className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              
              {/* Image Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Info Badges */}
              <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                10%+ Plant-Based
              </div>
              <div className="absolute bottom-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                Eco-Certified
              </div>
            </div>
            
            {/* Interactive Particle System */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-emerald-400/60 rounded-full animate-particle"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${30 + (i * 10)}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + (i * 0.5)}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Content Section */}
      <div className="space-y-8">
        {/* Revolutionary Headline */}
        <div className="space-y-6">
          <h3 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">
            The Future of
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sustainable Printing
            </span>
          </h3>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Our revolutionary botanical inks are formulated with 
            <span className="font-bold text-emerald-600"> 10% or more plant-based ingredients</span>—
            delivering an eco-conscious solution that dramatically reduces environmental impact while 
            maintaining vibrant, professional-grade print quality.
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "🌱", title: "Plant-Based", desc: "Natural ingredients" },
            { icon: "♻️", title: "Sustainable", desc: "Eco-friendly process" },
            { icon: "🎨", title: "Vibrant Colors", desc: "Premium quality" },
            { icon: "🏆", title: "Award Winning", desc: "Industry recognized" }
          ].map((feature, i) => (
            <div key={i} className="group bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-4 hover:bg-white/80 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <div className="text-sm font-bold text-gray-900">{feature.title}</div>
              <div className="text-xs text-gray-600">{feature.desc}</div>
            </div>
          ))}
        </div>

        {/* Expandable Details Section */}
        <div className="space-y-4">
          <button
            className="group flex items-center gap-3 text-lg font-bold text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
            onClick={() => setShowBotanical(!showBotanical)}
          >
            <span className="relative">
              {showBotanical ? 'Hide Technical Details' : 'Discover the Science'}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </span>
            <div className={`transform transition-transform duration-300 ${showBotanical ? 'rotate-180' : 'rotate-0'}`}>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {showBotanical && (
            <div className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-lg border border-emerald-200/50 rounded-2xl p-8 shadow-xl animate-expand-in">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Innovation Breakthrough</h4>
                
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">🧬</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">Advanced Formulation</h5>
                      <p className="text-gray-700 text-sm">Our proprietary botanical extraction process ensures optimal performance while maintaining environmental responsibility.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">🎯</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">Precision Engineering</h5>
                      <p className="text-gray-700 text-sm">Each botanical ink batch undergoes rigorous testing to ensure consistent color accuracy and print reliability.</p>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="mt-6 space-y-3">
                  {[
                    { label: "Environmental Impact Reduction", value: 85 },
                    { label: "Color Accuracy", value: 98 },
                    { label: "Print Durability", value: 92 }
                  ].map((metric, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-700">{metric.label}</span>
                        <span className="text-emerald-600">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Premium CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link
            to="/policies"
            className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
          >
            <span className="relative z-10">View Sustainability Policies</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
          
          <button className="group bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400 text-emerald-700 hover:text-emerald-800 px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            Download Technical Specs
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Innovation Showcase */}
    <div className="mt-24 text-center">
      <div className="inline-flex items-center gap-8 bg-white/50 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center">
          <div className="text-3xl font-black text-emerald-600 mb-1">2024</div>
          <div className="text-sm text-gray-600 font-semibold">Innovation Award</div>
        </div>
        <div className="w-px h-12 bg-gray-300"></div>
        <div className="text-center">
          <div className="text-3xl font-black text-blue-600 mb-1">20+</div>
          <div className="text-sm text-gray-600 font-semibold">Countries</div>
        </div>
        <div className="w-px h-12 bg-gray-300"></div>
        <div className="text-center">
          <div className="text-3xl font-black text-teal-600 mb-1">1M+</div>
          <div className="text-sm text-gray-600 font-semibold">Tons Saved</div>
        </div>
      </div>
    </div>
  </div>
</section>


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
        
        /* Botanical Section Premium Animations */
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        
        .animate-float-botanical {
          animation: floatBotanical 8s ease-in-out infinite;
        }
        
        .animate-drift {
          animation: drift 12s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle 4s ease-in-out infinite;
        }
        
        .animate-expand-in {
          animation: expandIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes floatBotanical {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(20px) rotate(90deg); }
          50% { transform: translateY(-10px) translateX(-15px) rotate(180deg); }
          75% { transform: translateY(20px) translateX(10px) rotate(270deg); }
        }
        
        @keyframes drift {
          0% { transform: translateX(-20px) translateY(0px); }
          25% { transform: translateX(20px) translateY(-15px); }
          50% { transform: translateX(-10px) translateY(20px); }
          75% { transform: translateX(15px) translateY(-10px); }
          100% { transform: translateX(-20px) translateY(0px); }
        }
        
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; filter: blur(20px); }
          50% { opacity: 0.8; filter: blur(30px); }
        }
        
        @keyframes particle {
          0% { 
            opacity: 0; 
            transform: translateY(0px) scale(0.5); 
          }
          20% { 
            opacity: 1; 
            transform: translateY(-10px) scale(1); 
          }
          80% { 
            opacity: 1; 
            transform: translateY(-20px) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(-30px) scale(0.5); 
          }
        }
        
        @keyframes expandIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        /* Enhanced hover effects */
        .hover\\:glow-emerald:hover {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2);
        }
        
        /* Gradient text animation */
        .bg-gradient-animate {
          background: linear-gradient(-45deg, #10b981, #14b8a6, #3b82f6, #6366f1);
          background-size: 400% 400%;
          animation: gradientFlow 8s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

export default Hero;
