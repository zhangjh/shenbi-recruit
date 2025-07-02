
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, FileText, ArrowLeft, ArrowRight, Loader2, BrainCircuit, Briefcase, Building, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/clerk-react";

import FileUpload from "@/components/FileUpload";
import SEOHead from "@/components/SEOHead";

// Define the structure of the analysis result
interface CompetencyAnalysis {
  hardSkills: string[];
  softSkills: string[];
  preferredQualifications: string[];
  keywords: string[];
}

interface ResponsibilityAnalysis {
  coreResponsibilities: string[];
  potentialChallenges: string;
}

interface CompanyInsights {
  cultureClues: string[];
  benefitsHighlights: string[];
}

interface ApplicationStrategy {
  resumeFocus: string;
  interviewQuestions: string[];
}

interface AnalysisResult {
  jobTitle: string;
  jobSummary: string;
  competencyAnalysis: CompetencyAnalysis;
  responsibilityAnalysis: ResponsibilityAnalysis;
  companyInsights: CompanyInsights;
  applicationStrategy: ApplicationStrategy;
}


const JobAnalysis = () => {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Add a key state

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(true);

    const isImage = file.type.startsWith('image/');
    const reader = new FileReader();

    reader.onload = async () => {
      let requestBody = {};
      if (isImage) {
        const base64Image = reader.result?.toString().split(',')[1];
        if (!base64Image) {
          setError("无法读取图片文件或文件格式错误。");
          setIsLoading(false);
          setFileInputKey(Date.now()); // Reset on error
          return;
        }
        requestBody = { jdImg: base64Image, userId: user?.id };
      } else {
        const textContent = reader.result as string;
        if (!textContent) {
          setError("无法读取文本文件或文件为空。");
          setIsLoading(false);
          setFileInputKey(Date.now()); // Reset on error
          return;
        }
        requestBody = { jd: textContent, userId: user?.id };
      }

      sessionStorage.setItem('jobDescriptionRaw', JSON.stringify(requestBody));
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BIZ_DOMAIN}/shenbi/recruit/jdAnalysis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const result = await response.json();
        if(result.success) {
          setAnalysisResult(result.data);
        } else {
          setError(result.errorMsg);
        }
      } catch (e: any) {
        console.error("Analysis failed:", e);
        setError(`分析失败: ${e.message}`);
      } finally {
        setIsLoading(false);
        setFileInputKey(Date.now()); // Always reset the key after an attempt
      }
    };

    reader.onerror = () => {
      setError("读取文件时发生错误。");
      setIsLoading(false);
      setFileInputKey(Date.now()); // Reset on error
    };

    if (isImage) {
      reader.readAsDataURL(file); // For images
    } else {
      reader.readAsText(file); // For text files
    }
  };

  const renderAnalysisSection = (title: string, icon: React.ReactNode, content: React.ReactNode) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm md:text-base text-gray-700">
        {content}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <SEOHead 
        title="职位分析 - 神笔求职帮"
        description="上传职位描述，AI智能解析职位要求、技能点和关键词，为您量身定制求职策略和面试准备方案。"
        keywords="职位分析,JD解析,职位要求分析,求职策略,AI职位分析"
        canonical="https://job.shenbi.tech/job-analysis"
      />
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
              <FileUpload
                key={fileInputKey} // Add the key here
                onFileUpload={handleFileUpload}
                accept="image/*,.md,.txt"
                title="拖拽图片/文本文件到此处或点击上传"
                description="支持PNG, JPG, TXT, MD等格式"
              />

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

              {isLoading && (
                <div className="flex items-center justify-center space-x-2 text-gray-600 py-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>正在为您深度分析，请稍候...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4 text-red-800">
                  <p className="font-semibold">分析出错</p>
                  <p className="text-sm mt-1">{error}</p>
                  <p className="text-sm mt-2">请检查您的文件或网络连接，然后重新上传。</p>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-4">
                  <Card className="bg-blue-50/50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-900">{analysisResult.jobTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-800 text-sm md:text-base leading-relaxed">{analysisResult.jobSummary}</p>
                    </CardContent>
                  </Card>

                  {renderAnalysisSection(
                    "能力要求分析",
                    <BrainCircuit className="w-5 h-5 text-blue-600" />,
                    <>
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-800">硬技能:</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.competencyAnalysis.hardSkills.map((skill) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 mt-3 text-gray-800">软技能:</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.competencyAnalysis.softSkills.map((skill) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                      </div>
                      {analysisResult.competencyAnalysis.preferredQualifications.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 mt-3 text-gray-800">加分项:</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.competencyAnalysis.preferredQualifications.map((skill) => <Badge key={skill} variant="outline" className="border-amber-500 text-amber-700">{skill}</Badge>)}
                          </div>
                        </div>
                      )}
                       <div>
                        <h4 className="font-semibold mb-2 mt-3 text-gray-800">岗位关键词:</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.competencyAnalysis.keywords.map((keyword) => <Badge key={keyword}>{keyword}</Badge>)}
                        </div>
                      </div>
                    </>
                  )}

                  {renderAnalysisSection(
                    "核心职责与挑战",
                    <Briefcase className="w-5 h-5 text-green-600" />,
                    <>
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-800">核心职责:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {analysisResult.responsibilityAnalysis.coreResponsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                        </ul>
                      </div>
                      <div className="mt-3">
                        <h4 className="font-semibold mb-2 text-gray-800">潜在挑战:</h4>
                        <p>{analysisResult.responsibilityAnalysis.potentialChallenges}</p>
                      </div>
                    </>
                  )}

                  {renderAnalysisSection(
                    "公司洞察",
                    <Building className="w-5 h-5 text-purple-600" />,
                    <>
                      {analysisResult.companyInsights.cultureClues.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-800">文化线索:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {analysisResult.companyInsights.cultureClues.map((clue, i) => <li key={i}>{clue}</li>)}
                          </ul>
                        </div>
                      )}
                      {analysisResult.companyInsights.benefitsHighlights.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-semibold mb-2 text-gray-800">福利亮点:</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.companyInsights.benefitsHighlights.map((benefit) => <Badge key={benefit} className="bg-yellow-200 text-yellow-800 hover:bg-yellow-300">{benefit}</Badge>)}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {renderAnalysisSection(
                    "求职策略建议",
                    <Target className="w-5 h-5 text-red-600" />,
                    <>
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-800">简历优化建议:</h4>
                        <p className="p-3 bg-gray-100 rounded-md border border-gray-200">{analysisResult.applicationStrategy.resumeFocus}</p>
                      </div>
                      <div className="mt-3">
                        <h4 className="font-semibold mb-2 text-gray-800">模拟面试题:</h4>
                        <ul className="list-decimal list-inside space-y-2">
                          {analysisResult.applicationStrategy.interviewQuestions.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                      </div>
                    </>
                  )}

                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-4 md:pt-6">
                      <h3 className="font-semibold text-orange-900 mb-3 md:mb-4 text-sm md:text-base">下一步操作</h3>
                      <p className="text-orange-800 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                        职位分析已完成！现在上传您的简历，我们将分析简历与职位的匹配度，并为您生成针对性的面试题。
                      </p>
                      <Link to="/resume-analysis">
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
