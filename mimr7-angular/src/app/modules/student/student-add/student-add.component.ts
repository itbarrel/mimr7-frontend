import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/shared/interfaces';
import { StudentService } from '../services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent implements OnInit {
  isUpdate: boolean = false;
  studentId: string = '';

  collectionForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    mobilePhone: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  btnText: string = 'Add';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private toastr: ToastrService,
    private _location: Location

  ) {}

  ngOnInit(): void {
    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.isUpdate = true;
      this.btnText = 'Update';
      this.studentId = this.route.snapshot.paramMap.get('id') || '';
      this.studentService
        .getById(String(this.studentId))
        .subscribe((res: any) => {
          console.log(res);
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
      if (!this.isUpdate) {
        this.studentService.add(organizationData).subscribe(
          (res: any) => {
            this.toastr.success('Student Added Sucessfully');
            this.collectionForm.patchValue({
              name: '',
              email: '',
              mobilePhone: '',
            });
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
}
