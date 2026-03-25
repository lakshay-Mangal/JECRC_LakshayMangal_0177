import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskForm } from "./task-form/task-form";
import { TaskList } from './task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [ TaskForm,TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('httpClientTaskManagementSystem');
}
