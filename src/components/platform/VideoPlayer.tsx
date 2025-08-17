import { useEffect, useRef, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Lecture } from '@/types/platform';
import { useProgress } from '@/hooks/useProgress';

declare global {
  interface Window {
    Hls: any;
    hls: any;
  }
}

interface VideoPlayerProps {
  lecture: Lecture;
  onVideoEnd?: () => void;
}

export const VideoPlayer = ({ lecture, onVideoEnd }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { markLectureCompleted } = useProgress();

  useEffect(() => {
    if (!videoRef.current || !lecture.url) return;

    setIsLoading(true);
    setError(null);

    const video = videoRef.current;
    
    // Reset video
    video.src = '';
    video.load();

    // Determine video type and setup player
    if (lecture.url.includes('youtube.com') || lecture.url.includes('youtu.be')) {
      // Handle YouTube videos
      setupYouTubePlayer();
    } else if (lecture.url.includes('.m3u8')) {
      // Handle HLS streams
      setupHLSPlayer();
    } else {
      // Handle direct MP4/other formats
      setupDirectPlayer();
    }

    function setupYouTubePlayer() {
      // For YouTube, we'll embed using iframe
      const youtubeId = extractYouTubeId(lecture.url);
      if (youtubeId) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = 'none';
        iframe.allowFullscreen = true;
        
        if (video.parentNode) {
          video.parentNode.replaceChild(iframe, video);
        }
        setIsLoading(false);
      } else {
        setError('معرف فيديو YouTube غير صالح');
        setIsLoading(false);
      }
    }

    function setupHLSPlayer() {
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        
        hls.loadSource(lecture.url);
        hls.attachMedia(video);
        
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          video.play().catch(console.error);
        });
        
        hls.on(window.Hls.Events.ERROR, (event, data) => {
          console.error('HLS Error:', data);
          if (data.fatal) {
            setError('خطأ في تحميل الفيديو');
            setIsLoading(false);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = lecture.url;
        setIsLoading(false);
      } else {
        setError('متصفحك لا يدعم تشغيل هذا النوع من الفيديو');
        setIsLoading(false);
      }
    }

    function setupDirectPlayer() {
      video.src = lecture.url;
      video.addEventListener('loadeddata', () => setIsLoading(false));
      video.addEventListener('error', () => {
        setError('خطأ في تحميل الفيديو');
        setIsLoading(false);
      });
    }

    // Add event listeners
    const handleVideoEnd = () => {
      markLectureCompleted(lecture.url);
      onVideoEnd?.();
      toast({
        title: "تم إكمال المحاضرة!",
        description: "تم حفظ تقدمك تلقائياً",
      });
    };

    video.addEventListener('ended', handleVideoEnd);
    
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      if (window.hls) {
        window.hls.destroy();
      }
    };
  }, [lecture.url, markLectureCompleted, onVideoEnd]);

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (error) {
    return (
      <div className="aspect-video bg-background rounded-lg flex items-center justify-center border border-border">
        <div className="text-center p-6">
          <p className="text-destructive mb-2">⚠️ خطأ في تحميل الفيديو</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-background rounded-lg overflow-hidden border border-border">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-muted-foreground">جاري تحميل الفيديو...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        controls
        className="w-full h-full object-contain"
        playsInline
        preload="metadata"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
    </div>
  );
};