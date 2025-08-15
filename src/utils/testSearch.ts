// Test search function
import { staticContentIndex, performSearch } from './searchEngine';

// Test function for debugging
export const testSearch = async (query: string) => {
  console.log('🧪 Testing search for:', query);
  console.log('📚 Static content available:', staticContentIndex.length);
  
  // Test with just static content first
  const searchTerm = query.toLowerCase().trim();
  
  const matches = staticContentIndex.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const keywordMatch = item.keywords.some(keyword => keyword.includes(searchTerm));
    const descMatch = item.description.toLowerCase().includes(searchTerm);
    const categoryMatch = item.category.toLowerCase().includes(searchTerm);
    
    if (titleMatch || keywordMatch || descMatch || categoryMatch) {
      console.log('✅ Found match:', item.title, {
        titleMatch,
        keywordMatch: keywordMatch ? item.keywords.filter(k => k.includes(searchTerm)) : false,
        descMatch,
        categoryMatch
      });
      return true;
    }
    return false;
  });
  
  console.log('🎯 Simple matches found:', matches.length);
  return matches;
};

// Export for testing
export { staticContentIndex };
