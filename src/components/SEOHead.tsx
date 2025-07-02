import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

const SEOHead = ({ 
  title = "神笔求职帮 - AI驱动的求职面试辅助平台",
  description = "神笔求职帮是一款AI驱动的求职辅助平台，提供JD解析、简历分析、面试题目生成和模拟面试功能，帮助求职者提升面试成功率。",
  keywords = "求职,面试,简历分析,JD解析,模拟面试,AI求职助手,求职辅导,面试准备",
  canonical
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEOHead;