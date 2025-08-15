import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Star
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare email content
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(`
Dear CDI SAKATA INX CORP Team,

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'Not specified'}
- Phone: ${formData.phone || 'Not specified'}
- Inquiry Type: ${inquiryTypes.find(type => type.value === formData.inquiryType)?.label || 'General Information'}

Message:
${formData.message}

Best regards,
${formData.name}
    `);
    
    // Create mailto link
    const mailtoLink = `mailto:mico.alano999@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show confirmation message
    setTimeout(() => {
      alert('Your email client should have opened with the pre-filled message. Please send the email to complete your inquiry.');
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Information' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'media', label: 'Media & Press' },
    { value: 'careers', label: 'Career Opportunities' }
    // {value: 'others', label: 'Others'}
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Contact CDI SAKATA INX CORP - Get Expert Printing Ink Solutions"
        description="Contact CDI SAKATA INX Corporation for premium printing ink solutions, technical support, and business inquiries. Located in Philippines, serving 50+ countries worldwide with expert consultation and customer service."
        keywords="contact CDI Sakata, printing ink supplier contact, ink manufacturer Philippines, technical support, customer service, business inquiries, ink consultation"
        canonical="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact CDI SAKATA INX CORP",
          "description": "Contact information and inquiry form for CDI SAKATA INX Corporation",
          "mainEntity": {
            "@type": "Organization",
            "name": "CDI SAKATA INX CORP",
            "telephone": "+63-XXX-XXX-XXXX",
            "email": "mico.alano999@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Philippines"
            }
          }
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gray-600">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-9xl font-bold text-white mb-4">
            Get in <span className="text-blue-400">Touch</span>
          </h1>
                <div
  className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[600px] h-[6px] sm:h-[8px] lg:h-[10px] mt-3 rounded-full mx-auto mb-6"
  style={{
    background: 'linear-gradient(to right, #dcdcdc 0%, #bfbfbf 75%, #0072ce 75%, #0072ce 100%)'
  }}
></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact-form" className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Send className="w-6 h-6 text-blue-600 mr-3" />
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Company</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Inquiry Type</label>
                    <select 
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Subject *</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Message *</label>
                    <textarea 
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your requirements, questions, or how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div id="contact-info" className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Address</h4>
                      <p className="text-gray-600 text-sm">
                        Gateway Business Park, General Trias, Cavite, Philippines
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Phone</h4>
                      <a href="tel:09543010523" className="text-blue-600 hover:text-blue-700 text-sm">
                        09543010523 local 183
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <a href="mailto:mico.alano999@gmail.com" className="text-blue-600 hover:text-blue-700 text-sm">
                        mico.alano999@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Business Hours</h4>
                      <p className="text-gray-600 text-sm">
                        Monday - Friday: 7:00 AM - 4:00 PM (GMT+8)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Quick Response</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  We typically respond to all inquiries within 2 hours during business hours.
                </p>
                <div className="flex items-center text-blue-600 text-sm">
                  <Star className="w-4 h-4 mr-1" />
                  <span>Professional support guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions about our products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How quickly do you respond?</h3>
                <p className="text-gray-600 text-sm">We respond to all inquiries within 2 hours during business hours (7 AM - 4 PM GMT+8).</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you provide technical support?</h3>
                <p className="text-gray-600 text-sm">Yes, our technical team provides comprehensive support for all our ink and printing solutions.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I request a product demo?</h3>
                <p className="text-gray-600 text-sm">Absolutely! Contact us to schedule a personalized product demonstration at your facility.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What industries do you serve?</h3>
                <p className="text-gray-600 text-sm">We serve packaging, commercial printing, industrial printing, and specialty coating industries.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer custom solutions?</h3>
                <p className="text-gray-600 text-sm">Yes, we develop custom ink formulations and solutions tailored to your specific requirements.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How can I get a quote?</h3>
                <p className="text-gray-600 text-sm">Fill out our contact form with your requirements, and we'll provide a detailed quote within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
