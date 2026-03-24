import { Routes } from '@angular/router';
import { CourseDetails } from './course-details/course-details';
import { Courses } from './courses/courses';
import { Dashboard } from './dashboard/dashboard';
import { StudentProfile } from './student-profile/student-profile';

export const routes: Routes = [
  {path: 'course/:id', component: CourseDetails}, // Updated to accept dynamic ID
  {path: 'courses', component: Courses},
  {path: 'dashboard', component: Dashboard},
  {path: 'profile', component: StudentProfile},   // Updated to match /profile link
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];