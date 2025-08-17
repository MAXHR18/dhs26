import { motion } from 'framer-motion';
import { Teacher } from '@/types/platform';

interface TeacherCardProps {
  teacher: Teacher;
  onClick: () => void;
}

export const TeacherCard = ({ teacher, onClick }: TeacherCardProps) => {
  return (
    <motion.div
      className="relative bg-card border border-border rounded-2xl p-6 cursor-pointer overflow-hidden group min-w-[280px] flex-shrink-0"
      onClick={onClick}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 15px 35px hsl(var(--magical) / 0.2), 0 5px 15px rgba(0,0,0,0.1)'
      }}
      whileTap={{ y: -4, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      
      <div className="relative z-10 text-center">
        <div className="mb-4 mx-auto">
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-48 h-48 rounded-full object-cover mx-auto border-4 shadow-lg transition-transform duration-300 group-hover:scale-105"
            style={{ 
              borderColor: 'hsl(var(--teacher-border))',
              boxShadow: '0 8px 25px hsl(var(--teacher-border) / 0.3)'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {teacher.name}
        </h3>
        
        <p className="text-muted-foreground group-hover:text-foreground transition-colors">
          {teacher.subject}
        </p>
      </div>
    </motion.div>
  );
};