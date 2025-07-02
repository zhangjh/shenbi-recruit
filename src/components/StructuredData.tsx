import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "神笔求职帮",
      "description": "AI驱动的求职面试辅助平台，提供职位分析、简历优化、面试题目生成和模拟面试功能",
      "url": "https://job.shenbi.tech",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CNY"
      },
      "author": {
        "@type": "Organization",
        "name": "太初科技"
      },
      "provider": {
        "@type": "Organization",
        "name": "太初科技",
        "url": "https://shenbi.tech"
      },
      "featureList": [
        "职位描述智能分析",
        "简历匹配度评估", 
        "个性化面试题目生成",
        "AI模拟面试体验"
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default StructuredData;