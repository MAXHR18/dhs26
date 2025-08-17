import { motion } from 'framer-motion';
import { Teacher } from '@/types/platform';

interface TeacherInfoProps {
  teacher: Teacher;
}

export const TeacherInfo = ({ teacher }: TeacherInfoProps) => {
  return (
    <motion.div
      className="bg-card border border-border rounded-xl p-6 flex items-center gap-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={teacher.image}
        alt={teacher.name}
        className="w-24 h-24 rounded-full object-cover border-4 shadow-lg"
        style={{ 
          borderColor: 'hsl(var(--teacher-border))',
          boxShadow: '0 6px 20px hsl(var(--teacher-border) / 0.3)'
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.svg';
        }}
      />
      
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {teacher.name}
        </h2>
        <p className="text-lg text-muted-foreground">
          {teacher.subject}
        </p>
      </div>
    </motion.div>
  );
};