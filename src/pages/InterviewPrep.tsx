import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, MessageSquare, Lightbulb, RotateCcw, Play, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import SEOHead from "@/components/SEOHead";

// Define the structure of the analysis result
interface InterviewQuestionItem {
  question: string;
  answer?: string;
}

interface InterviewQuestionsResult {
  interviewQuestions: InterviewQuestionItem[];
}

const InterviewPrep = () => {
  const { user } = useUser();
  const [questions, setQuestions] = useState<InterviewQuestionItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async () => {
    setIsLoading(true);
    setError(null);
    setQuestions([]); // Clear previous questions
    setCurrentQuestionIndex(0);
    setShowAnswer(false);

    const resumeRaw = sessionStorage.getItem('resumeRaw');
    const jobDescriptionRaw = sessionStorage.getItem('jobDescriptionRaw');

    if (!resumeRaw) {
      setError("未找到简历信息，请先完成简历上传步骤。");
      setIsLoading(false);
      return;
    }

    let requestBody: { resume: string; jd?: string; jdImg?: string; userId: string } = {
      resume: JSON.parse(resumeRaw).resume, // Assuming resumeRaw stores { resume: base64String }
      userId: user?.id || '',
    };

    if (jobDescriptionRaw) {
      const jdData = JSON.parse(jobDescriptionRaw);
      if (jdData.jd) {
        requestBody.jd = jdData.jd;
      } else if (jdData.jdImg) {
        requestBody.jdImg = jdData.jdImg;
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BIZ_DOMAIN}/shenbi/recruit/generateInterviewQuestions`, {
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
      if (result.success) {
        setQuestions(result.data);
        sessionStorage.setItem('interviewQuestions', JSON.stringify(result.data));
      } else {
        setError("未能生成面试问题，请尝试重新生成或检查输入。");
      }
    } catch (e: any) {
      console.error("Failed to generate interview questions:", e);
      setError(`生成面试题失败: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateQuestions(); // Run once on component mount
  }, []); // Empty dependency array means it runs once after the initial render

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <SEOHead 
        title="面试准备 - 神笔求职帮"
        description="根据职位和简历生成个性化面试题目，全面覆盖技术和行为面试，提供参考答案和专业指导。"
        keywords="面试准备,面试题目,面试答案,模拟面试,面试技巧"
        canonical="https://job.shenbi.tech/interview-prep"
      />
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/resume-analysis" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">返回简历分析</span>
            </Link>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              步骤3：面试准备
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6 md:mb-8">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                <span>面试问题</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {isLoading && (
                <div className="flex items-center justify-center space-x-2 text-gray-600 py-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>正在为您生成面试问题，请稍候...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4 text-red-800">
                  <p className="font-semibold">生成失败</p>
                  <p className="text-sm mt-1">{error}</p>
                  <p className="text-sm mt-2">请确保您已完成简历和职位描述的上传。</p>
                  <Button
                    onClick={generateQuestions}
                    className="mt-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    重新生成
                  </Button>
                </div>
              )}

              {!isLoading && !error && questions.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 text-blue-800">
                  <p className="font-semibold">暂无面试问题</p>
                  <p className="text-sm mt-1">请稍候，我们将根据您的简历和职位描述生成个性化面试问题。</p>
                  <Button
                    onClick={generateQuestions}
                    className="mt-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    重新生成
                  </Button>
                </div>
              )}

              {questions.length > 0 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>题目 {currentQuestionIndex + 1} / {questions.length}</CardTitle>
                        <Button
                          onClick={generateQuestions}
                          variant="outline"
                          size="sm"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          重新生成
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">面试问题：</h3>
                        <p className="text-gray-800">{currentQuestion?.question}</p>
                      </div>

                      {showAnswer && currentQuestion?.answer && (
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                          <h3 className="font-semibold text-blue-900 mb-2">参考答案：</h3>
                          <p className="text-blue-800">{currentQuestion.answer}</p>
                        </div>
                      )}

                      <div className="flex flex-col space-y-4">
                        <Button
                          onClick={() => setShowAnswer(!showAnswer)}
                          variant="outline"
                          className="w-full"
                          disabled={!currentQuestion?.answer}
                        >
                          {showAnswer ? "隐藏答案" : "查看参考答案"}
                        </Button>

                        <div className="flex space-x-4">
                          <Button
                            onClick={prevQuestion}
                            disabled={currentQuestionIndex === 0}
                            variant="outline"
                            className="flex-1"
                          >
                            上一题
                          </Button>
                          <Button
                            onClick={nextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                          >
                            下一题
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 模拟面试入口 */}
                  <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <Mic className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-orange-900 mb-2">准备好真实面试了吗？</h3>
                          <p className="text-orange-800 text-sm mb-4">
                            开始模拟面试，通过语音交互获得更真实的面试体验和专业评价
                          </p>
                          <Link to="/mock-interview">
                            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-orange-700">
                              开始模拟面试
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
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

export default InterviewPrep;
