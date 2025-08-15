import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { API_ENDPOINTS, getImageUrl } from '../config/api';
import { 
  Calendar, User, Tag, TrendingUp, Award, Globe, Zap,
  ChevronRight, Search, BookOpen, ExternalLink
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All News', icon: BookOpen },
  { id: 'innovation', name: 'Innovation', icon: Zap },
  { id: 'awards', name: 'Awards', icon: Award },
  { id: 'expansion', name: 'Expansion', icon: Globe },
  { id: 'sustainability', name: 'Sustainability', icon: TrendingUp },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'others', name: 'Others', icon: BookOpen }
];

const staticFeaturedNews = {
  date: "July 1, 2025",
  category: "Innovation",
  title: "Revolutionary Nano-Ink Technology Breakthrough",
  subtitle: "Next-generation printing capability unveiled",
  summary: "CDI SAKATA INX CORP. announces the development of groundbreaking nano-ink technology that enables printing at the molecular level, opening new possibilities for electronics, medical devices, and advanced materials.",
  image: "/sa1.jpg",
  author: "Mico Alano",
  tags: ["Innovation", "Technology"],
  id: "featured"
};

const INITIAL_NEWS_COUNT = 6; // 2 rows of 3 news
const LOAD_MORE_COUNT = 99;   // Show all remaining news after "Load More" click


const News = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dynamicNews, setDynamicNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_NEWS_COUNT);
  const [showAll, setShowAll] = useState(false);

  // Check URL parameters for category on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);
  

  useEffect(() => {
    axios.get(API_ENDPOINTS.NEWS)
      .then((response) => {
        setDynamicNews(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error loading news.');
        setLoading(false);
      });
  }, []);

  // Reset visibleCount and showAll if filter/search changes
  useEffect(() => {
    setVisibleCount(INITIAL_NEWS_COUNT);
    setShowAll(false);
  }, [selectedCategory, searchTerm]);

  // Featured news logic
  const featuredNews = dynamicNews.find(item => item.isFeatured) || staticFeaturedNews;
  const gridNews = dynamicNews.filter(item => !item.isFeatured);

  // Filter for category/search
  const filteredNews = (gridNews || []).filter(item => {
    if (!item) return false;
    
    // Handle multiple categories
    const itemCategories = Array.isArray(item.categories) 
      ? item.categories 
      : (typeof item.categories === 'string' 
          ? item.categories.split(',').map(c => c.trim()) 
          : (item.category ? [item.category] : []));
    
    const matchesCategory = selectedCategory === 'all' ||
      itemCategories.some(cat => cat.toLowerCase() === selectedCategory);
    
    const matchesSearch =
      ((item.title || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((item.summary || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
      itemCategories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((item.author || '').toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const visibleNews = showAll ? filteredNews : filteredNews.slice(0, visibleCount);
  const canLoadMore = !showAll && filteredNews.length > INITIAL_NEWS_COUNT;
  const canHideMore = showAll && filteredNews.length > INITIAL_NEWS_COUNT;

  // --- Helper for tags array ---
  function renderTags(tags: any) {
    if (Array.isArray(tags)) {
      return tags.map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30 hover:scale-110 transition-transform cursor-default"
        >
          {tag}
        </span>
      ));
    }
    if (typeof tags === 'string' && tags.trim() !== '') {
      return tags.split(',').map((tag: string, tagIndex: number) => (
        <span
          key={tagIndex}
          className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30 hover:scale-110 transition-transform cursor-default"
        >
          {tag.trim()}
        </span>
      ));
    }
    return null;
  }

  // --- Helper for light theme tags ---
  function renderTagsLight(tags: any) {
    if (Array.isArray(tags)) {
      return tags.map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs hover:scale-110 transition-transform cursor-default"
        >
          {tag}
        </span>
      ));
    }
    if (typeof tags === 'string' && tags.trim() !== '') {
      return tags.split(',').map((tag: string, tagIndex: number) => (
        <span
          key={tagIndex}
          className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs hover:scale-110 transition-transform cursor-default"
        >
          {tag.trim()}
        </span>
      ));
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEO 
        title="Latest News & Updates - CDI SAKATA INX CORP Industry Insights"
        description="Stay updated with the latest news, innovations, awards, and industry insights from CDI SAKATA INX Corporation. Discover our product launches, sustainability initiatives, global expansions, and printing industry developments."
        keywords="CDI Sakata news, printing ink industry news, innovation updates, company announcements, sustainability initiatives, industry awards, product launches, printing technology"
        canonical="/news"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "CDI SAKATA INX CORP News & Updates",
          "description": "Latest news, innovations, and industry insights from CDI SAKATA INX Corporation",
          "publisher": {
            "@type": "Organization",
            "name": "CDI SAKATA INX CORP"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "/news"
          }
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-60"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-7xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-black text-white mb-4">
              Latest <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">News</span>
            </h1>
                  <div
  className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[600px] h-[6px] sm:h-[8px] lg:h-[10px] mt-3 rounded-full mx-auto mb-6"
  style={{
    background: 'linear-gradient(to right, #dcdcdc 0%, #bfbfbf 75%, #0072ce 75%, #0072ce 100%)'
  }}
></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stay updated with breakthrough innovations, industry achievements, and the latest developments from CDI SAKATA INX CORP.
            </p>
            
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div id="search-filter" className="py-8 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 w-full max-w-5xl">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center justify-center px-4 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-blue-100 text-gray-600 hover:bg-blue-200 hover:text-gray-800 border border-blue-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Featured News */}
      <div id="featured-news" className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-blue-100 border border-blue-200 rounded-3xl overflow-hidden mb-16 animate-fade-in shadow-xl">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img 
                  src={(() => {
                    const imageUrl = featuredNews.image || "/placeholder.svg";
                    return imageUrl.startsWith('/uploads/') 
                      ? getImageUrl(imageUrl) 
                      : imageUrl;
                  })()} 
                  alt={featuredNews.title || "Featured News"}
                  className="w-full h-full object-cover min-h-[400px] hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    console.log(`❌ Failed to load featured news image: ${featuredNews.image}`);
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {featuredNews.date || ""}
                  </span>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {(() => {
                        const featuredCategories = Array.isArray(featuredNews.categories) 
                          ? featuredNews.categories 
                          : (typeof featuredNews.categories === 'string' 
                              ? featuredNews.categories.split(',').map(c => c.trim()) 
                              : (featuredNews.category ? [featuredNews.category] : []));
                        
                        return featuredCategories.map((category, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {category}
                          </span>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer">
                  {featuredNews.title || ""}
                </h2>
                {featuredNews.subtitle && (
                  <p className="text-xl text-blue-600 mb-6">{featuredNews.subtitle}</p>
                )}
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{featuredNews.summary || ""}</p>
                <div className="flex flex-wrap gap-2 mb-6">{renderTagsLight(featuredNews.tags)}</div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{featuredNews.author || ""}</span>
                  </div>
                </div>
                {featuredNews.isExternalLink && featuredNews.pdfUrl ? (
                  <a
                    href={featuredNews.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                  >
                    View PDF
                    <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={`/news/${featuredNews.id}`}
                    className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                  >
                    Read Full Story
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div id="all-news" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="text-gray-900 text-xl col-span-full text-center">Loading news...</div>
            ) : error ? (
              <div className="text-red-500 text-xl col-span-full text-center">{error}</div>
            ) : filteredNews.length === 0 ? (
              <div className="text-gray-900 text-xl col-span-full text-center">No news found.</div>
            ) : (
              visibleNews.map((item, index) => (
                <article
                  key={item.id || index}
                  className="group bg-blue-100 border border-blue-200 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-700 animate-fade-in shadow-lg hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={(() => {
                        const imageUrl = item.image || "/placeholder.svg";
                        return imageUrl.startsWith('/uploads/') 
                          ? getImageUrl(imageUrl) 
                          : imageUrl;
                      })()} 
                      alt={item.title || "News"}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        console.log(`❌ Failed to load news image: ${item.image}`);
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <div className="flex flex-wrap gap-1">
                        {(() => {
                          const itemCategories = Array.isArray(item.categories) 
                            ? item.categories 
                            : (typeof item.categories === 'string' 
                                ? item.categories.split(',').map(c => c.trim()) 
                                : (item.category ? [item.category] : []));
                          
                          return itemCategories.slice(0, 3).map((category, index) => (
                            <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {category}
                            </span>
                          ));
                        })()}
                        {(() => {
                          const itemCategories = Array.isArray(item.categories) 
                            ? item.categories 
                            : (typeof item.categories === 'string' 
                                ? item.categories.split(',').map(c => c.trim()) 
                                : (item.category ? [item.category] : []));
                          
                          if (itemCategories.length > 3) {
                            return (
                              <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                +{itemCategories.length - 3}
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date || ""}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                      {item.title || ""}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {item.summary || ""}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">{renderTagsLight(item.tags)}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="w-3 h-3 mr-1" />
                        {item.author || ""}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-300">
                      {item.isExternalLink && item.pdfUrl ? (
                        <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                        >
                          View PDF
                          <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      ) : (
                        <Link
                          to={`/news/${item.id}`}
                          className="group flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                        >
                          Read More
                          <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Load More & Hide More */}
          <div className="text-center mt-16">
            {canLoadMore && (
              <button
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
                onClick={() => { setShowAll(true); setVisibleCount(filteredNews.length); }}
              >
                Load More News
                <TrendingUp className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            )}
            {canHideMore && (
              <button
                className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto mt-4"
                onClick={() => { setShowAll(false); setVisibleCount(INITIAL_NEWS_COUNT); }}
              >
                Hide More News
                <ChevronRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform rotate-180" />
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};export default News;