import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import ClientsSection from './ClientsSection';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-200 text-white">
      <SEO 
        title="CDI SAKATA INX CORP - Premium Printing Inks & Solutions"
        description="CDI SAKATA INX Corporation is a leading manufacturer of premium printing inks, digital inks, and eco-friendly solutions. Serving 50+ countries since 1964 with ISO-certified quality and innovative ink technologies."
        keywords="printing inks, offset inks, digital printing, eco-friendly inks, ink manufacturer, CDI Sakata, Philippines printing, ink solutions, industrial inks, specialty coatings"
        canonical="/"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CDI SAKATA INX CORP",
          "url": "https://cdiskatainx.com",
          "logo": "https://cdiskatainx.com/logo.png",
          "description": "Leading manufacturer of premium printing inks and solutions since 1964",
          "foundingDate": "1964",
          "industry": "Printing and Publishing",
          "numberOfEmployees": "500+",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Philippines"
          },
          "sameAs": [
            "https://www.linkedin.com/company/cdi-sakata-inx",
            "https://www.facebook.com/cdiskatainx"
          ]
        }}
      />
      <Header />
      <Hero />
      <FeaturesSection />
      <ClientsSection />
      <Footer />
    </div>
  );
};

export default Index;
