import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileUploader } from "@/components/FileUploader";
import { Upload, Server, Cloud, Copy, Eye, Download, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { UploadResult } from "@uppy/core";

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
  method: 'replit' | 's3';
}

interface UploadConfig {
  configured: boolean;
  endpoint: string;
  bucket: string;
  credentials: string;
}

export function AdvancedFileUploader() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [s3Config, setS3Config] = useState<UploadConfig | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadFolder, setUploadFolder] = useState("uploads");
  const [isUploading, setIsUploading] = useState(false);

  // Check S3 configuration on component mount
  const checkS3Config = async () => {
    try {
      const config = await apiRequest("/api/upload-status", "GET") as unknown as UploadConfig;
      setS3Config(config);
    } catch (error) {
      console.error("Failed to check S3 config:", error);
    }
  };

  // Handle Replit Object Storage uploads
  const handleReplitUpload = async () => {
    try {
      const fileName = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const response = await apiRequest(`/api/uploads/public`, "POST", { fileName }) as any;

      return {
        method: "PUT" as const,
        url: response.uploadURL,
      };
    } catch (error) {
      console.error("Error getting Replit upload URL:", error);
      throw error;
    }
  };

  const handleReplitUploadComplete = (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    if (result.successful && result.successful.length > 0) {
      const newFiles: UploadedFile[] = result.successful.map((file: any) => ({
        name: file.name || 'unknown',
        url: `/public-objects/${file.name}`,
        size: file.size || 0,
        type: file.type || 'unknown',
        uploadedAt: new Date(),
        method: 'replit' as const,
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: language === 'ar' ? 'تم الرفع بنجاح' : 'Upload Successful',
        description: language === 'ar' ? 
          'تم رفع الملفات إلى Replit Object Storage' : 
          'Files uploaded to Replit Object Storage',
      });
    }
  };

  // Handle S3-compatible uploads
  const handleS3Upload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: language === 'ar' ? 'لا توجد ملفات' : 'No Files Selected',
        description: language === 'ar' ? 'اختر ملفات للرفع' : 'Please select files to upload',
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      
      if (selectedFiles.length === 1) {
        // Single file upload
        formData.append('file', selectedFiles[0]);
        formData.append('folder', uploadFolder);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.ok) {
          const newFile: UploadedFile = {
            name: result.originalName,
            url: result.url,
            size: result.size,
            type: result.type,
            uploadedAt: new Date(),
            method: 's3',
          };
          
          setUploadedFiles(prev => [...prev, newFile]);
          
          toast({
            title: language === 'ar' ? 'تم الرفع بنجاح' : 'Upload Successful',
            description: language === 'ar' ? 
              'تم رفع الملف إلى التخزين الخارجي' : 
              'File uploaded to external storage',
          });
        } else {
          throw new Error(result.error || 'Upload failed');
        }
      } else {
        // Multiple files upload
        Array.from(selectedFiles).forEach(file => {
          formData.append('files', file);
        });
        formData.append('folder', uploadFolder);
        
        const response = await fetch('/api/upload-multiple', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.ok) {
          const newFiles: UploadedFile[] = result.results
            .filter((r: any) => r.ok)
            .map((r: any) => ({
              name: r.originalName,
              url: r.url,
              size: r.size,
              type: r.type,
              uploadedAt: new Date(),
              method: 's3' as const,
            }));
          
          setUploadedFiles(prev => [...prev, ...newFiles]);
          
          toast({
            title: language === 'ar' ? 'تم الرفع بنجاح' : 'Upload Successful',
            description: language === 'ar' ? 
              `تم رفع ${result.successful} ملف` : 
              `${result.successful} files uploaded successfully`,
          });
        }
      }
    } catch (error) {
      console.error('S3 upload error:', error);
      toast({
        title: language === 'ar' ? 'فشل في الرفع' : 'Upload Failed',
        description: language === 'ar' ? 
          'فشل في رفع الملفات' : 
          'Failed to upload files',
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: language === 'ar' ? 'تم النسخ' : 'Copied',
      description: language === 'ar' ? 'تم نسخ الرابط' : 'URL copied to clipboard',
    });
  };

  // Initialize S3 config check
  if (s3Config === null) {
    checkS3Config();
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="replit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="replit" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            {language === 'ar' ? 'Replit Storage' : 'Replit Storage'}
          </TabsTrigger>
          <TabsTrigger value="s3" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            {language === 'ar' ? 'التخزين الخارجي' : 'External Storage'}
            {s3Config?.configured && <Badge variant="secondary" className="text-xs">Ready</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="replit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                {language === 'ar' ? 'Replit Object Storage' : 'Replit Object Storage'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 
                    'استخدم نظام التخزين المدمج في Replit' : 
                    'Use Replit\'s built-in object storage system'
                  }
                </p>
                
                <FileUploader
                  maxNumberOfFiles={5}
                  maxFileSize={52428800}
                  onGetUploadParameters={handleReplitUpload}
                  onComplete={handleReplitUploadComplete}
                  buttonClassName="bg-blue-600 hover:bg-blue-700"
                >
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {language === 'ar' ? 'رفع إلى Replit' : 'Upload to Replit'}
                  </div>
                </FileUploader>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="s3" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                {language === 'ar' ? 'التخزين الخارجي (S3/R2/B2)' : 'External Storage (S3/R2/B2)'}
                {s3Config?.configured ? (
                  <Badge variant="secondary">Configured</Badge>
                ) : (
                  <Badge variant="destructive">Not Configured</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {s3Config?.configured ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="folder">
                        {language === 'ar' ? 'المجلد' : 'Folder'}
                      </Label>
                      <Input
                        id="folder"
                        value={uploadFolder}
                        onChange={(e) => setUploadFolder(e.target.value)}
                        placeholder="uploads/images"
                      />
                    </div>
                    <div>
                      <Label htmlFor="files">
                        {language === 'ar' ? 'الملفات' : 'Files'}
                      </Label>
                      <Input
                        id="files"
                        type="file"
                        multiple
                        onChange={(e) => setSelectedFiles(e.target.files)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleS3Upload}
                    disabled={isUploading || !selectedFiles}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? 
                      (language === 'ar' ? 'جاري الرفع...' : 'Uploading...') :
                      (language === 'ar' ? 'رفع إلى التخزين الخارجي' : 'Upload to External Storage')
                    }
                  </Button>
                </>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <Cloud className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 
                      'التخزين الخارجي غير مكون' : 
                      'External storage not configured'
                    }
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 
                      'أضف متغيرات البيئة للـ S3/R2/B2' : 
                      'Add S3/R2/B2 environment variables'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{language === 'ar' ? 'الملفات المرفوعة' : 'Uploaded Files'}</span>
              <Badge variant="secondary">{uploadedFiles.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex-1">
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {file.method === 'replit' ? 'Replit' : 'S3'}
                      </Badge>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(file.url, '_blank')}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(file.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}