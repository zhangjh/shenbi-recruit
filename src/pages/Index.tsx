
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, FileText, MessageSquare, Target, CheckCircle, Star, ArrowRight, Upload, Mic } from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import ProcessStep from "@/components/ProcessStep";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Camera,
      title: "职位解析",
      description: "拍照上传职位描述，快速提取核心要求",
      color: "from-red-500 to-orange-600"
    },
    {
      icon: FileText,
      title: "简历分析",
      description: "上传简历获得专业分析与优化建议",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: MessageSquare,
      title: "题库生成",
      description: "生成针对性的专业面试题目",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Mic,
      title: "模拟面试",
      description: "语音交互模拟真实面试环境",
      color: "from-orange-500 to-red-500"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "上传职位信息",
      description: "拍照或上传JD，获取职位核心要求",
      icon: Camera
    },
    {
      step: 2,
      title: "上传个人简历",
      description: "支持Word/PDF格式，智能解析匹配度",
      icon: Upload
    },
    {
      step: 3,
      title: "生成面试题库",
      description: "基于JD和简历生成针对性面试题",
      icon: Target
    },
    {
      step: 4,
      title: "模拟面试练习",
      description: "语音交互，获得专业面试评价",
      icon: Mic
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                神笔求职帮
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-red-600 transition-colors">功能介绍</a>
              <a href="#process" className="text-gray-600 hover:text-red-600 transition-colors">使用流程</a>
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                立即开始
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              专业求职辅导服务
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              从简历优化到面试准备，全方位提升您的求职竞争力
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                feature={feature}
                isActive={activeFeature === index}
                onClick={() => setActiveFeature(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              四步完成面试准备
            </h2>
            <p className="text-xl text-gray-600">
              简单流程，专业指导
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            开始您的求职成功之旅
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            专业指导，助您在面试中脱颖而出
          </p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3">
            立即免费体验
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">神笔求职帮</h3>
              </div>
              <p className="text-gray-400">
                专业求职辅导平台
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">产品功能</h4>
              <ul className="space-y-2 text-gray-400">
                <li>职位解析</li>
                <li>简历分析</li>
                <li>题库生成</li>
                <li>模拟面试</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">帮助中心</h4>
              <ul className="space-y-2 text-gray-400">
                <li>使用指南</li>
                <li>常见问题</li>
                <li>联系客服</li>
                <li>意见反馈</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">关于我们</h4>
              <ul className="space-y-2 text-gray-400">
                <li>产品介绍</li>
                <li>隐私政策</li>
                <li>服务条款</li>
                <li>版本更新</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 神笔求职帮. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
