import { Injectable } from '@angular/core';
export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, title: 'Introduction to Angular', description: 'Learn the basics of Angular, components, and routing.', instructor: 'Jane Doe', duration: '4 Weeks' },
    { id: 2, title: 'Advanced C# and .NET', description: 'Deep dive into LINQ, Entity Framework, and API design.', instructor: 'John Smith', duration: '8 Weeks' },
    { id: 3, title: 'Database Management Systems', description: 'SQL, normalization, and database architecture.', instructor: 'Alice Johnson', duration: '6 Weeks' }
  ];

  constructor(){}
    
  getAllCourses() :Course[]{
    return this.courses;
  }
  
  getCourseById(id: number) :Course |undefined{
    return this.courses.find(course => course.id ===id);
  }
  }

