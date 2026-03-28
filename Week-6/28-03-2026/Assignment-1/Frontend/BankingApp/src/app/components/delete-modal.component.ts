import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  imports: [DecimalPipe,CommonModule],
  standalone: true
})
export class DeleteModalComponent {
  @Input()  transaction: Transaction | null = null;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel  = new EventEmitter<void>();
}
