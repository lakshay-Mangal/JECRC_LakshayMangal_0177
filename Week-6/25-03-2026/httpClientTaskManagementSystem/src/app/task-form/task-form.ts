import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
  imports: [ReactiveFormsModule]
})
export class TaskForm {
  taskForm: FormGroup;
  
  // Emits the newly created task to the parent component
  @Output() taskAdded = new EventEmitter<Task>(); 

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const newTask: Task = this.taskForm.value;

    this.taskService.addTask(newTask).subscribe({
      next: (createdTask) => {
        this.taskAdded.emit(createdTask); // Tell parent component a task was added
        this.taskForm.reset({ completed: false }); // Clear the form
      },
      error: (err) => console.error('Error creating task', err)
    });
  }
}