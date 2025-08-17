import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/platform/Header';
import { TeacherCard } from '@/components/platform/TeacherCard';
import { TelegramModal } from '@/components/platform/TelegramModal';
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
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري تحميل البيانات...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header onNavigateHome={() => {}} onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-destructive">خطأ في تحميل البيانات</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onNavigateHome={() => {}} onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="flex overflow-x-auto gap-6 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {teachersToShow.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onClick={() => onSelectTeacher(teacher)}
            />
          ))}
        </motion.div>
      </main>

      <TelegramModal
        isOpen={showTelegramModal}
        onClose={() => setShowTelegramModal(false)}
      />
    </div>
  );
};