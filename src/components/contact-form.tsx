import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, Send, Users, FileText, LogIn } from "lucide-react";

const contactSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  city: z.string().optional(),
  gradeLevels: z.array(z.string()).optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      schoolName: "",
      contactName: "",
      email: "",
      phone: "",
      city: "",
      gradeLevels: [],
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/public/contact", {
        ...data,
        gradeLevels: selectedGrades,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your inquiry has been submitted successfully. We'll contact you soon!",
        duration: 5000,
      });
      form.reset();
      setSelectedGrades([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const gradeLevelOptions = [
    { value: "1-3", label: "Grades 1-3", labelAr: "الصفوف 1-3" },
    { value: "4-6", label: "Grades 4-6", labelAr: "الصفوف 4-6" },
    { value: "7-9", label: "Grades 7-9", labelAr: "الصفوف 7-9" },
  ];

  const handleGradeLevelChange = (value: string, checked: boolean) => {
    setSelectedGrades(prev => 
      checked 
        ? [...prev, value]
        : prev.filter(grade => grade !== value)
    );
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glassmorphism bg-transparent">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Request a Demo</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            {t('contact.form.school')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                              placeholder="Enter school name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            {t('contact.form.contact')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                              placeholder="Your name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            {t('contact.form.email')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                              placeholder="contact@school.edu.jo"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            {t('contact.form.phone')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                              placeholder="+962 X XXXX XXXX"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormItem>
                    <FormLabel className="text-gray-300 font-medium">
                      {t('contact.form.levels')}
                    </FormLabel>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {gradeLevelOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedGrades.includes(option.value)}
                            onCheckedChange={(checked) => 
                              handleGradeLevelChange(option.value, checked === true)
                            }
                            className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <span className="text-gray-300 text-sm">
                            {language === 'ar' ? option.labelAr : option.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-medium">
                          {t('contact.form.message')}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                            placeholder="Tell us about your school's STEM education goals..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {contactMutation.isPending ? "Sending..." : t('contact.form.submit')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Information */}
            <Card className="glassmorphism bg-transparent">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-300" dir="ltr">+962 6 535 5000</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-300" dir="ltr">info@afaq-alilm.edu.jo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Portal Access */}
            <Card className="glassmorphism bg-transparent">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Teacher Portal</h3>
                <p className="text-gray-300 mb-6">
                  Already a partner school? Access your teacher resources and curriculum materials.
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => window.location.href = '/api/login'}
                    className="w-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    variant="ghost"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Teacher Login
                  </Button>

                  <Button
                    onClick={() => {
                      const element = document.querySelector('#curriculum');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    variant="ghost"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Sample Lessons
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="glassmorphism bg-transparent">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Follow Our Journey</h3>

                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-400 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">t</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">in</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">ig</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">yt</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
