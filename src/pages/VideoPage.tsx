import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/platform/Header';
import { VideoPlayer } from '@/components/platform/VideoPlayer';
import { Lecture } from '@/types/platform';

interface VideoPageProps {
  lecture: Lecture;
  onNavigateClasses: () => void;
  onNavigateHome: () => void;
}

export const VideoPage = ({ lecture, onNavigateClasses, onNavigateHome }: VideoPageProps) => {
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
          <VideoPlayer lecture={lecture} />

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              {lecture.title}
            </h2>
            <p className="text-muted-foreground mb-4">
              {lecture.description}
            </p>
            
            <Button onClick={onNavigateClasses} variant="outline">
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للفصول
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};