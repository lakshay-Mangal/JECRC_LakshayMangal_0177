import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RecordTableComponent } from "./components/record-table.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, RecordTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BankingApp');
}
