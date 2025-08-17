import { useState, useEffect } from 'react';

interface CompletedLectures {
  [url: string]: boolean;
}

export const useProgress = () => {
  const [completedLectures, setCompletedLectures] = useState<CompletedLectures>({});

  useEffect(() => {
    const stored = localStorage.getItem('completedLectures');
    if (stored) {
      setCompletedLectures(JSON.parse(stored));
    }
  }, []);

  const markLectureCompleted = (url: string) => {
    const updated = { ...completedLectures, [url]: true };
    setCompletedLectures(updated);
    localStorage.setItem('completedLectures', JSON.stringify(updated));
  };

  const toggleLectureCompletion = (url: string) => {
    const updated = { ...completedLectures };
    if (updated[url]) {
      delete updated[url];
    } else {
      updated[url] = true;
    }
    setCompletedLectures(updated);
    localStorage.setItem('completedLectures', JSON.stringify(updated));
  };

  const isLectureCompleted = (url: string) => {
    return !!completedLectures[url];
  };

  return {
    completedLectures,
    markLectureCompleted,
    toggleLectureCompletion,
    isLectureCompleted
  };
};