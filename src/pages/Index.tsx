import { useState } from 'react';
import { HomePage } from './HomePage';
import { ClassesPage } from './ClassesPage';
import { VideoPage } from './VideoPage';
import { Teacher, Lecture, PageType } from '@/types/platform';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setCurrentPage('classes');
  };

  const handleSelectLecture = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    setCurrentPage('video');
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedTeacher(null);
    setSelectedLecture(null);
  };

  const handleNavigateClasses = () => {
    setCurrentPage('classes');
    setSelectedLecture(null);
  };

  if (currentPage === 'home') {
    return <HomePage onSelectTeacher={handleSelectTeacher} />;
  }

  if (currentPage === 'classes' && selectedTeacher) {
    return (
      <ClassesPage
        teacher={selectedTeacher}
        onSelectLecture={handleSelectLecture}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  if (currentPage === 'video' && selectedLecture) {
    return (
      <VideoPage
        lecture={selectedLecture}
        onNavigateClasses={handleNavigateClasses}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  return <HomePage onSelectTeacher={handleSelectTeacher} />;
};

export default Index;
