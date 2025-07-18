
import { Button } from "@/components/ui/button";
import { Camera, FileText, MessageSquare, Target, ArrowRight, Mic, Brain, Mail } from "lucide-react";
import { SiGithub, SiWechat, SiX } from "react-icons/si";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import ProcessStep from "@/components/ProcessStep";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  const processSteps = [
    {
      step: 1,
      title: "选择开始方式",
      description: "上传或输入职位描述，或直接上传简历开始",
      icon: Camera
    },
    {
      step: 2,
      title: "智能分析匹配",
      description: "AI分析职位要求和简历匹配度",
      icon: Brain
    },
    {
      step: 3,
      title: "生成面试题目",
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
      <StructuredData />
      <Header />

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
                  上传或输入职位描述，获得针对性的面试准备
                </p>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-medium">推荐流程：</p>
                  <p className="text-sm text-red-700">职位分析 → 简历匹配 → 面试题目 → 模拟面试</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
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
              <h4 className="font-semibold mb-4">神笔系列</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="https://shenbi.tech" className="hover:text-white transition-colors">神笔作文</Link></li>
                <li><Link to="https://report.shenbi.tech" className="hover:text-white transition-colors">神笔周报</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">联系我们</h4>
              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <a href="mailto:help@shenbi.tech" className="text-gray-400 hover:text-white transition-colors" title="邮箱：help@shenbi.tech">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/zhangjh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
                  <SiGithub className="w-5 h-5" />
                </a>
                <a href="https://x.com/Dante_Chaser" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="X (Twitter)">
                  <SiX className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 神笔求职帮. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
