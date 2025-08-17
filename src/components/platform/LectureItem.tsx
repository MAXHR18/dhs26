import { motion } from 'framer-motion';
import { Check, Play } from 'lucide-react';
import { Lecture } from '@/types/platform';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

interface LectureItemProps {
  lecture: Lecture;
  onClick: () => void;
}

export const LectureItem = ({ lecture, onClick }: LectureItemProps) => {
  const { isLectureCompleted, toggleLectureCompletion } = useProgress();
  const isCompleted = isLectureCompleted(lecture.url);

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLectureCompletion(lecture.url);
  };

  return (
    <motion.div
      className={cn(
        "relative flex items-center gap-3 p-3 rounded-lg border-r-3 cursor-pointer overflow-hidden group transition-all duration-300",
        isCompleted 
          ? "bg-primary/10 border-primary" 
          : "bg-background border-primary/60 hover:bg-primary/5"
      )}
      whileHover={{ 
        x: 12,
        boxShadow: '0 4px 15px hsl(var(--primary) / 0.15)'
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
      
      <button
        onClick={onClick}
        className="flex items-center gap-3 flex-1 text-right"
      >
        <Play className="h-4 w-4 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
            {lecture.title}
          </p>
          {lecture.description && (
            <p className="text-sm text-muted-foreground">
              {lecture.description}
            </p>
          )}
        </div>
      </button>

      <button
        onClick={handleToggleComplete}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-md border-2 transition-all duration-200 hover:scale-105",
          isCompleted
            ? "bg-primary border-primary text-primary-foreground shadow-lg"
            : "border-border hover:border-primary/60 bg-card"
        )}
      >
        {isCompleted && <Check className="h-4 w-4" />}
      </button>
    </motion.div>
  );
};