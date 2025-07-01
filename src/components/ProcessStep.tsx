
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
      {/* Step connector line */}
      {stepNumber < 4 && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-red-300 transform translate-x-8"></div>
      )}
      
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-8 text-center relative">
          {/* Step number badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {stepNumber}
          </div>
          
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl flex items-center justify-center mx-auto mb-6 mt-4">
            <Icon className="w-8 h-8 text-red-600" />
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
