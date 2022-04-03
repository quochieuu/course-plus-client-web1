import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/shared/models/course';
import { environment } from 'src/environments/environment';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-intro',
  templateUrl: './course-intro.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './course-intro.component.scss']
})
export class CourseIntroComponent implements OnInit {
  course: Course | any;
  slug!: string;

  closeResult: string | undefined;

  urlSafe!: SafeResourceUrl;
  introUrl!: string;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.getCourseDetail(this.slug);
  }

  // Modal
  open(content: any) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // End modal

  getCourseDetail(slug: string) {
    this.courseService
      .findBySlug(slug)
      .subscribe((data: any) => {
        console.log(data);
        this.course = data;
        this.titleService.setTitle(this.course.name + " - Course Plus");
        this.introUrl = data.urlYoutubeVideo;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.introUrl);
      });
  }

}
