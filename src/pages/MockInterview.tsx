import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, ArrowLeft, Square, Play, Loader2, ThumbsUp, Lightbulb, Award, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Define the structure of the analysis result
interface InterviewQuestionItem {
  question: string;
  answer?: string;
}

interface FeedbackItem {
  question: string;
  transcript: string;
  evaluation: string;
}

interface FinalReport {
  overallScore: string;
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
  detailedFeedback: FeedbackItem[];
}

const MockInterview = () => {
  const [questions, setQuestions] = useState<InterviewQuestionItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For final report generation
  const [isProcessing, setIsProcessing] = useState(false); // For recording processing and submitting answer
  const [error, setError] = useState<string | null>(null);
  const [finalReport, setFinalReport] = useState<FinalReport | null>(null);
  const [cachedFeedback, setCachedFeedback] = useState<FeedbackItem[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const storedQuestions = sessionStorage.getItem('interviewQuestions');
    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      const fullQuestionList = [
        { question: "请先做一个简单的自我介绍，包括您的工作经验和技能特长。", answer: "" },
        ...parsedQuestions
      ];
      setQuestions(fullQuestionList);
    } else {
      setError("未找到面试问题，请先完成前面的步骤。");
    }
  }, []);

  const startInterview = () => {
    if (questions.length === 0) {
      setError("没有可用的面试问题。");
      return;
    }
    setError(null);
    setFinalReport(null);
    setCurrentQuestionIndex(0);
    setCachedFeedback([]);
    const newInterviewId = crypto.randomUUID();
    setInterviewId(newInterviewId);
    setIsInterviewActive(true);
  };

  const handleStartRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result?.toString().split(',')[1];
          if (base64Audio) {
            await submitAnswer(base64Audio);
          }
          setIsProcessing(false);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError("无法访问麦克风，请检查权限设置。");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const submitAnswer = async (audioB64: string) => {
    if (!interviewId) return;
    setError(null);
    try {
      const nextQuestion = currentQuestionIndex + 1 < questions.length ? questions[currentQuestionIndex + 1].question : null;

      const response = await fetch(`${import.meta.env.VITE_BIZ_DOMAIN}/shenbi/recruit/interview/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewId,
          question: questions[currentQuestionIndex].question,
          answerAudio: audioB64,
          nextQuestion: nextQuestion,
        }),
      });

      if (!response.ok) throw new Error("提交回答失败");
      const result = await response.json();

      if (result.success) {
        setCachedFeedback(prev => [...prev, result.data.feedback]);

        const { nextAction } = result.data;
        if (nextAction.type === 'ASK_FOLLOW_UP') {
          const newQuestion = { question: nextAction.question.text, answer: '' };
          setQuestions(prev => {
            const newQuestions = [...prev];
            newQuestions.splice(currentQuestionIndex + 1, 0, newQuestion);
            return newQuestions;
          });
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (nextAction.type === 'PROCEED_TO_NEXT') {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            endInterview();
          }
        } else { // INTERVIEW_CONCLUDED
          endInterview();
        }
      } else {
        throw new Error(result.errorMsg || "分析回答失败");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  const endInterview = async () => {
    setIsInterviewActive(false);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BIZ_DOMAIN}/shenbi/recruit/interview/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          interviewId, 
          interviewHistory: cachedFeedback 
        }),
      });
      if (!response.ok) throw new Error("获取面试报告失败");
      const result = await response.json();
      if (result.success) {
        setFinalReport(result.data);
      } else {
        // Use cached feedback if ending fails but we have feedback
        if (cachedFeedback.length > 0) {
            setFinalReport({
                overallScore: 'N/A',
                summary: '无法生成最终报告，但您可以查看已有的回答反馈。',
                strengths: [],
                areasForImprovement: [],
                detailedFeedback: cachedFeedback
            });
        } else {
            throw new Error(result.errorMsg || "生成报告失败");
        }
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const restartInterview = () => {
    setFinalReport(null);
    setIsInterviewActive(false);
    setError(null);
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/interview-prep" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>返回面试准备</span>
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              模拟面试
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {error && (
            <Card className="mb-4 bg-red-50 border-red-200">
              <CardContent className="p-4 text-red-800">
                <p className="font-semibold">发生错误</p>
                <p className="text-sm">{error}</p>
              </CardContent>
            </Card>
          )}

          {!isInterviewActive && !finalReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-6 h-6 text-red-600" />
                  <span>准备开始模拟面试</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <p className="text-gray-600 mb-6">
                  我们将基于您的职位和简历进行一对一的语音面试模拟。
                  共有 {questions.length} 个问题。
                </p>
                <Button onClick={startInterview} disabled={questions.length === 0} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  开始面试
                </Button>
              </CardContent>
            </Card>
          )}

          {isInterviewActive && (
            <Card>
              <CardHeader>
                <CardTitle>面试进行中... (问题 {currentQuestionIndex + 1}/{questions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-blue-800 mb-2 font-semibold">面试官：</p>
                  <p className="text-blue-900 text-lg">{currentQuestion?.question}</p>
                </div>

                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}>
                    <Mic className={`w-8 h-8 transition-colors ${isRecording ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {isRecording ? '正在录音中...' : (isProcessing ? '正在处理您的回答...' : '点击开始录音回答')}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={isRecording ? handleStopRecording : handleStartRecording} disabled={isProcessing} className={`flex-1 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'}`}>
                    {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : (isRecording ? <Square className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />)}
                    {isProcessing ? '处理中...' : (isRecording ? '停止回答' : '开始回答')}
                  </Button>
                  <Button onClick={endInterview} variant="outline" className="flex-1" disabled={isProcessing || isLoading}>
                    结束面试
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading && !finalReport && (
             <Card>
              <CardContent className="text-center py-12">
                <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
                <p className="text-gray-600">正在生成您的专属面试报告，请稍候...</p>
              </CardContent>
            </Card>
          )}

          {finalReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2"><Award className="w-6 h-6 text-red-600" /><span>面试评价报告</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-1">综合评级</p>
                  <div className="text-5xl font-bold text-red-600 mb-2">{finalReport.overallScore}</div>
                  <p className="text-gray-700 max-w-md mx-auto">{finalReport.summary}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg flex items-center space-x-2"><ThumbsUp className="w-5 h-5" /><span>表现良好</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-green-700 list-disc list-inside">
                        {finalReport.strengths.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-800 text-lg flex items-center space-x-2"><Lightbulb className="w-5 h-5" /><span>改进建议</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-orange-700 list-disc list-inside">
                        {finalReport.areasForImprovement.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2"><FileText className="w-5 h-5 text-gray-700" /><span>详细问答回顾</span></h3>
                  <div className="space-y-4">
                    {finalReport.detailedFeedback.map((item, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <p className="font-semibold text-gray-800 mb-2">Q: {item.question}</p>
                          <p className="text-sm text-gray-600 mb-2 italic">你的回答: "{item.transcript}"</p>
                          <Badge>AI点评</Badge>
                          <p className="text-sm text-gray-700 mt-1">{item.evaluation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button onClick={restartInterview} className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                  再试一次
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