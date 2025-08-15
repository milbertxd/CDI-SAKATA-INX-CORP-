import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Beaker, 
  Headphones, 
  TestTube, 
  GraduationCap, 
  Leaf, 
  Truck, 
  Settings, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: "Mr. Lawrence M. Moniguing",
    role: "President",
    bio: "Mr. Lawrence M. Moniguing is a visionary leader with over 20 years of experience in the printing industry, dedicated to driving innovation and excellence at CDI SAKATA INX CORP.",
    image: "/President.jpg",
    linkedin: " "
  },
  {
    name: "Mr. Kristofferson Garcia",
    role: "Vice President/QMR",
    bio: "Mr. Kristofferson Garcia is a seasoned leader with a passion for quality management and regulatory compliance.",
    image: "/VP1.jpg",

  },
  {
    name: "Mrs. Rosana Escanda",
    role: "AVP for Finance",
    bio: "Mrs. Rosana Escanda is a dedicated finance professional with extensive experience in financial planning and analysis.",
    image: "/AVP2.jpg",

  },
  {
    name: "Mr. Erjay F. Caisip",
    role: "AVP for Systems and Improvements",
    bio: "Mr. Erjay F. Caisip is a results-driven professional with a strong background in systems optimization and process improvements.",
    image: "/AVP1.jpg",

  },
  {
    name: "Mr. Raynold Binata",
    role: "AVP for Technical",
    bio: "Mr. Raynold Binata is a results-driven professional with a strong background in technical support and service optimization.",
    image: "/AVP3.jpg",

  },
  {
    name: "Mrs. Crisa Marie R. Garcia",
    role: "AVP for Sales and Marketing",
    bio: "Mrs. Crisa Marie R. Garcia is a dynamic leader with a proven track record in driving sales growth and marketing strategies.",
    image: "/AVP4.jpg",

  },
  {
    name: "Mr. Taiki Tabuchi",
    role: "Technical Adviser",
    bio: "Mr. Taiki Tabuchi is a highly skilled technical adviser with a wealth of experience in providing strategic guidance and support.",
    image: "/team/priya.jpg",
  },
  // {
  //   name: "Mr. Yancy Arguedo",
  //   role: "Software Engineer",
  //   bio: "Mr. Yancy Arguedo is a talented software engineer with a passion for developing innovative solutions and a strong background in full-stack development.",
  //   image: "/yancy.jpg",
  // },
  // Add more team members as needed
];

const Team = () => {
  const [activeService, setActiveService] = useState(0);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* Breadcrumb */}
        <div className="w-full bg-transparent pt-8 pb-2 px-6">
          <nav className="container mx-auto max-w-6xl flex items-center text-gray-600 text-base space-x-2">
            <Link to="/about" className="hover:underline text-blue-600 hover:text-blue-800">
              About Us
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/team" className="hover:underline text-blue-600 hover:text-blue-800">
              Team
            </Link>
          </nav>
        </div>
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 text-center">
            Meet <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Our Team</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Get to know the passionate professionals behind CDI SAKATA INX CORP. Our diverse team brings together expertise, creativity, and dedication to deliver world-class solutions and service.
          </p>
          
          {/* Pyramid Layout */}
          <div className="space-y-8">
            {/* President - Top of Pyramid */}
            <div className="flex justify-center">
              <div className="bg-blue-100 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-xl border border-blue-200 max-w-md hover:bg-blue-200">
                <img
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  className="w-48 h-48 rounded-xl object-cover border-4 border-blue-500 shadow-lg"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{teamMembers[0].name}</h2>
                  <div className="text-blue-600 font-semibold mb-3 text-lg">{teamMembers[0].role}</div>
                  <p className="text-gray-600 mb-2 leading-relaxed">{teamMembers[0].bio}</p>
                  
                </div>
              </div>
            </div>

            {/* Vice President - Second Level */}
            <div className="flex justify-center">
              <div className="bg-blue-100 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg border border-blue-200 max-w-lg hover:bg-blue-200">
                <img
                  src={teamMembers[1].image}
                  alt={teamMembers[1].name}
                  className="w-40 h-40 rounded-xl object-cover border-4 border-blue-500 shadow"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{teamMembers[1].name}</h2>
                  <div className="text-blue-600 font-semibold mb-2">{teamMembers[1].role}</div>
                  <p className="text-gray-600 mb-1 text-sm leading-relaxed">{teamMembers[1].bio}</p>
                  
                </div>
              </div>
            </div>

            {/* Executives - Bottom Level (3 Columns Grid) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {teamMembers.slice(2).map((member, idx) => (
                <div key={idx + 2} className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 hover:bg-blue-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-50 h-32 rounded-xl object-cover border-3 border-blue-500 shadow"
                  />
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h2>
                    <div className="text-blue-600 font-semibold mb-2 text-sm">{member.role}</div>
                    <p className="text-gray-600 text-xs leading-relaxed">{member.bio}</p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
