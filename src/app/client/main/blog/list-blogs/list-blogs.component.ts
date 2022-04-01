import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-blogs.component.scss']
})
export class ListBlogsComponent implements OnInit {

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  blogs: any = [];

  constructor(public blogService: BlogService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.blogService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.blogs = data;
      });
  }

}
