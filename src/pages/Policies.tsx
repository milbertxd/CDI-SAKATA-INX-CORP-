import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Leaf, 
  Heart, 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  Users,
  Award,
  Globe,
  Target,
  BookOpen,
  Download,
  ExternalLink,
  Calendar,
  User
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
              Corporate Governance & Policies
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              CDI SAKATA INX Corporation upholds the highest standards of corporate governance, environmental stewardship, and workplace excellence. Our comprehensive policy framework ensures sustainable operations and responsible business practices across all our global facilities.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">ISO 14001</div>
                <div className="text-sm text-gray-300">Environmental Management</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">ISO 45001</div>
                <div className="text-sm text-gray-300">Occupational Health & Safety</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">ISO 9001</div>
                <div className="text-sm text-gray-300">Quality Management</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">GRI</div>
                <div className="text-sm text-gray-300">Sustainability Reporting</div>
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
              { id: 'environmental', label: 'Environmental', icon: Leaf },
              { id: 'safety', label: 'Health & Safety', icon: Heart },
              { id: 'governance', label: 'Governance & Ethics', icon: Shield },
              { id: 'quality', label: 'Quality Assurance', icon: Award },
              { id: 'social', label: 'Social Responsibility', icon: Users }
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
                      CDI SAKATA INX Corporation operates under a comprehensive policy framework that reflects our commitment to excellence, sustainability, and stakeholder value creation. Our policies are regularly reviewed and updated to ensure compliance with international standards and best practices.
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
              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Environmental Stewardship",
                    icon: Leaf,
                    color: "green",
                    description: "Comprehensive environmental management system focusing on sustainable manufacturing, waste reduction, and carbon footprint minimization.",
                    policies: ["Environmental Management Policy", "Waste Management Guidelines", "Energy Conservation Standards", "Water Resource Management"]
                  },
                  {
                    title: "Health & Safety Excellence", 
                    icon: Heart,
                    color: "red",
                    description: "Zero-harm workplace culture with robust safety protocols, employee wellness programs, and emergency preparedness systems.",
                    policies: ["Occupational Health & Safety Policy", "Emergency Response Procedures", "Personal Protective Equipment Standards", "Incident Reporting Guidelines"]
                  },
                  {
                    title: "Corporate Governance",
                    icon: Shield,
                    color: "blue", 
                    description: "Ethical business conduct, transparent governance practices, and comprehensive compliance management across all operations.",
                    policies: ["Code of Business Conduct", "Anti-Corruption Policy", "Data Privacy Protection", "Whistleblower Protection"]
                  },
                  {
                    title: "Quality Assurance",
                    icon: Award,
                    color: "purple",
                    description: "Continuous improvement culture with stringent quality controls, customer satisfaction focus, and innovation excellence.",
                    policies: ["Quality Management System", "Product Safety Standards", "Supplier Quality Requirements", "Customer Satisfaction Metrics"]
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                        <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {category.policies.map((policy, policyIndex) => (
                        <div key={policyIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className={`w-4 h-4 text-${category.color}-600`} />
                          <span>{policy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environmental Policy Tab */}
          {activeTab === 'environmental' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Environmental Management Policy</h2>
                    <p className="text-lg text-gray-600">
                      CDI SAKATA INX is committed to environmental protection and sustainable development through responsible manufacturing practices and continuous improvement of our environmental performance.
                    </p>
                  </div>
                </div>

                {/* Environmental Commitments */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Environmental Commitments</h3>
                    <div className="space-y-4">
                      {[
                        "Achieve carbon neutrality by 2030 across all operations",
                        "Reduce water consumption by 40% by 2027",
                        "Implement circular economy principles in 100% of processes",
                        "Zero waste to landfill certification for all facilities",
                        "Renewable energy adoption target of 80% by 2026",
                        "Sustainable raw material sourcing programs"
                      ].map((commitment, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{commitment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Environmental Performance</h3>
                    <div className="space-y-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">35%</div>
                        <div className="text-sm text-gray-600">CO2 Reduction (2019-2023)</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">50%</div>
                        <div className="text-sm text-gray-600">Water Usage Reduction</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">90%</div>
                        <div className="text-sm text-gray-600">Waste Recycling Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <a href="/policies/CDI-SAKATA-Environmental-Policy-2024.pdf" download>
                      <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Policy (PDF)</span>
                      </button>
                    </a>
                    <a href="/sustainability-report-2023" target="_blank">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Sustainability Report</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Safety Policy Tab */}
          {activeTab === 'safety' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Occupational Health & Safety Policy</h2>
                    <p className="text-lg text-gray-600">
                      The health and safety of our employees, contractors, and visitors is our highest priority. We are committed to providing a safe, healthy work environment through comprehensive risk management and continuous improvement.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Excellence Standards</h3>
                    <div className="space-y-4">
                      {[
                        "Zero workplace injuries - Target: Zero Lost Time Incidents",
                        "Comprehensive safety training for 100% of employees",
                        "Regular health surveillance and medical monitoring",
                        "Emergency response drills conducted quarterly",
                        "Personal protective equipment provided and maintained",
                        "Ergonomic workplace design and hazard identification"
                      ].map((standard, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{standard}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Performance Metrics</h3>
                    <div className="space-y-6">
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-red-600">0.12</div>
                        <div className="text-sm text-gray-600">LTIFR (Lost Time Injury Frequency Rate)</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">100%</div>
                        <div className="text-sm text-gray-600">Safety Training Completion</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">365</div>
                        <div className="text-sm text-gray-600">Days without LTI (Current Record)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <a href="/policies/CDI-SAKATA-Safety-Policy-2024.pdf" download>
                      <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Safety Policy</span>
                      </button>
                    </a>
                    <a href="/safety-manual-2024" target="_blank">
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

          {/* Governance Tab */}
          {activeTab === 'governance' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Corporate Governance & Ethics</h2>
                    <p className="text-lg text-gray-600">
                      CDI SAKATA INX maintains the highest standards of corporate governance, business ethics, and regulatory compliance across all our operations worldwide.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Governance Principles</h3>
                    <div className="space-y-4">
                      {[
                        "Transparent and accountable decision-making processes",
                        "Independent board oversight and audit committees",
                        "Comprehensive risk management framework",
                        "Anti-corruption and anti-bribery measures",
                        "Data privacy and information security protocols",
                        "Whistleblower protection and reporting mechanisms"
                      ].map((principle, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{principle}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance Framework</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Code of Business Conduct</h4>
                        <p className="text-sm text-gray-600">Comprehensive guidelines for ethical business practices</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Regulatory Compliance</h4>
                        <p className="text-sm text-gray-600">100% compliance with local and international regulations</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibant text-purple-900 mb-2">Audit & Monitoring</h4>
                        <p className="text-sm text-gray-600">Regular internal and external audits</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <a href="/policies/CDI-SAKATA-Code-of-Conduct-2024.pdf" download>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Code of Conduct</span>
                      </button>
                    </a>
                    <a href="/governance-report-2023" target="_blank">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Governance Report</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quality Tab */}
          {activeTab === 'quality' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Management System</h2>
                    <p className="text-lg text-gray-600">
                      Our commitment to quality excellence drives continuous improvement in all aspects of our operations, from raw material sourcing to final product delivery.
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
                        <span>Quality Policy</span>
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

          {/* Social Responsibility Tab */}
          {activeTab === 'social' && (
            <div className="space-y-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Social Responsibility & Community Engagement</h2>
                    <p className="text-lg text-gray-600">
                      We believe in creating positive impact in the communities where we operate through employee development, community investment, and social responsibility initiatives.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Commitments</h3>
                    <div className="space-y-4">
                      {[
                        "Diversity, equity, and inclusion in hiring and promotion",
                        "Employee development and training programs",
                        "Community investment and local partnerships",
                        "Educational support and scholarship programs",
                        "Healthcare and wellness initiatives for employees",
                        "Support for local suppliers and businesses"
                      ].map((commitment, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{commitment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Impact</h3>
                    <div className="space-y-6">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">2,500+</div>
                        <div className="text-sm text-gray-600">Employees Worldwide</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">₱5M+</div>
                        <div className="text-sm text-gray-600">Annual Community Investment</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">15</div>
                        <div className="text-sm text-gray-600">Local Community Programs</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <a href="/policies/CDI-SAKATA-CSR-Policy-2024.pdf" download>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>CSR Policy</span>
                      </button>
                    </a>
                    <a href="/community-programs" target="_blank">
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Community Programs</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Commitment to Excellence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              These policies form the foundation of our corporate responsibility and guide every decision we make. 
              We believe that sustainable business practices, employee safety, and ethical governance are not just 
              obligations, but opportunities to create lasting positive impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
                <span className="text-gray-900 font-semibold">ISO 14001</span>
                <span className="text-gray-600 ml-2">Environmental</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
                <span className="text-gray-900 font-semibold">ISO 45001</span>
                <span className="text-gray-600 ml-2">Safety</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
                <span className="text-gray-900 font-semibold">GRI Standards</span>
                <span className="text-gray-600 ml-2">ESG Reporting</span>
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