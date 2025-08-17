export interface Lecture {
  title: string;
  description: string;
  url: string;
}

export interface Class {
  name: string;
  lectures: Lecture[];
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
  classes: Class[];
}

export interface PlatformData {
  teachers: Teacher[];
}

export type PageType = 'home' | 'classes' | 'video';