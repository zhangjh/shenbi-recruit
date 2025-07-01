
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, FileText, MessageSquare, Target, Star, ArrowRight, Upload, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import ProcessStep from "@/components/ProcessStep";

const Index = () => {
  const processSteps = [
    {
      step: 1,
      title: "选择开始方式",
      description: "上传职位描述或直接上传简历开始",
      icon: Camera
    },
    {
      step: 2,
      title: "智能分析匹配",
      description: "AI分析职位要求和简历匹配度",
      icon: Target
    },
    {
      step: 3,
      title: "生成面试题库",
      description: "基于分析结果生成针对性面试题",
      icon: MessageSquare
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
              <a href="#start" className="text-gray-600 hover:text-red-600 transition-colors">开始使用</a>
              <a href="#process" className="text-gray-600 hover:text-red-600 transition-colors">使用流程</a>
              <Link to="/job-analysis">
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                  立即开始
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Start Options Section */}
      <section id="start" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              选择您的开始方式
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              根据您的需求选择合适的入口开始使用
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/job-analysis" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">有目标职位</h3>
                <p className="text-gray-600 text-center mb-4">
                  拍照上传职位描述，获得针对性的面试准备
                </p>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-medium">推荐流程：</p>
                  <p className="text-sm text-red-700">职位分析 → 简历匹配 → 面试题库 → 模拟面试</p>
                </div>
              </div>
            </Link>

            <Link to="/resume-analysis" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">优化简历</h3>
                <p className="text-gray-600 text-center mb-4">
                  直接上传简历，获得专业的优化建议
                </p>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-800 font-medium">适用场景：</p>
                  <p className="text-sm text-orange-700">简历优化、通用面试准备、技能提升建议</p>
                </div>
              </div>
            </Link>
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
          <Link to="/job-analysis">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3">
              立即免费体验
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">神笔求职帮</h3>
              </div>
              <p className="text-gray-400">
                专业求职辅导平台，助您成功就业
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">开始使用</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/job-analysis" className="hover:text-white transition-colors">有目标职位</Link></li>
                <li><Link to="/resume-analysis" className="hover:text-white transition-colors">优化简历</Link></li>
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
