
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowLeft, Play, RotateCcw, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const InterviewPrep = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateQuestions = () => {
    // 模拟生成面试题
    const mockQuestions = [
      {
        question: "请介绍一下您在前端开发方面的经验？",
        answer: "您可以从技术栈、项目经历、解决的技术难题等方面来回答这个问题。"
      },
      {
        question: "如何优化网页性能？",
        answer: "可以从代码优化、资源压缩、缓存策略、图片优化等方面来讨论。"
      },
      {
        question: "遇到技术难题时，您是如何解决的？",
        answer: "可以分享具体的问题解决经历，体现您的技术思维和学习能力。"
      }
    ];
    setQuestions(mockQuestions);
    setCurrentQuestion(0);
    setShowAnswer(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/resume-analysis" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>返回简历分析</span>
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              步骤3：面试准备
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {questions.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                  <span>生成面试题库</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <p className="text-gray-600 mb-6">
                  基于您上传的职位信息和简历，我们将为您生成针对性的面试题目
                </p>
                <Button 
                  onClick={generateQuestions}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  生成面试题
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>题目 {currentQuestion + 1} / {questions.length}</CardTitle>
                    <Button
                      onClick={() => {
                        setQuestions([]);
                        setCurrentQuestion(0);
                        setShowAnswer(false);
                      }}
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
                    <p className="text-gray-800">{questions[currentQuestion]?.question}</p>
                  </div>

                  {showAnswer && (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-2">参考答案：</h3>
                      <p className="text-blue-800">{questions[currentQuestion]?.answer}</p>
                    </div>
                  )}

                  <div className="flex flex-col space-y-4">
                    <Button
                      onClick={() => setShowAnswer(!showAnswer)}
                      variant="outline"
                      className="w-full"
                    >
                      {showAnswer ? "隐藏答案" : "查看参考答案"}
                    </Button>

                    <div className="flex space-x-4">
                      <Button
                        onClick={prevQuestion}
                        disabled={currentQuestion === 0}
                        variant="outline"
                        className="flex-1"
                      >
                        上一题
                      </Button>
                      <Button
                        onClick={nextQuestion}
                        disabled={currentQuestion === questions.length - 1}
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
                        <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
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
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
