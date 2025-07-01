
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, Loader2, CheckCircle, XCircle, Lightbulb, Sparkles, Target, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import FileUpload from "@/components/FileUpload";

// Define the structure of the analysis result
interface ResumeAnalysisResult {
  overallMatchScore: string;
  matchDetails: string;
  resumeHighlights: string[];
  areasForImprovement: string[];
  tailoringSuggestions: string[];
}

const ResumeAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key for FileUpload component
  const [jobDescriptionRaw, setJobDescriptionRaw] = useState<any | null>(null); // Store raw JD content

  useEffect(() => {
    const rawJd = sessionStorage.getItem('jobDescriptionRaw');
    if (rawJd) {
      setJobDescriptionRaw(JSON.parse(rawJd));
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = async () => {
      const base64Resume = reader.result?.toString().split(',')[1];
      if (!base64Resume) {
        setError("无法读取PDF文件或文件格式错误。");
        setIsLoading(false);
        setFileInputKey(Date.now());
        return;
      }

      const requestBody: { resume: string; jd?: string; jdImg?: string } = { resume: base64Resume };
      if (jobDescriptionRaw) {
        if (jobDescriptionRaw.jd) {
          requestBody.jd = jobDescriptionRaw.jd;
        } else if (jobDescriptionRaw.jdImg) {
          requestBody.jdImg = jobDescriptionRaw.jdImg;
        }
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BIZ_DOMAIN}/shenbi/recruit/resumeAnalysis`, {
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
        console.log("ResumeAnalysis API Response Result:", result);
        if(result.success) {
          console.log("Setting analysisResult to:", result.data);
          setAnalysisResult(result.data);
          sessionStorage.setItem('resumeRaw', JSON.stringify({ resume: base64Resume })); // Save resume to session storage
        } else {
          console.error("Backend reported error:", result.errorMsg);
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
      setFileInputKey(Date.now());
    };

    reader.readAsDataURL(file); // For PDF files
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
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/job-analysis" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">返回职位分析</span>
            </Link>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              步骤2：简历分析
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6 md:mb-8">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                <span>上传您的简历</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <FileUpload
                key={fileInputKey}
                onFileUpload={handleFileUpload}
                accept=".pdf"
                title="拖拽PDF简历到此处或点击上传"
                description="简历以客户端base64格式上传无存储过程，请放心上传"
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
                  <span>正在为您分析简历，请稍候...</span>
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
                  {analysisResult.overallMatchScore !== "N/A" && (
                    <Card className="bg-blue-50/50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-900 flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5" />
                          <span>简历与职位匹配度: {analysisResult.overallMatchScore}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-blue-800 text-sm md:text-base leading-relaxed">{analysisResult.matchDetails}</p>
                      </CardContent>
                    </Card>
                  )}

                  {renderAnalysisSection(
                    "简历亮点",
                    <Sparkles className="w-5 h-5 text-yellow-600" />,
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.resumeHighlights.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}

                  {renderAnalysisSection(
                    "待改进点",
                    <Lightbulb className="w-5 h-5 text-orange-600" />,
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.areasForImprovement.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}

                  {analysisResult.tailoringSuggestions.length > 0 && (
                    renderAnalysisSection(
                      "针对性优化建议",
                      <Target className="w-5 h-5 text-green-600" />,
                      <ul className="list-disc list-inside space-y-1">
                        {analysisResult.tailoringSuggestions.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    )
                  )}

                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-4 md:pt-6">
                      <h3 className="font-semibold text-orange-900 mb-3 md:mb-4 text-sm md:text-base">下一步操作</h3>
                      <p className="text-orange-800 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                        简历分析已完成！现在您可以根据分析结果优化简历，或继续生成针对性的面试题。
                      </p>
                      <Link to="/interview-prep">
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-sm md:text-base">
                          生成面试题
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
