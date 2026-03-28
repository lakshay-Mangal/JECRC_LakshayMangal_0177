import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  imports: [FormsModule,CommonModule]
})
export class TransactionFormComponent implements OnChanges {
  @Input()  editTransaction: Transaction | null = null;
  @Output() save   = new EventEmitter<Transaction>();
  @Output() cancel = new EventEmitter<void>();

  form: Transaction = this.emptyForm();
  formError = '';

  ngOnChanges(): void {
    this.form = this.editTransaction
      ? { ...this.editTransaction }
      : this.emptyForm();
    this.formError = '';
  }

  get isEdit(): boolean { return !!this.editTransaction; }

  emptyForm(): Transaction {
    return { date: '', description: '', type: 0, amount: 0, balance: '' };
  }

  onSubmit(): void {
    if (!this.form.date || !this.form.description || this.form.amount <= 0) {
      this.formError = 'Please fill in all required fields with valid values.';
      return;
    }
    this.formError = '';
    this.save.emit({ ...this.form });
  }

  onCancel(): void { this.cancel.emit(); }
}
