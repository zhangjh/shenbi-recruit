
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const JobAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 模拟分析过程
      setTimeout(() => {
        setAnalysisResult("职位分析完成！检测到这是一个前端开发工程师职位，主要要求包括React、TypeScript、UI/UX设计等技能。");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">返回首页</span>
            </Link>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              步骤1：职位分析
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6 md:mb-8">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                <span>上传职位描述</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center hover:border-red-400 transition-colors">
                <Upload className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">拖拽图片到此处或点击上传</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="job-upload"
                />
                <label htmlFor="job-upload">
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-sm md:text-base">
                    选择文件
                  </Button>
                </label>
              </div>

              {selectedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-medium text-sm md:text-base break-all">
                      文件已上传: {selectedFile.name}
                    </span>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4 md:pt-6">
                      <h3 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">分析结果</h3>
                      <p className="text-blue-800 text-sm md:text-base leading-relaxed">{analysisResult}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-4 md:pt-6">
                      <h3 className="font-semibold text-orange-900 mb-3 md:mb-4 text-sm md:text-base">下一步操作</h3>
                      <p className="text-orange-800 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                        职位分析已完成！现在上传您的简历，我们将分析简历与职位的匹配度，并为您生成针对性的面试题。
                      </p>
                      <Link to="/resume-analysis?from=job">
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-sm md:text-base">
                          继续上传简历
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobAnalysis;
