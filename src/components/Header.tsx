import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getSearchSuggestions } from '../utils/searchEngine';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  });
  const [browsingHistory, setBrowsingHistory] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('browsingHistory') || '[]');
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBrowsingHistory((prev) => {
      const updated = [location.pathname, ...prev.filter(p => p !== location.pathname)];
      localStorage.setItem('browsingHistory', JSON.stringify(updated.slice(0, 5)));
      return updated.slice(0, 5);
    });
  }, [location.pathname]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Generate search suggestions based on input
  useEffect(() => {
    if (searchTerm.length > 1) {
      const suggestions = getSearchSuggestions(searchTerm);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const navLinks = [
    { 
      name: 'Home', 
      path: '/',
      subPages: [
        { name: 'Innovation Showcase', path: '/#innovation' },
        { name: 'Sustainable Innovation', path: '/#botanical' },
        { name: 'Our Impact', path: '/#impact' },
        { name: 'Why Choose CDI SAKATA INX CORP', path: '/#why-choose' },
        { name: 'Our Global Presence', path: '/#global-presence' },
        { name: 'Our Policies', path: '/policies' },
        { name: 'Global Affiliates Network', path: '/affiliates' }
      ]
    },
    { 
      name: 'About', 
      path: '/about',
      subPages: [
        { name: 'Company Overview', path: '/about' },
        { name: 'Our History', path: '/about#history' },
        { name: 'Mission & Vision', path: '/about#mission' },
        { name: 'Leadership Team', path: '/about#team' },
        { name: 'Our Team', path: '/team' }
      ]
    },
    { 
      name: 'Products', 
      path: '/products',
      subPages: [
        { name: 'Product Categories', path: '/products#product-categories' },
        { name: 'Solvent-Based Inks', path: '/products?category=digital#product-categories' },
        { name: 'Water-Based Inks', path: '/products?category=offset#product-categories' },
        { name: 'Metal Coating and Glass', path: '/products?category=specialty#product-categories' },
        { name: 'Eco-Friendly Series', path: '/products?category=sustainable#product-categories' },
        { name: 'Industry Recognition', path: '/products#industry-recognition' }
      ]
    },
    { 
      name: 'Career', 
      path: '/career',
      subPages: [
        { name: 'Job Opportunities', path: '/career#open-positions' },
        { name: 'Available Positions', path: '/career#job-listings' },
        { name: 'Benefits & Perks', path: '/career#benefits' },
        { name: 'Application Process', path: '/career#application' }
      ]
    },
    { 
      name: 'News', 
      path: '/news',
      subPages: [
        { name: 'Featured News', path: '/news#featured-news' },
        { name: 'All News', path: '/news?category=all#search-filter' },
        { name: 'Innovation', path: '/news?category=innovation#featured-news' },
        { name: 'Awards', path: '/news?category=awards#featured-news' },
        { name: 'Expansion', path: '/news?category=expansion#featured-news' },
        { name: 'Sustainability', path: '/news?category=sustainability#featured-news' }
      ]
    },
    { 
      name: 'Contact', 
      path: '/contact',
      subPages: [
        { name: 'Contact Form', path: '/contact#contact-form' },
        { name: 'Contact Information', path: '/contact#contact-info' },
        { name: 'Frequently Asked Questions', path: '/contact#faq' },
        { name: 'Business Hours', path: '/contact#contact-info' }
      ]
    },
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)];
      setRecentSearches(updated.slice(0, 5));
      localStorage.setItem('recentSearches', JSON.stringify(updated.slice(0, 5)));
      
      // Navigate to comprehensive search results page
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      
      setIsSearchOpen(false);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('/#')) {
      // Handle anchor links on the home page
      const targetId = href.substring(2); // Remove '/#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (href.includes('#')) {
      // Handle anchor links on any page (including cross-page navigation)
      const [path, anchor] = href.split('#');
      
      if (path === location.pathname) {
        // Same page - scroll to anchor
        const targetElement = document.getElementById(anchor);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // Different page - navigate then scroll
        window.location.href = href;
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300/20">
      <div className="w-full px-2 sm:px-4 lg:px-0 py-1">
        <div className={`flex items-center transition-all duration-300 justify-between`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group pl-2 sm:pl-4 pr-2">
            <img
              src="/logo.png"
              alt="CDI SAKATA INX Logo"
              className="h-8 sm:h-12 w-auto object-contain px--5"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isSearchOpen && (
            <nav className="hidden lg:flex items-center space-x-8 ml-auto">
              {navLinks.map((link, linkIndex) => (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center ${
                      location.pathname === link.path
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                    {/* Simple Chevron */}
                    <svg className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    
                    {/* Simple Underline */}
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-200 ${
                      location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></div>
                  </Link>
                  
                  {/* Clean Mega Menu */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-8">
                        
                        {/* Left Column - Navigation */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                            {link.name}
                          </h3>
                          
                          <div className="space-y-1">
                            {link.subPages?.map((subPage, index) => (
                              <Link
                                key={index}
                                to={subPage.path}
                                onClick={(e) => {
                                  if (subPage.path.startsWith('/#') || (subPage.path.includes('#') && subPage.path.startsWith(location.pathname))) {
                                    e.preventDefault();
                                    handleSmoothScroll(subPage.path);
                                  }
                                }}
                                className="block p-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                              >
                                <div className="font-medium">{subPage.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {index === 0 && "Overview and main information"}
                                  {index === 1 && "Detailed content and resources"}
                                  {index === 2 && "Team and organizational info"}
                                  {index === 3 && "Goals and strategic direction"}
                                  {index === 4 && "Global reach and locations"}
                                  {index >= 5 && "Additional resources"}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        {/* Right Column - Featured */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-5">
                          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                            Featured
                          </div>
                          
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">
                            {linkIndex === 0 && "Welcome to CDI SAKATA INX"}
                            {linkIndex === 1 && "Our Heritage Since 1964"}
                            {linkIndex === 2 && "Innovation in Printing"}
                            {linkIndex === 3 && "Join Our Team"}
                            {linkIndex === 4 && "Latest Updates"}
                            {linkIndex === 5 && "Get in Touch"}
                          </h4>
                          
                          <p className="text-sm text-gray-600 mb-4">
                            {linkIndex === 0 && "Explore our comprehensive solutions for all your printing needs."}
                            {linkIndex === 1 && "Discover our history of innovation in the printing industry."}
                            {linkIndex === 2 && "Leading ink technologies for modern printing solutions."}
                            {linkIndex === 3 && "Exciting opportunities in a growing global company."}
                            {linkIndex === 4 && "Stay informed with our latest news and developments."}
                            {linkIndex === 5 && "Connect with our worldwide network of experts."}
                          </p>
                          
                          <Link
                            to={link.path}
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                          >
                            Learn more
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Simple Footer */}
                      <div className="border-t border-gray-100 mt-6 pt-4 text-center">
                        <span className="text-xs text-gray-500">{link.subPages?.length} sections available</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          )}

          {/* Search Bar */}
          <div className={`relative transition-all duration-300 ${
            isSearchOpen 
              ? 'flex-1 max-w-4xl mx-auto mr-2 sm:mr-6' 
              : 'ml-2 sm:ml-6 mr-2 sm:mr-6 w-[200px] sm:w-[280px] lg:w-[320px]'
          }`}>
            <div
              className={`flex items-center border border-gray-400 rounded px-2 sm:px-3 py-2 bg-white/20 transition-all duration-300 w-full ${
                isSearchOpen ? 'shadow-lg ring-2 ring-blue-400' : ''
              }`}
              // Only open search on click, not on input focus
              onClick={() => {
                if (!isSearchOpen) setIsSearchOpen(true);
              }}
            >
              <svg
                className="w-5 h-5 text-gray-600 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className="bg-transparent outline-none text-gray-800 flex-1 text-sm sm:text-lg placeholder-gray-600"
                placeholder="Search"
                value={searchTerm}
                // Remove onFocus handler to prevent reopening on blur
                onChange={e => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    handleSearch();
                  }
                  if (e.key === 'Escape') {
                    setIsSearchOpen(false);
                    setSearchTerm('');
                    setShowSuggestions(false);
                  }
                }}
              />
              {searchTerm && (
                <button
                  className="ml-1 sm:ml-2 text-blue-600 hover:text-blue-800 p-1 transition-colors"
                  onClick={handleSearch}
                  type="button"
                  title="Search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                  </svg>
                </button>
              )}
              {isSearchOpen && (
                <button
                  className="ml-1 sm:ml-2 text-gray-600 hover:text-gray-800 p-1"
                  onClick={e => {
                    e.stopPropagation(); // Prevent reopening search
                    setIsSearchOpen(false);
                    setSearchTerm('');
                  }}
                  type="button"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
            {/* Dropdown for suggestions, recent searches and browsing history */}
            {isSearchOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-50 p-4 sm:p-6">
                
                {/* Search Suggestions (shown when typing) */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-2 font-semibold text-gray-700 uppercase text-xs sm:text-sm tracking-wide">Suggestions</div>
                    <ul className="space-y-1">
                      {searchSuggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer text-gray-800 hover:text-blue-600 hover:bg-blue-50 truncate py-2 px-3 rounded text-sm sm:text-base transition-colors"
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setShowSuggestions(false);
                            // Auto-search when suggestion is clicked
                            setTimeout(() => {
                              const updated = [suggestion, ...recentSearches.filter(s => s !== suggestion)];
                              setRecentSearches(updated.slice(0, 5));
                              localStorage.setItem('recentSearches', JSON.stringify(updated.slice(0, 5)));
                              
                              navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                              setIsSearchOpen(false);
                              setSearchTerm('');
                            }, 100);
                          }}
                        >
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                            </svg>
                            {suggestion}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recent Searches and Browsing History (shown when not typing or no suggestions) */}
                {(!showSuggestions || searchTerm.length <= 1) && (
                  <div className="flex flex-col gap-6 sm:gap-8 sm:flex-row">
                    <div className="flex-1 min-w-[200px]">
                      <div className="mb-2 font-semibold text-gray-700 uppercase text-xs sm:text-sm tracking-wide">Recent Searches</div>
                      <ul className="space-y-1">
                        {recentSearches.length === 0 && (
                          <li className="text-gray-500 text-sm sm:text-base">No recent searches to show.</li>
                        )}
                        {recentSearches.map((item, idx) => (
                          <li
                            key={idx}
                            className="cursor-pointer text-gray-800 hover:text-blue-600 hover:bg-blue-50 truncate py-2 px-3 rounded text-sm sm:text-base transition-colors"
                            onClick={() => {
                              setSearchTerm(item);
                              navigate(`/search?q=${encodeURIComponent(item)}`);
                              setIsSearchOpen(false);
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <div className="mb-2 font-semibold text-gray-700 uppercase text-xs sm:text-sm tracking-wide">Browsing History</div>
                      <ul className="space-y-1">
                        {browsingHistory.length === 0 && (
                          <li className="text-gray-500 text-sm sm:text-base">No browsing history to show.</li>
                        )}
                        {browsingHistory.map((path, idx) => (
                          <li
                            key={idx}
                            className="cursor-pointer text-gray-800 hover:text-blue-600 hover:bg-blue-50 truncate py-2 px-3 rounded text-sm sm:text-base transition-colors"
                            onClick={() => {
                              setIsSearchOpen(false);
                              navigate(path);
                            }}
                          >
                            {path}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-blue-600 transition-colors ml-1 sm:ml-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {!isSearchOpen && isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-300/20 px-2 sm:px-4">
            <div className="flex flex-col space-y-1 pt-4 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {location.pathname === link.path && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
