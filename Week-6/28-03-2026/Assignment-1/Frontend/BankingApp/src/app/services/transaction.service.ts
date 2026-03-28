import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
private apiUrl = 'http://localhost:5234/api/transactions';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  filterByDate(date: string): Observable<Transaction[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<Transaction[]>(`${this.apiUrl}/filter`, { params });
  }

  create(tx: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, tx);
  }

  update(id: number, tx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, tx);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
