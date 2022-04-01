import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  books: any = [];

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.books = data;
      });
  }

}
