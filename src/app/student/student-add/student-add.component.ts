import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

// import { studentService } from '../services/account-organization.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent {
  hasFocus = false;
  name: string = '';
  city: string = '';
  update: boolean = false;
  studentId: string = '';

  collectionForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobilePhone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^\d+$/)]),
  });

  id: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _location: Location

  ) {}
  ngOnInit(): void {
    // this.studentId = this.route.snapshot.paramMap.get('id') || '';
    this.checkParams();
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.studentId = this.route.snapshot.paramMap.get('id') || '';

      this.studentService
        .getById(String(this.studentId))
        .subscribe((res: any) => {
          // patch values in the form
          this.collectionForm.patchValue({
            name: res.student.name,
            email: res.student.email,
            mobilePhone: res.student.mobilePhone,
          });
        });
    }
  }
  submit() {
    // console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { name, email,mobilePhone } = this.collectionForm.value;
      const organizationData: Student = {
        name,
        email,
        mobilePhone,
      };
      if (!this.update) {
        this.studentService.add(organizationData).subscribe(
          (res: any) => {
            this.toastr.success('Student Added Sucessfully');
            this.collectionForm.reset()
            // this.collectionForm.patchValue({
            //   name: '',
            //   email: '',
            //   mobilePhone: '',
            // });
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.studentService.update(this.studentId, organizationData).subscribe(
          (res: any) => {
            this.toastr.success('Student Updated Sucessfully');
            this._location.back()
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    }
  }
  // submit() {
  //   if (!this.name || this.name.length < 3) {
  //     this.toastr.error('Enter a valid Organization Name');
  //   }else if (!this.city || this.city.length < 3) {
  //     this.toastr.error('Enter valid City');
  //   } else {
  //     const contentData: Student = {
  //       name: this.name,
  //       email: this.email,

  //       city: this.city,

  //     };
  //     if (!this.update) {
  //       this.studentService.addOrganization(contentData).subscribe((res) => {
  //         this.toastr.success('Added Sucessfully');
  //         this.name = '';
  //         this.city = '';
  //       });
  //     } else {
  //       this.studentService.updateOrganization(this.organizationId, contentData)
  //         .subscribe((res) => {
  //           this.toastr.success('Updated Sucessfully');
  //           this.name = '';
  //           this.city = '';

  //           this.router.navigateByUrl(
  //             `/dashboard/organizations`
  //           );
  //         });
  //     }
  //   }
  // }
}
