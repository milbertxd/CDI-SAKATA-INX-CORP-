import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Leaf, 
  Heart, 
  ArrowLeft, 
  CheckCircle, 
  Award,
  BookOpen,
  Download,
  ExternalLink,
  Calendar,
  User,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Policies = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mb-6"></div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Core Policies
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              CDI SAKATA INX Corporation upholds the highest standards through our comprehensive policy framework. 
              Our three core policies ensure quality excellence, halal compliance, and safety in all our operations.
            </p>
            
            {/* Key Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">ISO 9001</div>
                <div className="text-sm text-gray-300">Quality Management</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">Halal Certified</div>
                <div className="text-sm text-gray-300">Halal Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">SHE Standards</div>
                <div className="text-sm text-gray-300">Safety, Health & Environment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Policy Overview', icon: BookOpen },
              { id: 'quality', label: 'Quality Policy', icon: Award },
              { id: 'halal', label: 'Halal Policy', icon: Star },
              { id: 'she', label: 'SHE Policy', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Based on Active Tab */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Policy Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* Introduction */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Corporate Policy Framework</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      CDI SAKATA INX Corporation operates under three core policies that reflect our commitment to 
                      excellence, compliance, and safety. Our policies are regularly reviewed and updated to ensure 
                      compliance with international standards and best practices.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                          Last Updated
                        </h3>
                        <p className="text-gray-600">January 2024</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <User className="w-5 h-5 mr-2 text-blue-600" />
                          Approved By
                        </h3>
                        <p className="text-gray-600">Board of Directors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Categories Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Quality Policy",
                    icon: Award,
                    color: "purple",
                    description: "Comprehensive quality management system ensuring product excellence and customer satisfaction through continuous improvement.",
                    highlights: ["ISO 9001:2015 Certified", "99.8% Quality Rate", "Continuous Improvement", "Customer Focus"]
                  },
                  {
                    title: "Halal Policy", 
                    icon: Star,
                    color: "green",
                    description: "Strict halal compliance ensuring our products meet Islamic dietary requirements and certification standards.",
                    highlights: ["Halal Certified Products", "Islamic Guidelines", "Certified Supply Chain", "Regular Audits"]
                  },
                  {
                    title: "SHE Policy",
                    icon: Shield,
                    color: "blue", 
                    description: "Safety, Health & Environment policy prioritizing zero harm workplace, environmental protection, and sustainable operations.",
                    highlights: ["Zero Harm Target", "Environmental Protection", "Employee Wellness", "Sustainable Operations"]
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                        <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {category.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className={`w-4 h-4 text-${category.color}-600`} />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Policy Tab */}
          {activeTab === 'quality' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Management Policy</h2>
                    <p className="text-lg text-gray-600">
                      Our commitment to quality excellence drives continuous improvement in all aspects of our operations, 
                      from raw material sourcing to final product delivery.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Standards</h3>
                    <div className="space-y-4">
                      {[
                        "ISO 9001:2015 Quality Management certification",
                        "Statistical process control and monitoring",
                        "Supplier quality assurance and auditing",
                        "Customer satisfaction measurement programs",
                        "Continuous improvement and lean manufacturing",
                        "Product testing and validation protocols"
                      ].map((standard, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{standard}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Performance</h3>
                    <div className="space-y-6">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600">99.8%</div>
                        <div className="text-sm text-gray-600">Product Quality Rate</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">4.9/5</div>
                        <div className="text-sm text-gray-600">Customer Satisfaction Score</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">99.2%</div>
                        <div className="text-sm text-gray-600">On-Time Delivery Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <a href="/policies/CDI-SAKATA-Quality-Policy-2024.pdf" download>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Quality Policy</span>
                      </button>
                    </a>
                    <a href="/quality-certifications" target="_blank">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Certifications</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Halal Policy Tab */}
          {activeTab === 'halal' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Halal Compliance Policy</h2>
                    <p className="text-lg text-gray-600">
                      CDI SAKATA INX is committed to producing halal-certified products that comply with Islamic 
                      dietary laws and regulations, ensuring our Muslim customers can trust our products.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Halal Compliance Standards</h3>
                    <div className="space-y-4">
                      {[
                        "Halal certification from recognized Islamic bodies",
                        "Strict ingredient sourcing and verification",
                        "Dedicated halal production lines and processes",
                        "Regular halal audits and inspections",
                        "Employee training on halal requirements",
                        "Supply chain halal integrity management"
                      ].map((standard, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{standard}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Halal Certifications</h3>
                    <div className="space-y-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-lg font-bold text-green-600">100%</div>
                        <div className="text-sm text-gray-600">Halal Certified Product Lines</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-lg font-bold text-blue-600">Annual</div>
                        <div className="text-sm text-gray-600">Halal Compliance Audits</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-lg font-bold text-purple-600">Certified</div>
                        <div className="text-sm text-gray-600">Supply Chain Partners</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <a href="/policies/CDI-SAKATA-Halal-Policy-2024.pdf" download>
                      <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Halal Policy</span>
                      </button>
                    </a>
                    <a href="/halal-certificates" target="_blank">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Halal Certificates</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SHE Policy Tab */}
          {activeTab === 'she' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety, Health & Environment (SHE) Policy</h2>
                    <p className="text-lg text-gray-600">
                      The safety and health of our employees and environmental protection are our highest priorities. 
                      We are committed to zero harm and sustainable operations.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">SHE Commitments</h3>
                    <div className="space-y-4">
                      {[
                        "Zero workplace injuries and incidents",
                        "Environmental protection and conservation",
                        "Comprehensive safety training programs",
                        "Emergency response and preparedness",
                        "Occupational health and wellness programs",
                        "Sustainable manufacturing practices"
                      ].map((commitment, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{commitment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">SHE Performance</h3>
                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-sm text-gray-600">Lost Time Injuries (2023)</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <div className="text-sm text-gray-600">Safety Training Completion</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600">365+</div>
                        <div className="text-sm text-gray-600">Days Without Incident</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <a href="/policies/CDI-SAKATA-SHE-Policy-2024.pdf" download>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download SHE Policy</span>
                      </button>
                    </a>
                    <a href="/safety-manual" target="_blank">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Safety Manual</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Commitment to Excellence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              These three core policies form the foundation of our operations and guide every decision we make. 
              We believe that quality, compliance, and safety are not just requirements, but opportunities to 
              create lasting positive impact for our customers, employees, and communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
                <span className="text-gray-900 font-semibold">ISO 9001</span>
                <span className="text-gray-600 ml-2">Quality</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
                <span className="text-gray-900 font-semibold">Halal Certified</span>
                <span className="text-gray-600 ml-2">Compliance</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
                <span className="text-gray-900 font-semibold">SHE Standards</span>
                <span className="text-gray-600 ml-2">Safety & Environment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policies;