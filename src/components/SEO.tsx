import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "CDI SAKATA INX CORP - Leading Printing Ink Solutions Since 1964",
  description = "CDI SAKATA INX Corporation - Leading manufacturer of high-quality printing inks and coatings since 1964. Serving 50+ countries with innovative, sustainable ink solutions for all printing needs.",
  keywords = "printing inks, ink manufacturer, CDI Sakata, printing solutions, offset inks, digital inks, sustainable inks, Philippines printing, ink coating, industrial printing",
  canonical,
  ogImage = "https://cdi-sakata.com/logo.png",
  ogType = "website",
  noIndex = false,
  structuredData
}) => {
  const siteUrl = "https://cdi-sakata.com";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="CDI SAKATA INX CORP" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
