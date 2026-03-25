import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service'; // Adjust path if needed
import { Task } from '../task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  imports: [CommonModule]
})
export class TaskList implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        // The API returns 200 tasks, let's just grab the first 10 for display
        this.tasks = data.slice(0, 10);
      },
      error: (err) => console.error('Error fetching tasks', err)
    });
  }

toggleCompletion(task: Task): void {
    if (task.id === undefined) return;
    
    const previousStatus = task.completed;
    task.completed = !previousStatus; 

    this.taskService.updateTaskStatus(task.id, task.completed).subscribe({
      next: () => {
        // Success! We don't need to do anything because the UI is already updated.
        console.log(`Task ${task.id} updated successfully.`);
      },
      error: (err) => {
        // If the API fails, revert the checkbox back to its original state
        console.error('Error updating task, reverting UI', err);
        task.completed = previousStatus; 
      }
    });
  }

  deleteTask(id?: number): void {
    if (id === undefined) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        // Remove the task from the local array to update the UI
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: (err) => console.error('Error deleting task', err)
    });
  }
}