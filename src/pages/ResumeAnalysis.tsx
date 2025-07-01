
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import FileUpload from "@/components/FileUpload";

const ResumeAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const fromJob = searchParams.get('from') === 'job';

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    // 模拟分析过程
    setTimeout(() => {
      setAnalysisResult({
        score: 85,
        matchScore: fromJob ? 78 : null,
        strengths: ["技能匹配度高", "工作经验丰富", "项目经历详实"],
        improvements: ["缺少量化成果", "技能描述不够具体", "格式需要优化"]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={fromJob ? "/job-analysis" : "/"} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>{fromJob ? "返回职位分析" : "返回首页"}</span>
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              {fromJob ? "步骤2：简历分析" : "简历分析"}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-red-600" />
                <span>上传简历文件</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                onFileUpload={handleFileUpload}
                accept=".pdf,.doc,.docx"
                title="支持 PDF、Word 格式"
                description="文件大小不超过10MB"
              />

              {selectedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">文件已上传: {selectedFile.name}</span>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-blue-600 mb-2">{analysisResult.score}分</div>
                          <p className="text-blue-800">简历综合评分</p>
                        </div>
                      </CardContent>
                    </Card>

                    {analysisResult.matchScore && (
                      <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="pt-6">
                          <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-purple-600 mb-2">{analysisResult.matchScore}分</div>
                            <p className="text-purple-800">职位匹配度</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-lg">优势</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysisResult.strengths.map((strength: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2 text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-orange-50 border-orange-200">
                      <CardHeader>
                        <CardTitle className="text-orange-800 text-lg">改进建议</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysisResult.improvements.map((improvement: string, index: number) => (
                            <li key={index} className="text-orange-700">
                              • {improvement}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-red-900 mb-4">准备面试</h3>
                      <p className="text-red-800 mb-4">
                        分析完成！现在可以生成针对性的面试题目，帮助您更好地准备面试。
                      </p>
                      <Link to="/interview-prep">
                        <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                          生成面试题目
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

export default ResumeAnalysis;
