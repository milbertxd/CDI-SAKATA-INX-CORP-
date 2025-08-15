import React from 'react';
import { Beaker, Globe, Award, Users, Lightbulb, Shield, Factory, Leaf, Target, Zap, Star, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Factory,
      title: "60+ Years of Excellence",
      description: "Six decades of innovation in printing ink manufacturing and technological advancement",
      color: "from-blue-600 to-cyan-500",
      stats: "Since 1963"
    },
    {
      icon: Globe,
      title: "Global Manufacturing Network",
      description: "Strategic facilities across Asia-Pacific serving 20+ countries with localized expertise",
      color: "from-cyan-500 to-blue-600",
      stats: "20+ Countries"
    },
    {
      icon: Beaker,
      title: "Advanced R&D Laboratory",
      description: "State-of-the-art research facilities developing next-generation ink formulations",
      color: "from-blue-500 to-purple-500",
      stats: "100+ Formulations"
    }
  ];

  const specialtyFeatures = [
    {
      icon: Leaf,
      title: "Eco-Friendly Solutions",
      description: "Sustainable ink technologies reducing environmental impact",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "ISO 9001:2015 Certified",
      description: "Rigorous quality management ensuring consistent excellence",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      title: "Industry Specialization",
      description: "Expertise in flexographic, offset, and digital printing solutions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Expert Technical Support",
      description: "Dedicated team providing comprehensive customer assistance",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Rapid Innovation",
      description: "Continuous development of cutting-edge printing technologies",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Superior ink performance meeting the highest industry standards",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const achievements = [
    { number: "60+", label: "Years of Excellence", icon: TrendingUp },
    { number: "20+", label: "Countries Served", icon: Globe },
    { number: "100+", label: "Product Formulations", icon: Beaker },
    { number: "ISO", label: "Quality Certified", icon: Award }
  ];

  return (
    <section id="why-choose" className="bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-blue-100 px-6 py-3 rounded-full mb-6">
            <Star className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold">Why Choose CDI SAKATA INX CORP</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Your Trusted Partner in 
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent block">
              Printing Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover what makes us the leading innovator in the printing ink industry across Asia-Pacific, 
            delivering cutting-edge solutions with unmatched quality and expertise.
          </p>
        </div>

        {/* Main Features - Hero Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white border border-blue-200 hover:border-blue-300 transition-all duration-700 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
                
                {/* Stats Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {feature.stats}
                </div>

                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-700 rounded-b-3xl"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative z-10">
            <Award className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join industry leaders who trust CDI SAKATA INX CORP for their printing ink solutions. 
              Let's discuss how we can elevate your printing quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                Explore Our Products
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
