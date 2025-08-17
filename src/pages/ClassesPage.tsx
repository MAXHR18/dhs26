import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/platform/Header';
import { TeacherInfo } from '@/components/platform/TeacherInfo';
import { ClassCard } from '@/components/platform/ClassCard';
import { Teacher, Lecture } from '@/types/platform';

interface ClassesPageProps {
  teacher: Teacher;
  onSelectLecture: (lecture: Lecture) => void;
  onNavigateHome: () => void;
}

export const ClassesPage = ({ teacher, onSelectLecture, onNavigateHome }: ClassesPageProps) => {
  return (
    <div className="min-h-screen">
      <Header onNavigateHome={onNavigateHome} onSearch={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={onNavigateHome}
            variant="outline"
            className="mb-4"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            الرجوع للمدرسين
          </Button>

          <TeacherInfo teacher={teacher} />

          <div className="space-y-4">
            {teacher.classes.map((classData, index) => (
              <ClassCard
                key={index}
                classData={classData}
                onLectureClick={onSelectLecture}
              />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};