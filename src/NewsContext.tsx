import React, { createContext, useContext, useState } from 'react';

export interface NewsPost {
  date: string;
  category: string;
  title: string;
  summary: string;
  author: string;
}

const initialNews: NewsPost[] = [];

interface NewsContextType {
  news: NewsPost[];
  addNews: (post: NewsPost) => void;
}

const NewsContext = createContext<NewsContextType>({
  news: initialNews,
  addNews: () => {}
});

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [news, setNews] = useState<NewsPost[]>(initialNews);
  const addNews = (post: NewsPost) => setNews(prev => [post, ...prev]);
  return (
    <NewsContext.Provider value={{ news, addNews }}>
      {children}
    </NewsContext.Provider>
  );
};
