
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ProcessStepData {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ProcessStepProps {
  step: ProcessStepData;
}

const ProcessStep = ({ step }: ProcessStepProps) => {
  const { step: stepNumber, title, description, icon: Icon } = step;

  return (
    <div className="relative">
      {/* Step connector line (hidden on mobile, visible on desktop) */}
      {stepNumber < 4 && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform translate-x-8"></div>
      )}
      
      <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-8 text-center relative">
          {/* Step number badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {stepNumber}
          </div>
          
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessStep;
