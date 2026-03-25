import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
   
   private api = 'https://jsonplaceholder.typicode.com/todos';
   
   constructor(private http: HttpClient) {}

   // Get All Tasks
   getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
   }

   // Get Task by ID
   getTasksById(id: number): Observable<Task> {
    // Fixed: Removed the space between the slash and the id
    return this.http.get<Task>(`${this.api}/${id}`);
   }

   // Add a New Task
   addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
   }
   
   // Update Task Status
   updateTaskStatus(id: number, completed: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, {
      completed: completed
    });
   }

   // Update Partial Task Data
   updatePartial(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, data);
   }

   // Delete a Task
   deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
   }

   // Search Tasks
   searchTasks(term: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}?title_like=${term}`);
   }
}