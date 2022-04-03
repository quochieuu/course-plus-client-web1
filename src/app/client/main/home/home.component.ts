import { BlogService } from 'src/app/shared/services/blog.service';
import { BookService } from 'src/app/shared/services/book.service';
import { environment } from './../../../../environments/environment';
import { CourseService } from './../course/course.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/uikit.css',
    './../../../../assets/client/assets/css/style.css',
    './../../../../assets/client/assets/css/tailwind.css',
    './home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: any = [];
  books: any = [];
  blogs: any = [];
  featureCourses: any = [];

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
      public courseService: CourseService,
      public bookService: BookService,
      public blogService: BlogService,
      private titleService: Title
    ) {

    }

  ngOnInit(): void {
    this.titleService.setTitle("Course Plus - Học lập trình để đi làm qua các dự án thực tế 2022");

    this.getCourses();
    this.getBooks();
    this.getBlogs();
  }

  getCourses() {
    this.courseService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.courses = data;
        this.featureCourses = data.slice(0, 3);
      });
  }

  getBooks() {
    this.bookService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.books = data;
      });
  }

  getBlogs() {
    this.blogService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.blogs = data;
      });
  }

}
