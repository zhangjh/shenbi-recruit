
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Search, FileText, MessageSquare, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const features = [
    {
      title: "职位分析",
      description: "智能解析职位描述，提取关键要求和技能点，为您量身定制求职策略",
      icon: Search,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "简历优化",
      description: "基于职位要求分析您的简历，提供专业的优化建议和改进方案",
      icon: FileText,
      color: "from-green-500 to-green-600"
    },
    {
      title: "个性化面试题目",
      description: "根据职位和简历生成针对性面试题目，全面覆盖技术和行为面试",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "模拟面试",
      description: "真实模拟面试情境，提供即时反馈，帮您在真正面试中发挥最佳状态",
      icon: Mic,
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="pt-20 pb-32 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-800 font-medium">专业求职辅导平台</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            专业求职指导
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent block">
              助您成功就业
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            从简历优化到面试准备，神笔求职帮为您提供专业的求职辅导服务，提升面试成功率
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link to="/job-analysis">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 group">
                开始使用
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#process">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-gray-50 border-gray-300 text-gray-700">
                了解流程
              </Button>
            </a>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
