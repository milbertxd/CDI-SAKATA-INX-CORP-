import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User, Tag, ChevronLeft, Share2, Clock, Globe, Mail, Facebook, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { API_BASE_URL, getImageUrl } from '../config/api';

// Enhanced content formatting function
function formatArticleContent(content: string): string {
  return content
    // Convert headers
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-blue-600 pb-2">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-800 mt-6 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-800 mt-5 mb-2">$1</h3>')
    
    // Convert bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-gray-700">$1</em>')
    
    // Convert lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-1">$1. $2</li>')
    
    // Convert image syntax: ![alt](url) or [Image Description](url) with proper URL handling
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      const imageUrl = url.startsWith('/uploads/') ? getImageUrl(url) : url;
      console.log('🖼️ Content Image - Original URL:', url, 'Processed URL:', imageUrl);
      return `<div class="my-8"><img src="${imageUrl}" alt="${alt}" class="w-full max-w-2xl mx-auto rounded-lg shadow-lg" onerror="this.src='/placeholder.svg'"/><p class="text-center text-sm text-gray-600 mt-2 italic">${alt}</p></div>`;
    })
    .replace(/\[Image:\s*([^\]]+)\]\(([^)]+)\)/g, (match, alt, url) => {
      const imageUrl = url.startsWith('/uploads/') ? getImageUrl(url) : url;
      console.log('🖼️ Content Image Alt - Original URL:', url, 'Processed URL:', imageUrl);
      return `<div class="my-8"><img src="${imageUrl}" alt="${alt}" class="w-full max-w-2xl mx-auto rounded-lg shadow-lg" onerror="this.src='/placeholder.svg'"/><p class="text-center text-sm text-gray-600 mt-2 italic">${alt}</p></div>`;
    })
    
    // Convert links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Convert line breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br>')
    
    // Wrap in paragraph tags
    .replace(/^/, '<p class="mb-4">')
    .replace(/$/, '</p>');
}

function renderTags(tags: any) {
  if (Array.isArray(tags)) {
    return tags.map((tag, idx) => (
      <span key={idx} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
        {tag}
      </span>
    ));
  }
  if (typeof tags === 'string' && tags.trim() !== '') {
    return tags.split(',').map((tag: string, idx: number) => (
      <span key={idx} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
        {tag.trim()}
      </span>
    ));
  }
  return null;
}

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);

  useEffect(() => {
    console.log('🔍 Fetching news for ID:', id);
    console.log('🔗 API URL:', `${API_BASE_URL}/api/news/${id}`);
    
    // Fetch main news article
    axios.get(`${API_BASE_URL}/api/news/${id}`)
      .then(res => {
        console.log('📰 News data received:', res.data);
        console.log('🖼️ Image field:', res.data.image);
        setNews(res.data);
        setLoading(false);
        
        // Fetch related news (same category)
        return axios.get(`${API_BASE_URL}/api/news`);
      })
      .then(res => {
        const related = res.data
          .filter((item: any) => item.id !== parseInt(id!) && 
                  (item.categories || item.category || '').includes(res.data.find((n: any) => n.id === parseInt(id!))?.categories || res.data.find((n: any) => n.id === parseInt(id!))?.category))
          .slice(0, 3);
        setRelatedNews(related);
      })
      .catch((err) => {
        console.error('❌ Error fetching news:', err);
        setLoading(false);
      });
  }, [id]);

  const shareUrl = window.location.href;
  const shareTitle = news?.title || '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto max-w-4xl py-20 px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto max-w-4xl py-20 px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The requested news article could not be found.</p>
            <Link to="/news" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to News
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto max-w-6xl px-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>›</span>
            <Link to="/news" className="hover:text-blue-600 transition-colors">News</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{news.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Article */}
      <article className="py-12">
        <div className="container mx-auto max-w-4xl px-6">
          
          {/* Back Button */}
          <Link 
            to="/news" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to News
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            <div className="mb-4">
              {(() => {
                const categories = Array.isArray(news.categories) 
                  ? news.categories 
                  : (typeof news.categories === 'string' 
                      ? news.categories.split(',').map((c: string) => c.trim()) 
                      : (news.category ? [news.category] : []));
                
                return categories.slice(0, 2).map((category: string, index: number) => (
                  <span key={index} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mr-2 mb-2">
                    {category}
                  </span>
                ));
              })()}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {news.title}
            </h1>

            {/* Subtitle */}
            {news.subtitle && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6">{news.subtitle}</p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-t border-b border-gray-200 mb-8">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-medium">{new Date(news.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{news.author}</span>
              </div>
              

              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 mr-2" />
                <span className="font-medium">CDI SAKATA INX CORP.</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={(() => {
                const imageUrl = news.image || "/placeholder.svg";
                console.log('🖼️ NewsDetail Image URL:', imageUrl);
                console.log('🔗 API_BASE_URL:', API_BASE_URL);
                
                // Handle different image URL formats more robustly
                if (!imageUrl || imageUrl === "/placeholder.svg") {
                  return "/placeholder.svg";
                }
                
                // If it's already a full URL, use it as is
                if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
                  console.log('🌐 Using full URL:', imageUrl);
                  return imageUrl;
                }
                
                // If it starts with /uploads/, use getImageUrl
                if (imageUrl.startsWith('/uploads/')) {
                  const fullUrl = getImageUrl(imageUrl);
                  console.log('📁 Uploads URL:', fullUrl);
                  return fullUrl;
                }
                
                // If it's just a filename, try both public and uploads
                if (!imageUrl.startsWith('/')) {
                  const uploadsUrl = getImageUrl(`/uploads/${imageUrl}`);
                  console.log('📄 Filename to uploads URL:', uploadsUrl);
                  return uploadsUrl;
                }
                
                // For public images
                console.log('🏠 Public URL:', imageUrl);
                return imageUrl;
              })()} 
              alt={news.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              onError={(e) => {
                console.log('❌ Image failed to load:', (e.target as HTMLImageElement).src);
                // Try alternative paths before giving up
                const originalSrc = (e.target as HTMLImageElement).src;
                if (originalSrc.includes('/uploads/') && !originalSrc.includes('placeholder')) {
                  console.log('🔄 Trying without /uploads/ prefix...');
                  const filename = originalSrc.split('/uploads/').pop();
                  (e.target as HTMLImageElement).src = `${API_BASE_URL}/${filename}`;
                } else if (!originalSrc.includes('placeholder')) {
                  console.log('🔄 Using placeholder as final fallback');
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }
              }}
            />
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-between mb-8 p-4 bg-gray-100 rounded-xl">
            <span className="text-gray-700 font-semibold">Share this article:</span>
            <div className="flex items-center space-x-3">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <button 
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Summary Section */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Executive Summary</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{news.summary}</p>
            </div>

            {/* Main Content with Enhanced Formatting */}
            {news.content && (
              <div className="text-gray-800 leading-relaxed space-y-6">
                <div 
                  className="prose prose-lg max-w-none article-content"
                  dangerouslySetInnerHTML={{ 
                    __html: formatArticleContent(news.content)
                  }}
                />
              </div>
            )}
          </div>

          {/* Tags */}
          {news.tags && (
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-3">
                {renderTags(news.tags)}
              </div>
            </div>
          )}

          {/* Author Info */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{news.author}</h3>
                <p className="text-gray-600 mb-3">
                  Communications Team, CDI SAKATA INX CORP.
                </p>
                <p className="text-sm text-gray-500">
                  Our communications team is dedicated to keeping stakeholders informed about CDI SAKATA INX CORP.'s latest developments, innovations, and achievements in the printing ink industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedNews.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedNews.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/news/${article.id}`}
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img 
                    src={(() => {
                      const imageUrl = article.image || "/placeholder.svg";
                      return imageUrl.startsWith('/uploads/') 
                        ? getImageUrl(imageUrl) 
                        : imageUrl;
                    })()} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      {article.categories || article.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{article.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default NewsDetail;