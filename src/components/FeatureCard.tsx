
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface FeatureCardProps {
  feature: Feature;
  isActive: boolean;
  onClick: () => void;
}

const FeatureCard = ({ feature, isActive, onClick }: FeatureCardProps) => {
  const { icon: Icon, title, description, color } = feature;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 ${
        isActive ? 'shadow-2xl -translate-y-2 ring-2 ring-blue-500/20' : 'shadow-lg'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-8 text-center">
        <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
