import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SearchResult, simpleSearch } from '../utils/searchEngine';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchContent = async () => {
      setIsLoading(true);
      
      if (!query.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      // Use simple search
      const searchResults = simpleSearch(query);
      setResults(searchResults);
      setIsLoading(false);
    };

    searchContent();
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    // Navigate to the result and scroll to anchor if available
    if (result.anchor) {
      navigate(result.path);
      setTimeout(() => {
        const element = document.getElementById(result.anchor!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      navigate(result.path);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Company': 'bg-blue-100 text-blue-800',
      'Products': 'bg-green-100 text-green-800',
      'Sustainability': 'bg-emerald-100 text-emerald-800',
      'Innovation': 'bg-purple-100 text-purple-800',
      'Careers': 'bg-orange-100 text-orange-800',
      'News': 'bg-red-100 text-red-800',
      'Contact': 'bg-gray-100 text-gray-800',
      'Global': 'bg-indigo-100 text-indigo-800',
      'Legal': 'bg-yellow-100 text-yellow-800',
      'Support': 'bg-pink-100 text-pink-800',
      'Impact': 'bg-teal-100 text-teal-800',
      'Quality': 'bg-cyan-100 text-cyan-800',
      'Safety': 'bg-green-100 text-green-800',
      'Certification': 'bg-purple-100 text-purple-800',
      'Recognition': 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'section':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
      case 'database':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
            {query && (
              <div className="flex items-center gap-2 text-gray-600">
                <span>Showing results for:</span>
                <span className="font-semibold text-blue-600">"{query}"</span>
                {!isLoading && (
                  <span className="text-sm">({results.length} results found)</span>
                )}
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          )}

          {/* No Query */}
          {!query && !isLoading && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
              <p className="text-gray-600">Enter a search term to find pages, sections, and content.</p>
            </div>
          )}

          {/* No Results */}
          {query && !isLoading && results.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or browse our main sections:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/products" className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">Products</Link>
                <Link to="/about" className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors">About</Link>
                <Link to="/news" className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors">News</Link>
                <Link to="/career" className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm hover:bg-orange-200 transition-colors">Careers</Link>
                <Link to="/contact" className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors">Contact</Link>
              </div>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.id || index}
                  onClick={() => handleResultClick(result)}
                  className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-gray-400 mt-1">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {result.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(result.category)}`}>
                          {result.category}
                        </span>
                        {result.type === 'database' && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                            Live Content
                          </span>
                        )}
                        {result.anchor && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
                            Direct Link
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-blue-600 hover:text-blue-800">
                          {result.path}{result.anchor ? `#${result.anchor}` : ''}
                        </div>
                        {(result as any).score && (
                          <div className="text-xs text-gray-400">
                            Relevance: {Math.round((result as any).score / 10)}%
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
