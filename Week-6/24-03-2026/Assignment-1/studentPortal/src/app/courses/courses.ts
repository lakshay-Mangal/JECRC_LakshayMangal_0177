import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../course.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [RouterModule,CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  courseList : Course[] = [];
  constructor(private courseService :CourseService) {}
  ngOnInit(): void {
    this.courseList= this.courseService.getAllCourses();
  }
}
