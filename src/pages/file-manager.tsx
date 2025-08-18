import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdvancedFileUploader } from "@/components/AdvancedFileUploader";
import { FileText, ArrowLeft } from "lucide-react";

export default function FileManager() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-16 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
                {language === 'ar' ? 'مدير الملفات للاستضافة' : 'File Manager for Hosting'}
              </h1>
            </div>
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/teacher/dashboard"}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {language === 'ar' ? 'لوحة التحكم' : 'Back to Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Upload Interface */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <FileText className="h-6 w-6 mr-2" />
              {language === 'ar' ? 'رفع الملفات للاستضافة' : 'File Upload for Hosting'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'ar' ? 
                'اختر بين نظام Replit المدمج أو الخدمات الخارجية مثل S3، R2، B2 لاستضافة ملفاتك' : 
                'Choose between Replit\'s built-in system or external services like S3, R2, B2 for hosting your files'
              }
            </p>
            <AdvancedFileUploader />
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700 mt-8">
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'كيفية استخدام الملفات المرفوعة' : 'How to Use Uploaded Files'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                {language === 'ar' ? 
                  'بعد رفع الملفات، يمكنك استخدامها في موقعك بالطرق التالية:' : 
                  'After uploading files, you can use them in your website in the following ways:'
                }
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <strong>{language === 'ar' ? 'للصور:' : 'For images:'}</strong>
                  <code className="block mt-1 text-sm bg-white dark:bg-gray-800 p-2 rounded">
                    &lt;img src="/public-objects/your-image.jpg" alt="Description" /&gt;
                  </code>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <strong>{language === 'ar' ? 'للروابط:' : 'For links:'}</strong>
                  <code className="block mt-1 text-sm bg-white dark:bg-gray-800 p-2 rounded">
                    &lt;a href="/public-objects/your-document.pdf"&gt;Download PDF&lt;/a&gt;
                  </code>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <strong>{language === 'ar' ? 'في CSS:' : 'In CSS:'}</strong>
                  <code className="block mt-1 text-sm bg-white dark:bg-gray-800 p-2 rounded">
                    background-image: url('/public-objects/your-background.jpg');
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}