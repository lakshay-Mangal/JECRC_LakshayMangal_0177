import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from './../services/transaction.service';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal.component';
import { TransactionFormComponent } from './transaction-form.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css'],
  imports: [CommonModule,DeleteModalComponent,TransactionFormComponent,FormsModule]
})
export class RecordTableComponent implements OnInit {
  transactions: Transaction[]         = [];
  filteredTransactions: Transaction[] = [];
  selectedDate = '';

  showForm = false;
  editTransaction: Transaction | null = null;
  deleteTarget: Transaction | null    = null;
  successMessage    = '';
  errorMessage      = '';

  constructor(private txService: TransactionService) {}

  ngOnInit(): void { this.getTransactions(); }

  getTransactions(): void {
    this.txService.getAll().subscribe({
      next: (data) => {
        this.transactions         = data;
        this.filteredTransactions = [...data];
      },
      error: () => this.showError('Failed to load transactions.')
    });
  }

  onFilter(): void {
    if (!this.selectedDate) return;
    this.txService.filterByDate(this.selectedDate).subscribe({
      next: (data) => { this.filteredTransactions = data; },
      error: () => this.showError('Filter failed.')
    });
  }

  resetFilter(): void {
    this.selectedDate         = '';
    this.filteredTransactions = [...this.transactions];
  }

  sortByAmount(): void {
    this.filteredTransactions = [...this.filteredTransactions]
      .sort((a, b) => a.amount - b.amount);
  }

  openCreateForm(): void {
    this.editTransaction = null;
    this.showForm        = true;
  }

  openEditForm(tx: Transaction): void {
    this.editTransaction = { ...tx };
    this.showForm        = true;
  }

  onSave(tx: Transaction): void {
    if (this.editTransaction?.id) {
      this.txService.update(this.editTransaction.id, tx).subscribe({
        next: (updated) => {
          const idx = this.transactions.findIndex(t => t.id === updated.id);
          if (idx !== -1) this.transactions[idx] = updated;
          this.syncFiltered();
          this.closeForm();
          this.showSuccess('Transaction updated successfully.');
        },
        error: () => this.showError('Failed to update transaction.')
      });
    } else {
      this.txService.create(tx).subscribe({
        next: (created) => {
          this.transactions.unshift(created);
          this.syncFiltered();
          this.closeForm();
          this.showSuccess('Transaction added successfully.');
        },
        error: () => this.showError('Failed to create transaction.')
      });
    }
  }

  openDeleteModal(tx: Transaction): void { this.deleteTarget = tx; }

  confirmDelete(): void {
    if (!this.deleteTarget?.id) return;
    this.txService.delete(this.deleteTarget.id).subscribe({
      next: () => {
        this.transactions         = this.transactions.filter(t => t.id !== this.deleteTarget!.id);
        this.filteredTransactions = this.filteredTransactions.filter(t => t.id !== this.deleteTarget!.id);
        this.deleteTarget         = null;
        this.showSuccess('Transaction deleted.');
      },
      error: () => this.showError('Failed to delete transaction.')
    });
  }

  cancelDelete(): void { this.deleteTarget = null; }

  closeForm(): void { this.showForm = false; this.editTransaction = null; }

  syncFiltered(): void {
    this.filteredTransactions = this.selectedDate
      ? this.transactions.filter(t => t.date === this.selectedDate)
      : [...this.transactions];
  }

  getTypeLabel(type: number): string { return type === 0 ? 'Credit' : 'Debit'; }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    this.errorMessage   = '';
    setTimeout(() => (this.successMessage = ''), 3500);
  }

  showError(msg: string): void {
    this.errorMessage   = msg;
    this.successMessage = '';
    setTimeout(() => (this.errorMessage = ''), 4000);
  }

  get totalCredits(): number {
    return this.filteredTransactions
      .filter(t => t.type === 0).reduce((s, t) => s + t.amount, 0);
  }

  get totalDebits(): number {
    return this.filteredTransactions
      .filter(t => t.type === 1).reduce((s, t) => s + t.amount, 0);
  }
}
