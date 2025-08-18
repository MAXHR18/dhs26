import { motion } from 'framer-motion';
import { Teacher } from '@/types/platform';

interface TeacherInfoProps {
  teacher: Teacher;
}

export const TeacherInfo = ({ teacher }: TeacherInfoProps) => {
  return (
    <motion.div 
      className="bg-card border border-border rounded-xl p-8 text-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-magical to-primary"></div>
      
      <div className="relative z-10">
        <motion.img
          src={teacher.image}
          alt={teacher.name}
          className="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 shadow-xl"
          style={{ 
            borderColor: 'hsl(var(--teacher-border))',
            boxShadow: '0 12px 30px hsl(var(--teacher-border) / 0.3)'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        
        <motion.h2 
          className="text-3xl font-bold mb-3 text-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {teacher.name}
        </motion.h2>
        
        <motion.p 
          className="text-lg text-muted-foreground bg-accent/30 rounded-full px-6 py-2 inline-block"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {teacher.subject}
        </motion.p>
        
        <motion.div 
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="bg-primary/10 rounded-lg p-3">
            <p className="text-2xl font-bold text-primary">{teacher.classes.length}</p>
            <p className="text-sm text-muted-foreground">فصل دراسي</p>
          </div>
          <div className="bg-magical/10 rounded-lg p-3">
            <p className="text-2xl font-bold text-magical">
              {teacher.classes.reduce((total, cls) => total + cls.lectures.length, 0)}
            </p>
            <p className="text-sm text-muted-foreground">محاضرة</p>
          </div>
          <div className="bg-accent rounded-lg p-3">
            <p className="text-2xl font-bold text-foreground">⭐</p>
            <p className="text-sm text-muted-foreground">مدرس متميز</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};