export const translations = {
  en: {
    loading: 'Loading...',
    error: 'An error occurred',
    'error.network': 'Network error. Please check your connection.',
    'error.unauthorized': 'You are not authorized to access this resource.',
    'error.notFound': 'Resource not found.',
    'button.tryAgain': 'Try Again',
    'button.goHome': 'Go Home',
    'button.login': 'Login',
    'button.logout': 'Logout',
    'form.required': 'This field is required',
    'form.email.invalid': 'Please enter a valid email address',
    'form.success': 'Form submitted successfully!',
    'curriculum.grades': 'Grades {min}-{max}',
    'lesson.week': 'Week {number}',
    'stats.partner.schools': 'Partner Schools',
    'stats.students.reached': 'Students Reached',
    'stats.trained.teachers': 'Trained Teachers',
    'stats.satisfaction': 'Satisfaction %',
  },
  ar: {
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    'error.network': 'خطأ في الشبكة. يرجى التحقق من الاتصال.',
    'error.unauthorized': 'غير مخول لك الوصول إلى هذا المورد.',
    'error.notFound': 'المورد غير موجود.',
    'button.tryAgain': 'حاول مرة أخرى',
    'button.goHome': 'الذهاب للرئيسية',
    'button.login': 'تسجيل الدخول',
    'button.logout': 'تسجيل الخروج',
    'form.required': 'هذا الحقل مطلوب',
    'form.email.invalid': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    'form.success': 'تم إرسال النموذج بنجاح!',
    'curriculum.grades': 'الصفوف {min}-{max}',
    'lesson.week': 'الأسبوع {number}',
    'stats.partner.schools': 'المدارس الشريكة',
    'stats.students.reached': 'الطلاب المستفيدون',
    'stats.trained.teachers': 'المعلمون المدربون',
    'stats.satisfaction': 'نسبة الرضا %',
  }
};

export function interpolate(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key]?.toString() || match;
  });
}
