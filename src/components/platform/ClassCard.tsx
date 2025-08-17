import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Class, Lecture } from '@/types/platform';
import { LectureItem } from './LectureItem';

interface ClassCardProps {
  classData: Class;
  onLectureClick: (lecture: Lecture) => void;
}

export const ClassCard = ({ classData, onLectureClick }: ClassCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-card border border-border rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors border-r-4 border-primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-bold text-foreground">
          {classData.name}
        </h3>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              {classData.lectures.map((lecture, index) => (
                <LectureItem
                  key={index}
                  lecture={lecture}
                  onClick={() => onLectureClick(lecture)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};