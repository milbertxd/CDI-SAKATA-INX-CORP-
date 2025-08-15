
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Target, Eye, Heart, Users, Globe, X, ZoomIn, Clock, ArrowRight, Star } from 'lucide-react';

const About = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);  


  return (
    <div className="min-h-screen bg-gradient-to-br">
      <SEO 
        title="About CDI SAKATA INX CORP - 60 Years of Printing Excellence"
        description="Learn about CDI SAKATA INX Corporation's journey since 1964, our mission, vision, and commitment to delivering innovative printing ink solutions to over 50 countries worldwide. Discover our values, history, and leadership team."
        keywords="CDI Sakata history, about us, printing ink company, manufacturing excellence, Philippines ink company, company values, leadership team, printing industry pioneer"
        canonical="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About CDI SAKATA INX CORP",
          "description": "Company history and information about CDI SAKATA INX Corporation - a leading printing ink manufacturer since 1964",
          "mainEntity": {
            "@type": "Organization",
            "name": "CDI SAKATA INX CORP",
            "foundingDate": "1964",
            "description": "Leading printing ink manufacturer serving 50+ countries"
          }
        }}
      />
      <Header />
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden min-h-[500px] flex items-center justify-center">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cd-building.jpg"
            alt="About Us Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-60"></div>
        </div>
      
        {/* Content */}
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Us</span>
              <div
  className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[400px] h-[6px] sm:h-[8px] lg:h-[10px] mt-3 rounded-full mx-auto"
  style={{
    background: 'linear-gradient(to right, #dcdcdc 0%, #bfbfbf 75%, #0072ce 75%, #0072ce 100%)'
  }}
></div>
          
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
     
     <div
  id="history"
  className="relative bg-cover bg-center bg-no-repeat py-24 px-6"
  style={{
    backgroundImage: `url('/bg-cdi.png')` }}
>
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>
     <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">History</span>
          </h2>
       
        </div>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Founded in 1964 as Chemical Dispersions, Inc., CDI Sakata INX Corporation began as a local manufacturer of coatings and printing inks. Over the years, it expanded through key international partnerships, including a major collaboration with Coates Brothers UK and eventually a joint venture with Japan’s Sakata INX
            </p>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Corporation in 1992—one of the world’s top ink producers. With a modern facility in Muntinlupa City and continuous investments in technology, CDI Sakata INX has built a strong reputation in the local and export markets. Today, we continue to deliver innovative, high-quality color solutions backed by global expertise and decades of commitment to excellence.
            </p>
          </div>
        </div>
      
    {/* Minimalist Mission, Vision */}
    <div id="mission" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Minimalist Header */}
        <div className="text-center mb-24">
          <div className="inline-block">
            <h2 className="text-6xl md:text-7xl font-light text-gray-900 tracking-tight mb-6">
              Our Foundation
            </h2>
            <div className="h-0.5 w-32 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            The principles that guide everything we do, every innovation we create, and every relationship we build.
          </p>
        </div>

        {/* Clean Cards Grid */}
        <div className="space-y-16">
          
          {/* Mission */}
          <div className="group text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-8 transition-transform group-hover:scale-150"></div>
              <h3 className="text-3xl font-medium text-gray-900 mb-6 tracking-wide">Missions</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Through the implementation of TPM ,we will promote elements.
              </p> 
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Customer Satisfaction: To meet our customers' requirement for every order they make.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Employees Satisfaction: To create a safe workplace that enhances employees’ growth.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Environment Satisfaction : To maintain an accident free Environment.
              </p>
              <div className="w-16 h-0.5 bg-gray-200 mx-auto mt-8 transition-all duration-500 group-hover:bg-blue-500 group-hover:w-24"></div>
            </div>
          </div>

          {/* Vision */}
          <div className="group text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mx-auto mb-8 transition-transform group-hover:scale-150"></div>
              <h3 className="text-3xl font-medium text-gray-900 mb-6 tracking-wide">Vision</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                To be cost efficient plant in the industry.
              </p>
              <div className="w-16 h-0.5 bg-gray-200 mx-auto mt-8 transition-all duration-500 group-hover:bg-cyan-500 group-hover:w-24"></div>
            </div>
          </div>

          

        </div>

        {/* Elegant Quote Section */}
        <div className="mt-32 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-light text-gray-700 leading-relaxed italic">
              "Excellence is not a destination, but a journey of continuous innovation, 
              sustainable practices, and unwavering commitment to quality."
            </blockquote>
            <div className="mt-8">
              <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-4 font-medium tracking-wider uppercase">
                CDI SAKATA INX CORP
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>


      {/* Timeline of Achievements */}
      <div className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six decades of innovation, growth, and excellence in the printing ink industry
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Items */}
            <div className="space-y-16">
              
              {/* Timeline line segment 1 - Early years (1964-1992) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-red-500 rounded-full shadow-lg" style={{ height: '1250px', top: '0px' }}></div>
              
              {/* 1964 - Foundation */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">1964</h3>
                    <p className="text-gray-700 font-medium">Incorporation of Chemical Dispersions, Inc.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-300 rounded-full animate-ping"></div>
                </div>
                <div className="w-5/12 pl-8"></div>
              </div>

              {/* 1967 */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 pr-8"></div>
                <div className="relative">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                </div>
                <div className="w-5/12 text-left pl-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-r-4 border-cyan-500 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-cyan-600 mb-2">1967</h3>
                    <p className="text-gray-700 font-medium">Acquisition of various licenses for printing inks and metal coatings</p>
                  </div>
                </div>
              </div>

              {/* 1971 */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">1971</h3>
                    <p className="text-gray-700 font-medium">Establishment of new factory in Alabang Hills, Muntinlupa</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                </div>
                <div className="w-5/12 pl-8"></div>
              </div>

              {/* 1976 - Major Partnership */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 pr-8"></div>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-lg z-10 relative flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="w-5/12 text-left pl-8">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg border-r-4 border-orange-500 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-orange-600 mb-2">1976</h3>
                    <p className="text-gray-700 font-medium">License agreement with Coates Brothers UK - significant quality development (1976-1992)</p>
                  </div>
                </div>
              </div>

              {/* 1979 */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-cyan-600 mb-2">1979</h3>
                    <p className="text-gray-700 font-medium">Acquired Cerdec license</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                </div>
                <div className="w-5/12 pl-8"></div>
              </div>

              {/* 1990s Era */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 pr-8"></div>
                <div className="relative">
                  <div className="w-6 h-6 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                </div>
                <div className="w-5/12 text-left pl-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-r-4 border-purple-500 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">1990</h3>
                    <p className="text-gray-700 font-medium">IMPACT Enterprise computer System implementation</p>
                  </div>
                </div>
              </div>

              {/* 1992 - Major Milestone */}
              <div className="flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-red-600 mb-2">1992</h3>
                    <p className="text-gray-700 font-medium">Joint Venture with Sakata Inx Corp. Japan</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-4 border-white shadow-lg z-10 relative flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="w-5/12 pl-8"></div>
              </div>

              {/* 2000s - Quality Certifications */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 my-12 border-2 border-green-200">
                <h3 className="text-3xl font-bold text-green-700 mb-6 text-center">Quality & Technology Era</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">1996</div>
                    <p className="text-gray-700">ISO 9002 Acquisition</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">2004</div>
                    <p className="text-gray-700">SHIPS Processing System</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">2008-2009</div>
                    <p className="text-gray-700">ISO 9001 Certifications</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">2011</div>
                    <p className="text-gray-700">Halal Certified IDCP</p>
                  </div>
                </div>
              </div>

              {/* 2010s - Modernization */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 my-12 border-2 border-blue-200">
                <h3 className="text-3xl font-bold text-blue-700 mb-6 text-center">Modernization & Innovation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2012-2014</div>
                    <p className="text-gray-700">Total Factory Plant Renewal</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2013</div>
                    <p className="text-gray-700">TPM Launch</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2014</div>
                    <p className="text-gray-700">50 Years Celebration</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2015</div>
                    <p className="text-gray-700">TPM Gold Award</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2016-2017</div>
                    <p className="text-gray-700">SAP Business One</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2018-2020</div>
                    <p className="text-gray-700">ISO & Halal Recertifications</p>
                  </div>
                </div>
              </div>

              {/* 2024 - Diamond Anniversary */}
              {/* Timeline line segment 2 - Final milestone */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-yellow-500 rounded-full shadow-lg" style={{ height: '0px', top: '1450px' }}></div>
              
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-3xl p-12 shadow-2xl border-4 border-yellow-400 max-w-2xl text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">💎</span>
                  </div>
                  <h3 className="text-4xl font-bold text-amber-700 mb-4">2024</h3>
                  <p className="text-xl text-gray-800 font-semibold mb-4">60 Years Anniversary</p>
                  <p className="text-gray-700">Official opening of New Plant in Cavite - A new chapter begins</p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom decoration */}
          <div className="text-center mt-16">
            <a 
              href="/news/25"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Clock className="w-6 h-6" />
              <span>60 Years of Excellence</span>
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

     {/* Our People */}
<div id="team" className="py-16 px-6">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center md:text-left p-12 rounded-3xl bg-blue-100 border border-blue-100 shadow-lg flex flex-col md:flex-row items-center gap-12">
      
      {/* Icon and Text */}
      <div className="flex-1">
        <Users className="w-16 h-16 text-blue-500 mx-auto md:mx-0 mb-6" />
        <h2 className="text-4xl font-bold text-black-100 mb-4">
          Our <span className="text-cyan-600">People</span>
        </h2>
        <p className="text-xl text-gray-800 mb-8 leading-relaxed">
          The heart of CDI SAKATA INX CORP. is our people—diverse, passionate, and driven by a shared vision for innovation. Our team brings together expertise from around the globe, collaborating to create breakthrough ink technologies that shape the future of printing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="/career"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-semibold shadow transition-all duration-300 text-center"
          >
            Join Our Team
          </a>
          <a
            href="/team"
            className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow transition-all duration-300 text-center"
          >
            View Our Team
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center">
        <div className="relative group cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
          <img
            src="/team1.jpg"
            alt="CDI SAKATA INX CORP. Team"
            className="rounded-3xl shadow-lg object-cover w-full max-w-lg h-100 transition-transform duration-300 group-hover:scale-105"
          />
          {/* Zoom overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3">
              <ZoomIn className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-5xl w-full">
            {/* Close button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-9 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Large image with proper aspect ratio */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/team1.jpg"
                alt="CDI SAKATA INX CORP. Team - Full View"
                className="w-full h-auto max-h-[100vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <h3 className="text-white text-xl font-bold mb-2">CDI SAKATA INX CORP. Team</h3>
                <p className="text-gray-200 text-sm">
                  Our diverse team of professionals working together to deliver world-class ink solutions and exceptional service.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
};

export default About;
