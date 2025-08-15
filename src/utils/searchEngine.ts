export interface SearchResult {
  id: string;
  title: string;
  path: string;
  anchor?: string;
  description: string;
  content: string;
  category: string;
  type: 'page' | 'section' | 'database' | 'component';
  priority: number;
  keywords: string[];
}

// Database content fetcher
export const fetchDatabaseContent = async (): Promise<SearchResult[]> => {
  const results: SearchResult[] = [];
  
  // Make database content optional - if it fails, continue with static content
  try {
    const { API_ENDPOINTS } = await import('../config/api');
    
    // Fetch News
    try {
      const newsResponse = await fetch(API_ENDPOINTS.NEWS);
      if (newsResponse.ok) {
        const news = await newsResponse.json();
        news.forEach((item: any) => {
          results.push({
            id: `news-${item.id}`,
            title: item.title,
            path: `/news/${item.id}`,
            description: item.excerpt || item.content?.substring(0, 200) + '...',
            content: `${item.title} ${item.excerpt || ''} ${item.content || ''}`,
            category: item.category || 'News',
            type: 'database',
            priority: 8,
            keywords: [item.title?.toLowerCase(), item.category?.toLowerCase(), 'news', 'updates'].filter(Boolean)
          });
        });
      }
    } catch (error) {
      console.log('News not available:', error);
    }

    try {
      // Fetch Careers
      const careersResponse = await fetch(API_ENDPOINTS.CAREERS);
      if (careersResponse.ok) {
        const careers = await careersResponse.json();
        careers.forEach((item: any) => {
          results.push({
            id: `career-${item.id}`,
            title: item.title,
            path: `/career#job-${item.id}`,
            description: item.description?.substring(0, 200) + '...',
            content: `${item.title} ${item.description || ''} ${item.requirements || ''}`,
            category: 'Careers',
            type: 'database',
            priority: 7,
            keywords: [item.title?.toLowerCase(), 'job', 'career', 'employment', 'work'].filter(Boolean)
          });
        });
      }
    } catch (error) {
      console.log('Careers not available:', error);
    }

    try {
      // Fetch Products
      const productsResponse = await fetch(API_ENDPOINTS.PRODUCTS);
      if (productsResponse.ok) {
        const products = await productsResponse.json();
        products.forEach((item: any) => {
          results.push({
            id: `product-${item.id}`,
            title: item.name,
            path: `/products#product-${item.id}`,
            description: item.description?.substring(0, 200) + '...',
            content: `${item.name} ${item.description || ''} ${item.category || ''}`,
            category: 'Products',
            type: 'database',
            priority: 9,
            keywords: [item.name?.toLowerCase(), item.category?.toLowerCase(), 'product', 'ink', 'printing'].filter(Boolean)
          });
        });
      }
    } catch (error) {
      console.log('Products not available:', error);
    }
  } catch (error) {
    console.log('API configuration not available, skipping database content:', error);
  }

  return results;
};

// Static content index - comprehensive mapping of all your pages
export const staticContentIndex: SearchResult[] = [
  // HOME PAGE SECTIONS
  {
    id: 'hero-main',
    title: 'CDI SAKATA INX CORP - Leading Printing Ink Solutions',
    path: '/',
    anchor: '',
    description: 'Welcome to CDI SAKATA INX CORP, your trusted partner in printing excellence since 1964.',
    content: 'CDI SAKATA INX CORP leading printing ink solutions excellence innovation sustainable technology eco-friendly botanical inks',
    category: 'Company',
    type: 'section',
    priority: 10,
    keywords: ['cdi', 'sakata', 'inx', 'corp', 'home', 'main', 'company', 'printing', 'ink', 'solutions']
  },
  {
    id: 'hero-innovation',
    title: 'Innovation Showcase',
    path: '/',
    anchor: 'innovation',
    description: 'Discover our latest innovations in ink technology and sustainable printing solutions.',
    content: 'innovation showcase latest technology sustainable printing solutions advanced research development',
    category: 'Innovation',
    type: 'section',
    priority: 9,
    keywords: ['innovation', 'showcase', 'technology', 'research', 'development', 'advanced', 'latest']
  },
  {
    id: 'hero-botanical',
    title: 'Sustainable Innovation - Botanical Inks',
    path: '/',
    anchor: 'botanical',
    description: 'Learn about our botanical inks and eco-friendly printing solutions.',
    content: 'botanical inks eco-friendly sustainable innovation environmental green technology natural organic',
    category: 'Sustainability',
    type: 'section',
    priority: 9,
    keywords: ['botanical', 'eco-friendly', 'sustainable', 'environmental', 'green', 'natural', 'organic']
  },
  {
    id: 'features-excellence',
    title: '60+ Years of Excellence',
    path: '/',
    anchor: 'why-choose',
    description: 'Six decades of innovation in printing ink manufacturing and technological advancement since 1963.',
    content: '60 years excellence innovation manufacturing technological advancement since 1963 experience heritage legacy',
    category: 'Company',
    type: 'section',
    priority: 8,
    keywords: ['60', 'years', 'excellence', 'since', '1963', '1964', 'heritage', 'legacy', 'experience']
  },
  {
    id: 'features-global',
    title: 'Global Manufacturing Network',
    path: '/',
    anchor: 'why-choose',
    description: 'Strategic facilities across Asia-Pacific serving 20+ countries with localized expertise.',
    content: 'global manufacturing network strategic facilities asia pacific 20 countries localized expertise international',
    category: 'Global',
    type: 'section',
    priority: 8,
    keywords: ['global', 'manufacturing', 'network', 'asia', 'pacific', 'countries', 'international', 'facilities']
  },
  {
    id: 'features-laboratory',
    title: 'Advanced R&D Laboratory',
    path: '/',
    anchor: 'why-choose',
    description: 'State-of-the-art research facilities developing next-generation ink formulations.',
    content: 'advanced research development laboratory state art facilities next generation ink formulations',
    category: 'Innovation',
    type: 'section',
    priority: 8,
    keywords: ['research', 'development', 'laboratory', 'r&d', 'advanced', 'formulations', 'technology']
  },
  {
    id: 'global-presence',
    title: 'Our Global Presence',
    path: '/',
    anchor: 'global-presence',
    description: 'Explore our worldwide network and global manufacturing capabilities.',
    content: 'global presence worldwide network manufacturing capabilities international locations facilities offices',
    category: 'Global',
    type: 'section',
    priority: 8,
    keywords: ['global', 'presence', 'worldwide', 'network', 'international', 'locations', 'offices']
  },

  // ABOUT PAGE
  {
    id: 'about-main',
    title: 'About CDI SAKATA INX CORP',
    path: '/about',
    description: 'Learn about CDI SAKATA INX Corp, our history, mission, and vision since 1964.',
    content: 'about cdi sakata inx corp history mission vision values since 1964 company overview leadership team',
    category: 'Company',
    type: 'page',
    priority: 10,
    keywords: ['about', 'company', 'history', 'mission', 'vision', 'values', 'overview', 'leadership']
  },
  {
    id: 'about-history',
    title: 'Our Heritage and History',
    path: '/about',
    anchor: 'history',
    description: 'Discover our rich heritage and journey from 1964 to becoming a leading ink manufacturer.',
    content: 'heritage history journey 1964 leading ink manufacturer evolution growth development milestones',
    category: 'Company',
    type: 'section',
    priority: 8,
    keywords: ['heritage', 'history', 'journey', 'evolution', 'growth', 'milestones', 'foundation']
  },
  {
    id: 'about-mission',
    title: 'Mission & Vision',
    path: '/about',
    anchor: 'mission',
    description: 'Our mission to provide innovative printing solutions and vision for sustainable future.',
    content: 'mission vision innovative printing solutions sustainable future goals objectives purpose values',
    category: 'Company',
    type: 'section',
    priority: 8,
    keywords: ['mission', 'vision', 'goals', 'objectives', 'purpose', 'values', 'future']
  },
  {
    id: 'about-team',
    title: 'Leadership Team',
    path: '/about',
    anchor: 'team',
    description: 'Meet our experienced leadership team driving innovation and growth.',
    content: 'leadership team experienced management executives directors innovation growth expertise',
    category: 'Company',
    type: 'section',
    priority: 7,
    keywords: ['leadership', 'team', 'management', 'executives', 'directors', 'expertise']
  },

  // PRODUCTS PAGE
  {
    id: 'products-main',
    title: 'Products - Printing Inks & Coatings',
    path: '/products',
    description: 'Explore our comprehensive range of printing inks and coating solutions.',
    content: 'products printing inks coatings comprehensive range solutions solvent water based digital offset',
    category: 'Products',
    type: 'page',
    priority: 10,
    keywords: ['products', 'printing', 'inks', 'coatings', 'solutions', 'range', 'catalog']
  },
  {
    id: 'products-categories',
    title: 'Product Categories',
    path: '/products',
    anchor: 'product-categories',
    description: 'Browse our diverse product categories for different printing applications.',
    content: 'product categories diverse printing applications flexographic offset digital screen gravure',
    category: 'Products',
    type: 'section',
    priority: 9,
    keywords: ['categories', 'flexographic', 'offset', 'digital', 'screen', 'gravure', 'applications']
  },
  {
    id: 'products-solvent',
    title: 'Solvent-Based Inks',
    path: '/products',
    anchor: 'solvent-based',
    description: 'High-performance solvent-based inks for digital and flexographic printing.',
    content: 'solvent based inks high performance digital flexographic printing packaging labels',
    category: 'Products',
    type: 'section',
    priority: 8,
    keywords: ['solvent', 'based', 'inks', 'digital', 'flexographic', 'packaging', 'labels']
  },
  {
    id: 'products-water',
    title: 'Water-Based Inks',
    path: '/products',
    anchor: 'water-based',
    description: 'Eco-friendly water-based inks for offset printing and packaging applications.',
    content: 'water based inks eco friendly offset printing packaging applications sustainable environmental',
    category: 'Products',
    type: 'section',
    priority: 8,
    keywords: ['water', 'based', 'inks', 'eco-friendly', 'offset', 'packaging', 'sustainable']
  },
  {
    id: 'products-metal',
    title: 'Metal Coating and Glass Inks',
    path: '/products',
    anchor: 'metal-glass',
    description: 'Specialized coatings and inks for metal and glass printing applications.',
    content: 'metal coating glass inks specialized printing applications industrial decorative protective',
    category: 'Products',
    type: 'section',
    priority: 7,
    keywords: ['metal', 'coating', 'glass', 'specialized', 'industrial', 'decorative', 'protective']
  },
  {
    id: 'products-eco',
    title: 'Eco-Friendly Series',
    path: '/products',
    anchor: 'eco-series',
    description: 'Sustainable and environmentally conscious ink solutions for green printing.',
    content: 'eco friendly series sustainable environmental ink solutions green printing biodegradable renewable',
    category: 'Sustainability',
    type: 'section',
    priority: 8,
    keywords: ['eco-friendly', 'sustainable', 'environmental', 'green', 'biodegradable', 'renewable']
  },

  // TEAM PAGE
  {
    id: 'team-main',
    title: 'Our Team - Meet Our Professionals',
    path: '/team',
    description: 'Meet our leadership team and skilled professionals driving innovation.',
    content: 'team professionals leadership skilled innovation expertise management staff employees',
    category: 'Company',
    type: 'page',
    priority: 7,
    keywords: ['team', 'professionals', 'leadership', 'staff', 'employees', 'management', 'expertise']
  },

  // CAREER PAGE
  {
    id: 'career-main',
    title: 'Career Opportunities',
    path: '/career',
    description: 'Join our team and explore exciting career opportunities worldwide.',
    content: 'career opportunities join team exciting worldwide employment jobs hiring positions benefits',
    category: 'Careers',
    type: 'page',
    priority: 9,
    keywords: ['career', 'opportunities', 'jobs', 'employment', 'hiring', 'positions', 'benefits', 'work']
  },
  {
    id: 'career-positions',
    title: 'Open Positions',
    path: '/career',
    anchor: 'open-positions',
    description: 'Browse current job openings and find your next career opportunity.',
    content: 'open positions job openings career opportunity current vacancies available roles',
    category: 'Careers',
    type: 'section',
    priority: 8,
    keywords: ['positions', 'openings', 'vacancies', 'roles', 'available', 'current']
  },
  {
    id: 'career-benefits',
    title: 'Benefits & Perks',
    path: '/career',
    anchor: 'benefits',
    description: 'Discover the comprehensive benefits package we offer our employees.',
    content: 'benefits perks comprehensive package employees health insurance training development growth',
    category: 'Careers',
    type: 'section',
    priority: 7,
    keywords: ['benefits', 'perks', 'package', 'health', 'insurance', 'training', 'development']
  },

  // NEWS PAGE
  {
    id: 'news-main',
    title: 'News & Updates',
    path: '/news',
    description: 'Stay updated with the latest news, innovations, and company announcements.',
    content: 'news updates latest innovations company announcements press releases industry events',
    category: 'News',
    type: 'page',
    priority: 8,
    keywords: ['news', 'updates', 'announcements', 'press', 'releases', 'events', 'latest']
  },
  {
    id: 'news-innovation',
    title: 'Innovation News',
    path: '/news?category=innovation',
    description: 'Latest news about our technological innovations and breakthroughs.',
    content: 'innovation news technological breakthroughs research development new products technology advances',
    category: 'Innovation',
    type: 'section',
    priority: 7,
    keywords: ['innovation', 'technological', 'breakthroughs', 'advances', 'new', 'products']
  },
  {
    id: 'news-awards',
    title: 'Awards & Recognition',
    path: '/news?category=awards',
    description: 'Industry awards and recognition received by CDI SAKATA INX.',
    content: 'awards recognition industry achievements certifications accolades honors excellence quality',
    category: 'Recognition',
    type: 'section',
    priority: 7,
    keywords: ['awards', 'recognition', 'achievements', 'certifications', 'honors', 'excellence']
  },

  // CONTACT PAGE
  {
    id: 'contact-main',
    title: 'Contact Us',
    path: '/contact',
    description: 'Get in touch with our team for inquiries, support, and partnerships.',
    content: 'contact us get touch team inquiries support partnerships customer service help',
    category: 'Contact',
    type: 'page',
    priority: 8,
    keywords: ['contact', 'touch', 'inquiries', 'support', 'partnerships', 'customer', 'service']
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    path: '/contact',
    anchor: 'contact-form',
    description: 'Send us a message using our online contact form.',
    content: 'contact form send message online inquiry request quote information',
    category: 'Contact',
    type: 'section',
    priority: 7,
    keywords: ['form', 'message', 'inquiry', 'request', 'quote', 'information']
  },
  {
    id: 'contact-info',
    title: 'Contact Information',
    path: '/contact',
    anchor: 'contact-info',
    description: 'Find our office locations, phone numbers, and business hours.',
    content: 'contact information office locations phone numbers business hours address email',
    category: 'Contact',
    type: 'section',
    priority: 7,
    keywords: ['information', 'office', 'locations', 'phone', 'address', 'email', 'hours']
  },
  {
    id: 'contact-faq',
    title: 'Frequently Asked Questions',
    path: '/contact',
    anchor: 'faq',
    description: 'Find answers to commonly asked questions about our products and services.',
    content: 'frequently asked questions FAQ answers common products services help support',
    category: 'Support',
    type: 'section',
    priority: 6,
    keywords: ['faq', 'questions', 'answers', 'help', 'support', 'common']
  },

  // POLICIES PAGE
  {
    id: 'policies-main',
    title: 'Company Policies',
    path: '/policies',
    description: 'Read our company policies, terms of service, and guidelines.',
    content: 'company policies terms service guidelines privacy policy legal compliance regulations',
    category: 'Legal',
    type: 'page',
    priority: 5,
    keywords: ['policies', 'terms', 'service', 'guidelines', 'privacy', 'legal', 'compliance']
  },

  // AFFILIATES PAGE
  {
    id: 'affiliates-main',
    title: 'Global Affiliates Network',
    path: '/affiliates',
    description: 'Explore our worldwide network of partners and affiliates.',
    content: 'global affiliates network worldwide partners distributors dealers representatives international',
    category: 'Global',
    type: 'page',
    priority: 7,
    keywords: ['affiliates', 'network', 'partners', 'distributors', 'dealers', 'representatives']
  },

  // SPECIALTY SECTIONS
  {
    id: 'quality-certification',
    title: 'Quality Certifications',
    path: '/products',
    anchor: 'certifications',
    description: 'ISO 9001:2015 certified quality management and industry standards compliance.',
    content: 'quality certifications ISO 9001 2015 standards compliance management system excellence',
    category: 'Quality',
    type: 'section',
    priority: 7,
    keywords: ['quality', 'certifications', 'iso', '9001', 'standards', 'compliance', 'management']
  },
  {
    id: 'food-safety',
    title: 'Food Safety & Compliance',
    path: '/products',
    anchor: 'food-safety',
    description: 'FDA approved inks with food contact compliance and migration testing.',
    content: 'food safety FDA approved inks contact compliance migration testing regulations packaging',
    category: 'Safety',
    type: 'section',
    priority: 7,
    keywords: ['food', 'safety', 'fda', 'approved', 'compliance', 'migration', 'testing']
  },
  {
    id: 'halal-kosher',
    title: 'Halal & Kosher Certified',
    path: '/products',
    anchor: 'halal-kosher',
    description: 'Halal and Kosher certified inks for religious compliance requirements.',
    content: 'halal kosher certified inks religious compliance requirements islamic jewish',
    category: 'Certification',
    type: 'section',
    priority: 6,
    keywords: ['halal', 'kosher', 'certified', 'religious', 'compliance', 'islamic', 'jewish']
  }
];

// Search function that combines static and database content
export const performSearch = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  console.log('🔍 Search term:', searchTerm);
  
  // Start with static content (always available)
  let allContent = [...staticContentIndex];
  console.log('📚 Static content items:', allContent.length);
  
  // Try to get database content (optional)
  try {
    const databaseResults = await fetchDatabaseContent();
    allContent = [...staticContentIndex, ...databaseResults];
    console.log('💾 Total content items (with database):', allContent.length);
  } catch (error) {
    console.log('Database search not available, using static content only:', error);
    // Continue with just static content
  }
  
  // Search algorithm
  const results = allContent
    .map(item => {
      let score = 0;
      
      // Exact title match (highest priority)
      if (item.title.toLowerCase() === searchTerm) {
        score += 1000;
      }
      
      // Title contains search term
      if (item.title.toLowerCase().includes(searchTerm)) {
        score += 100 * item.priority;
      }
      
      // Keywords match
      const keywordMatches = item.keywords.filter(keyword => 
        keyword.includes(searchTerm) || searchTerm.includes(keyword)
      ).length;
      score += keywordMatches * 50 * item.priority;
      
      // Description contains search term
      if (item.description.toLowerCase().includes(searchTerm)) {
        score += 30 * item.priority;
      }
      
      // Content contains search term
      if (item.content.toLowerCase().includes(searchTerm)) {
        score += 20 * item.priority;
      }
      
      // Category match
      if (item.category.toLowerCase().includes(searchTerm)) {
        score += 40 * item.priority;
      }
      
      // Partial word matches in title
      const titleWords = item.title.toLowerCase().split(' ');
      const searchWords = searchTerm.split(' ');
      searchWords.forEach(searchWord => {
        titleWords.forEach(titleWord => {
          if (titleWord.includes(searchWord) || searchWord.includes(titleWord)) {
            score += 25 * item.priority;
          }
        });
      });
      
      if (score > 0) {
        console.log(`✅ Match found: "${item.title}" (score: ${score})`);
      }
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      // Sort by score first, then by priority
      if (b.score !== a.score) return b.score - a.score;
      return b.priority - a.priority;
    })
    .slice(0, 20); // Limit to top 20 results
  
  console.log('🎯 Final results:', results.length);
  return results;
};

// Main search function
export const simpleSearch = (query: string): SearchResult[] => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  const results = staticContentIndex.filter(item => {
    // Simple matching
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const keywordMatch = item.keywords.some(keyword => keyword.includes(searchTerm) || searchTerm.includes(keyword));
    const descMatch = item.description.toLowerCase().includes(searchTerm);
    const categoryMatch = item.category.toLowerCase().includes(searchTerm);
    const contentMatch = item.content.toLowerCase().includes(searchTerm);
    
    return titleMatch || keywordMatch || descMatch || categoryMatch || contentMatch;
  }).slice(0, 15); // Show up to 15 results
  
  return results;
};

// Get search suggestions
export const getSearchSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  const suggestions = new Set<string>();
  
  // Extract keywords from static content
  staticContentIndex.forEach(item => {
    item.keywords.forEach(keyword => {
      if (keyword.includes(searchTerm) && keyword !== searchTerm) {
        suggestions.add(keyword);
      }
    });
    
    // Add title parts that match
    const titleWords = item.title.toLowerCase().split(' ');
    titleWords.forEach(word => {
      if (word.includes(searchTerm) && word !== searchTerm && word.length > 2) {
        suggestions.add(word);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 8);
};

export default {
  performSearch,
  getSearchSuggestions,
  fetchDatabaseContent,
  staticContentIndex
};
