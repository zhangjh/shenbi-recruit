
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept: string;
  title: string;
  description: string;
}

const FileUpload = ({ onFileUpload, accept, title, description }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors"
      onClick={handleButtonClick}
    >
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 mb-2">{title}</p>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <input
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        ref={fileInputRef}
      />
      <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
        选择文件
      </Button>
    </div>
  );
};

export default FileUpload;
