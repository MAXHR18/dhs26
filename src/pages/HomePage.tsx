import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/platform/Header';
import { TeacherCard } from '@/components/platform/TeacherCard';
import { TelegramModal } from '@/components/platform/TelegramModal';
import { LoadingSpinner } from '@/components/platform/LoadingSpinner';
import { usePlatformData } from '@/hooks/usePlatformData';
import { Teacher } from '@/types/platform';

interface HomePageProps {
  onSelectTeacher: (teacher: Teacher) => void;
}

export const HomePage = ({ onSelectTeacher }: HomePageProps) => {
  const { data, isLoading, error } = usePlatformData();
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  const handleSearch = (query: string) => {
    if (!data?.teachers) return;
    
    if (!query.trim()) {
      setFilteredTeachers([]);
      return;
    }

    const filtered = data.teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(query.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };

  const teachersToShow = filteredTeachers.length > 0 ? filteredTeachers : (data?.teachers || []);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header onNavigateHome={() => {}} onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingSpinner message="جاري تحميل بيانات المنصة..." />
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Platform data error:', error);
    return (
      <div className="min-h-screen">
        <Header onNavigateHome={() => {}} onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-destructive">خطأ في تحميل البيانات</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              عذراً، حدث خطأ أثناء تحميل بيانات المنصة. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onNavigateHome={() => {}} onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-magical to-primary bg-clip-text text-transparent">
            منصة DHS التعليمية
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اكتشف عالم المعرفة مع أفضل المدرسين المتخصصين في مجالاتهم
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <motion.div
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {teachersToShow.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              className="snap-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TeacherCard
                teacher={teacher}
                onClick={() => onSelectTeacher(teacher)}
              />
            </motion.div>
          ))}
        </motion.div>

        {teachersToShow.length === 0 && filteredTeachers.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-muted-foreground">جرب البحث بكلمات مختلفة أو تصفح جميع المدرسين</p>
          </motion.div>
        )}
      </main>

      <TelegramModal
        isOpen={showTelegramModal}
        onClose={() => setShowTelegramModal(false)}
      />
    </div>
  );
};