import { CourseLecture } from './../../../../shared/models/course-lecture';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseSection } from 'src/app/shared/models/course-section';
import Swal from 'sweetalert2';
import { CourseSectionService } from '../../../../shared/services/course-section.service';
import { CourseLectureService } from 'src/app/shared/services/course-lecture.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/tailwind.css',
    './index.component.scss']
})
export class IndexComponent implements OnInit {

  item: CourseSection[] = [];
  course: Course | any;
  courseSection: CourseSection | any;
  courseLecture: CourseLecture | any;
  slug!: string;
  data!: {};

  createForm!: FormGroup;
  courseId!: string;

  closeResult: string | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private courseSectionService: CourseSectionService,
    private titleService: Title,
    private modalService: NgbModal,
    private courseLectureService: CourseLectureService)
    {
      this.titleService.setTitle("Quản lý chương trình giảng dạy - Course Plus Admin");
    }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.getData(this.slug);
    this.getCourse(this.slug);

    console.log("Start get");
    console.log(this.courseId);

    this.createForm = this.formBuilder.group({
      courseId: [''],
      name: [''],
      description: [''],
    });
  }



  getData(slug:string):void {
    this.courseSectionService.getByCourseSlug(slug).subscribe(
      (data) => {
        this.item = data;
        console.log(this.item);
      },
      (error) => console.log(error)
    );
  }

  getCourse(slug: string): void {
    this.courseSectionService.findCourseBySlug(slug).subscribe(
      (data) => {
        this.course = data;
        this.courseId = data.id;
      },
      (error) => console.log(error)
    );
  }

  delete(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận xóa section?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.slug);

          this.courseSectionService.delete(id).subscribe((res) => {
            this.courseSection = this.courseSection.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          this.getData(this.slug);
          this.getData(this.slug);
          this.getData(this.slug);
          this.getData(this.slug);

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

  onSubmit(): any {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận thêm mới section?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(this.createForm.value.name);
          this.data = {
            'courseId' : this.courseId,
            'name' : this.createForm.value.name,
            'description': this.createForm.value.description
          }
          this.courseSectionService.create(this.data).subscribe(
            () => {
              this.createForm.reset();
              for (let i = 0; i < 2; i++) {
                this.getData(this.slug);
              }
              this.modalService.dismissAll();

            },
            (err) => {
              console.log(err);
            }
          );

          swalWithBootstrapButtons.fire('Thêm mới thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

  // Modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  deleteLecture(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'btn btn-success',
        cancelButton:
          'btn btn-default',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: 'Xác nhận xóa bài học?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.getData(this.slug);

          this.courseLectureService.delete(id).subscribe((res) => {
            this.courseLecture = this.courseLecture.filter(
              (item: { id: string }) => item.id !== id
            );
          });
          for (let i = 0; i < 4; i++) {
            this.getData(this.slug);
          }

          swalWithBootstrapButtons.fire('Xóa thành công!');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Hủy thành công!');
        }
      });
  }

}
