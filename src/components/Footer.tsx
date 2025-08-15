import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Globe, Heart, X } from 'lucide-react';

const Footer = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{ image: string; title: string } | null>(null);

  // Certificate data for ISO and HALAL
  const certificates = {
    iso: {
      image: "/iso-pic.jpg", // Using your actual ISO certificate image
      title: "ISO 9001:2015 Quality Management System Certificate"
    },
    halal: {
      image: "/halah-pic.jpg", // Using your actual HALAL certificate image  
      title: "HALAL Certification Certificate"
    }
  };

  const openCertificateModal = (certificateType: 'iso' | 'halal') => {
    setSelectedCertificate(certificates[certificateType]);
    setShowCertificateModal(true);
  };

  const closeCertificateModal = () => {
    setShowCertificateModal(false);
    setSelectedCertificate(null);
  };

  // Certificate Modal Component
  const CertificateModal = () => {
    if (!showCertificateModal || !selectedCertificate) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={closeCertificateModal}
      >
        <div className="relative max-w-5xl w-full">
          {/* Close button - larger and more visible */}
          <button
            onClick={closeCertificateModal}
            className="absolute -top-16 right-0 text-white hover:text-red-400 transition-colors z-20 bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-lg"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Certificate image - no overlay */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="w-full h-auto max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
         
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Company Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                CDI SAKATA INX CORP.
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-6"></div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Leading the printing industry for over 60 years with innovative ink solutions and sustainable practices that shape the future of printing.
            </p>
            <div className="flex space-x-5">
              <div className="p-2 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5 text-blue-400 hover:text-blue-300 transition-colors" />
              </div>
              <div className="p-2 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 text-blue-400 hover:text-blue-300 transition-colors" />
              </div>
              <div className="p-2 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5 text-blue-400 hover:text-blue-300 transition-colors" />
              </div>
              <div className="p-2 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5 text-blue-400 hover:text-blue-300 transition-colors" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Products
                </a>
              </li>
              <li>
                <a href="/news" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  News
                </a>
              </li>
              <li>
                <a href="/career" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Career
                </a>
              </li>
              <li>
                <a href="/policies" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Industry Recognition Logos */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Industry Recognition</h4>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
            </div>
            <div className="space-y-4">
              {/* ISO Certification Logo Button */}
              <button 
                onClick={() => openCertificateModal('iso')}
                className="group border border-white/20 hover:border-white/40 rounded-lg p-4 w-full transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/ISO.jpg" 
                      alt="ISO Logo" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.log('Failed to load iso-pic.jpg');
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <svg className="w-8 h-8 text-blue-600 hidden" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-white font-semibold text-base">ISO Certified</p>
                    <p className="text-gray-300 text-sm mt-1">Quality Standards</p>
                  </div>
                </div>
              </button>

              {/* HALAL Certification Logo Button */}
              <button 
                onClick={() => openCertificateModal('halal')}
                className="group border border-white/20 hover:border-white/40 rounded-lg p-4 w-full transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/halal.png" 
                      alt="HALAL Logo" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.log('Failed to load halal.png');
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <svg className="w-8 h-8 text-green-600 hidden" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-white font-semibold text-base">HALAL Certified</p>
                    <p className="text-gray-300 text-sm mt-1">Compliance Standards</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Get In Touch</h4>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">CDI SAKATA INX Corp.</p>
                  <p className="text-gray-300 text-sm">Manila, Philippines</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                </div>
                <span className="text-gray-300 text-sm">+81-3-1234-5678</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                </div>
                <span className="text-gray-300 text-sm">info@cdi-sakata.co.jp</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                  <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                </div>
                <span className="text-gray-300 text-sm">50+ Countries Served</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        <CertificateModal />

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm flex items-center justify-center md:justify-start">
                © 2025 CDI SAKATA INX CORP. All rights reserved.
                
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Founded in 1964 • 60 Years of Innovation • Shaping the Future of Printing
              </p>
            </div>
            
              </div>
            </div>
          </div>
     
    
    </footer>
  );
};

export default Footer;