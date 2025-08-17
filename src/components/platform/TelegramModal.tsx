import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramModal = ({ isOpen, onClose }: TelegramModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            className="relative bg-card border border-border rounded-xl p-6 max-w-sm w-full text-center shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="mb-4">
              <img
                src="https://www2.0zz0.com/2025/06/06/12/427823133.jpg"
                alt="قناة التليجرام"
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary/20 shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>

            <h3 className="text-xl font-bold mb-2 text-foreground">
              اشترك في قناتنا على التليجرام
            </h3>
            
            <p className="text-muted-foreground mb-4">
              تابع آخر التحديثات والمحتوى الجديد
            </p>

            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90"
            >
              <a
                href="https://t.me/dhs_26"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                اذهب للقناة
              </a>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};