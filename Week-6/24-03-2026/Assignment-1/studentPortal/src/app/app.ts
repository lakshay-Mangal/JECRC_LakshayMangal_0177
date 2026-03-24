import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Courses } from './courses/courses';
import { CourseDetails } from './course-details/course-details';
import { StudentProfile } from './student-profile/student-profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('studentPortal');
}
