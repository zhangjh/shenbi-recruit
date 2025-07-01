
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, ArrowLeft, Square, Play } from "lucide-react";
import { Link } from "react-router-dom";

const MockInterview = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const startInterview = () => {
    setIsInterviewActive(true);
    setInterviewComplete(false);
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setIsRecording(false);
    setInterviewComplete(true);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>返回首页</span>
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              模拟面试
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {!isInterviewActive && !interviewComplete && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-6 h-6 text-red-600" />
                  <span>开始模拟面试</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <p className="text-gray-600 mb-6">
                  准备好开始模拟面试了吗？我们将基于您的职位和简历进行一对一的语音面试模拟
                </p>
                <Button 
                  onClick={startInterview}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  开始面试
                </Button>
              </CardContent>
            </Card>
          )}

          {isInterviewActive && (
            <Card>
              <CardHeader>
                <CardTitle>面试进行中...</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <p className="text-blue-800 mb-4">
                    <strong>面试官：</strong>请先做一个简单的自我介绍，包括您的工作经验和技能特长。
                  </p>
                </div>

                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}>
                    <Mic className={`w-8 h-8 ${isRecording ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {isRecording ? '正在录音中...' : '点击开始录音回答'}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={toggleRecording}
                    className={`flex-1 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'}`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        停止录音
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        开始录音
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={endInterview}
                    variant="outline"
                    className="flex-1"
                  >
                    结束面试
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {interviewComplete && (
            <Card>
              <CardHeader>
                <CardTitle>面试评价报告</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">B+</div>
                  <p className="text-gray-600">面试表现评级</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg">表现良好</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-green-700">
                        <li>• 回答逻辑清晰</li>
                        <li>• 技术理解到位</li>
                        <li>• 表达自然流畅</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-800 text-lg">改进建议</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-orange-700">
                        <li>• 可以增加具体案例</li>
                        <li>• 回答可以更简洁</li>
                        <li>• 多展示实际成果</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  onClick={() => {
                    setIsInterviewActive(false);
                    setInterviewComplete(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  重新开始面试
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
