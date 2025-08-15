import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { API_ENDPOINTS } from '../config/api';
import { 
  Briefcase, 
  MapPin, 
  Clock,
  PhilippinePeso ,
  Users, 
  ChevronDown, 
  ChevronUp,
  Code,
  Palette,
  BarChart3,
  Zap,
  Heart,
  Star,
  Building2,
  GraduationCap,
  Calendar,
  MoreHorizontal
} from 'lucide-react';

const Career = () => {
  const [expandedJob, setExpandedJob] = useState(null);
  const [jobPositions, setJobPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // null means show all jobs

  // All categories to be shown in cards
  const categories = [
    {
      title: "Engineering",
      color: "from-blue-500 to-blue-600",
      value: "Engineering",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Design",
      color: "from-purple-500 to-purple-600", 
      value: "Design",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Marketing",
      color: "from-green-500 to-green-600",
      value: "Marketing",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Sales",
      color: "from-orange-500 to-orange-600",
      value: "Sales",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      title: "Others",
      color: "from-gray-500 to-gray-700",
      value: "Others",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      borderColor: "border-gray-200",
    }
  ];

  // Compute counts for each category, including "Others"
  const jobCategories = categories.map(category => ({
    ...category,
    count: category.value !== "Others"
      ? jobPositions.filter(job => job.category === category.value).length
      : jobPositions.filter(
          job =>
            !["Engineering", "Design", "Marketing", "Sales"].includes(job.category)
            && job.category // only if category is set
        ).length
  }));

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and mental health coverage"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Annual learning budget and conference attendance"
    },
    {
      icon: Calendar,
      title: "Flexible Work",
      description: "Hybrid work options and flexible scheduling"
    },
    {
      icon: Star,
      title: "Growth Opportunities",
      description: "Clear career progression and internal mobility"
    }
  ];

  useEffect(() => {
    axios.get(API_ENDPOINTS.CAREERS)
      .then((res) => {
        setJobPositions(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleJobExpansion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleApplyNow = (jobTitle, jobDepartment) => {
    const subject = `Application for ${jobTitle} Position - ${jobDepartment}`;
    const body = `Dear HR Team,

I am writing to express my interest in the ${jobTitle} position in the ${jobDepartment} department at CDI Sakata INX Corporation.

I would like to submit my application for this role and would appreciate the opportunity to discuss how my skills and experience align with your requirements.

Please find my resume attached. I look forward to hearing from you.

Best regards,
[Your Name]`;

    const mailtoLink = `mailto:hr@sakataINX.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleCategoryClick = (categoryValue) => {
    if (selectedCategory === categoryValue) {
      setSelectedCategory(null); // If same category clicked, show all jobs
    } else {
      setSelectedCategory(categoryValue); // Filter by selected category
    }
  };

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory 
    ? jobPositions.filter(job => {
        if (selectedCategory === "Others") {
          return !["Engineering", "Design", "Marketing", "Sales"].includes(job.category);
        }
        return job.category === selectedCategory;
      })
    : jobPositions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEO 
        title="Careers at CDI SAKATA INX CORP - Join Our Printing Innovation Team"
        description="Explore exciting career opportunities at CDI SAKATA INX Corporation. Join our team of printing ink experts, engineers, and professionals. We offer competitive benefits, growth opportunities, and a chance to shape the future of printing technology."
        keywords="CDI Sakata careers, printing ink jobs, chemical engineer jobs Philippines, manufacturing careers, ink technology jobs, laboratory technician jobs, sales representative positions"
        canonical="/career"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "CDI SAKATA INX CORP",
            "description": "Leading printing ink manufacturer since 1964"
          },
          "description": "Multiple career opportunities available at CDI SAKATA INX Corporation",
          "employmentType": "FULL_TIME",
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Philippines"
            }
          }
        }}
      />
      <Header />
      {/* Move this INSIDE the Hero section */}
      <div className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/sak2.jpg"
            alt="Careers Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-60"></div>
        </div>

        {/* Hero Content */}
        <div className="pt-16 pb-32 px-6 relative z-10">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4">
              Join Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
            </h1>
            <div
              className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[600px] h-[6px] sm:h-[8px] lg:h-[10px] mt-3 rounded-full mx-auto"
              style={{
                background: 'linear-gradient(to right, #dcdcdc 0%, #bfbfbf 75%, #0072ce 75%, #0072ce 100%)'
              }}
            ></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {/* Optional subtext here */}
            </p>
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div id="open-positions" className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Open <span className="bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent">Positions</span>
          </h2>
          
          {/* Show selected category info */}
          {selectedCategory && (
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4">
                Showing jobs in: <span className="font-bold text-blue-600">{selectedCategory}</span>
              </p>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-sm font-medium transition-colors"
              >
                Show All Categories
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {jobCategories.map((category, index) => {
              const isSelected = selectedCategory === category.value;
              return (
                <div 
                  key={index} 
                  className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 text-center shadow-md cursor-pointer ${
                    isSelected 
                      ? `bg-gradient-to-br ${category.color} border-transparent text-white shadow-lg` 
                      : `${category.bgColor} ${category.borderColor} hover:shadow-lg hover:border-opacity-60`
                  }`}
                  onClick={() => handleCategoryClick(category.value)}
                >
                  <div className="space-y-4">
                    <div className={`text-6xl font-black ${
                      isSelected 
                        ? 'text-white/90' 
                        : category.textColor
                    }`}>
                      {category.count}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-1 transition-colors ${
                        isSelected 
                          ? 'text-white' 
                          : 'text-gray-800 group-hover:text-gray-900'
                      }`}>
                        {category.title}
                      </h3>
                      <p className={`text-sm font-medium ${
                        isSelected 
                          ? 'text-white/80' 
                          : 'text-gray-500'
                      }`}>
                        {category.count === 1 ? 'Position' : 'Positions'}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="pt-2">
                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          Active Filter
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div id="job-listings" className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-gray-900 text-center py-10">Loading jobs...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  No positions available
                </h3>
                <p className="text-gray-500 mb-6">
                  {selectedCategory 
                    ? `No open positions in ${selectedCategory} category at the moment.`
                    : 'No open positions available at the moment.'
                  }
                </p>
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View All Categories
                  </button>
                )}
              </div>
            </div>
          ) : (
          <div className="space-y-6">
            {/* Show count of filtered results */}
            {selectedCategory && (
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {filteredJobs.length} {selectedCategory} Position{filteredJobs.length !== 1 ? 's' : ''}
                </h3>
              </div>
            )}
            
            {filteredJobs.map((job) => (
              <div key={job.id} className="group rounded-3xl bg-blue-100 border border-blue-200 hover:bg-blue-200 transition-all duration-500 overflow-hidden shadow-lg">
                <div 
                  className="p-8 cursor-pointer"
                  onClick={() => toggleJobExpansion(job.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                          {job.level}
                        </span>
                        {/* Show date posted */}
                        {job.date_posted && (
                          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {new Date(job.date_posted).toLocaleDateString()}
                          </span>
                        )}
                        {job.category && (
                          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium flex items-center gap-1">
                            {job.category}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <PhilippinePeso className="w-4 h-4 text-blue-500" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent job expansion when clicking apply
                          handleApplyNow(job.title, job.department);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Apply Now
                      </button>
                      {expandedJob === job.id ? (
                        <ChevronUp className="w-6 h-6 text-blue-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedJob === job.id && (
                  <div className="px-8 pb-8 border-t border-blue-300">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                      <div>
                        <h4 className="text-lg font-bold text-blue-600 mb-4">Responsibilities</h4>
                        <ul className="space-y-2">
                          {(Array.isArray(job.responsibilities) ? job.responsibilities : (job.responsibilities ? job.responsibilities.split('\n') : [])).map((responsibility, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-600 mb-4">Requirements</h4>
                        <ul className="space-y-2">
                          {(Array.isArray(job.requirements) ? job.requirements : (job.requirements ? job.requirements.split('\n') : [])).map((requirement, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-600 mb-4">Preferred Qualifications</h4>
                        <ul className="space-y-2">
                          {(Array.isArray(job.qualifications) ? job.qualifications : (job.qualifications ? job.qualifications.split('\n') : [])).map((qualification, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{qualification}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {job.questions && (
                        <div>
                          <h4 className="text-lg font-bold text-blue-600 mb-4">Interview Questions</h4>
                          <ul className="space-y-2">
                            {(Array.isArray(job.questions) ? job.questions : (job.questions ? job.questions.split('\n') : [])).map((question, index) => (
                              <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span>{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Work <span className="bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent">With Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in taking care of our team members with comprehensive benefits and growth opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="group text-center p-8 rounded-3xl bg-blue-100 border border-blue-200 hover:bg-blue-200 transition-all duration-500 hover:scale-105 shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div id="application" className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center p-12 rounded-3xl bg-blue-100 border border-blue-200 shadow-xl">
            <Building2 className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Join Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Mission</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't see the perfect position? We're always looking for talented individuals who share our passion for innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                Submit General Application
              </button>
              <button className="px-8 py-4 border-2 border-blue-500 hover:border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Career;