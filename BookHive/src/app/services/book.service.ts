import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  addBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  updateBook(id: number, updatedBook: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, updatedBook);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  searchBooks(query: string): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.apiUrl}/books`)
      .pipe(
        map((books) =>
          books.filter(
            (book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.author.toLowerCase().includes(query.toLowerCase()) ||
              book.isbn.toLowerCase().includes(query.toLowerCase()) ||
              (book.genre &&
                book.genre.toLowerCase().includes(query.toLowerCase()))
          )
        )
      );
  }
}
