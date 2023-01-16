import { Component, OnInit } from '@angular/core';

import { StudentService } from '../services/student.service';
import { Student } from 'src/app/shared/interfaces';
import { ClassListService } from '../services/class-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-students',
  templateUrl: './import-students.component.html',
  styleUrls: ['./import-students.component.scss'],
})
export class ImportStudentsComponent implements OnInit {
  availableStudents: Student[] = [];
  students: string[] = [];
  addedFilter: string = '';
  txt: string = 'Add Students';
  importStudents: boolean = true;

  classListId: string = '';
  constructor(
    private studentService: StudentService,
    private classListService: ClassListService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('import'));
    this.classListId = this.route.snapshot.paramMap.get('id') || '';
    if (this.route.snapshot.paramMap.get('import') === 'true') {
      this.getStudentByClassId();
    } else {
      this.importStudents = false;
      this.txt = 'Remove Students';
      this.getClassData();
    }

    // this.getStudents();
  }
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Walk dog'];

  getClassData() {
    this.classListService.getById(this.classListId).subscribe((res: any) => {
      console.log('already added', res.classList[0].Students);
      this.availableStudents = res.classList[0].Students;
      // res.classList[0].Students.forEach((student: any) => {
      //   console.log('callinf from loop ', student);
      //   this.testingOldStudent.push(student);
      //   this.oldstudents.push(student.id);
      // });
    });
  }

  // getStudents() {
  //   this.studentService.getAll(1, 100, '', '').subscribe((res: any) => {
  //     this.availableStudents = res.data;
  //     // this.addedStudents = res.data
  //   });
  // }

  // drop(event: CdkDragDrop<Student[]>) {
  //   console.log('drag called', event.container.data);
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  //   console.log('OOOOOO', this.addedStudents);
  // }

  submit() {
    // const addedStudentsTemp: any = [];
    // this.addedStudents.forEach((student) => {
    //   const studentId = student.id || '';

    //   this.students.push(studentId);
    // });
    // console.log(this.students, '---------', this.oldstudents);
    // this.students.forEach((stu, index) => {
    //   this.oldstudents.forEach((old, newInd) => {
    //     if (old === stu) {
    //       console.log(old, 'found', stu);
    //       this.students.splice(index, 1);
    //       addedStudentsTemp.splice(index, 1);
    //       this.testingOldStudent.splice(newInd, 1);
    //       this.oldstudents.splice(newInd, 1);
    //     }
    //   });
    // });
    // console.log(this.students, '---------', this.oldstudents);
    // console.log(addedStudentsTemp, '---------', this.testingOldStudent);
    // let addReq = this.classListService.addStudentsToClass(this.classListId, {
    //   students: this.students,
    // });
    // let delReq = this.classListService.deleteStudentFromClass(
    //   this.classListId,
    //   {
    //     students: this.oldstudents,
    //   }
    // );

    // forkJoin([addReq, delReq]).subscribe((responseList) => {
    //   console.log('task completed', responseList);
    //   window.location.reload();
    // });
    // this.classListService
    //   .addStudentsToClass(this.classListId, {
    //     students: this.students,
    //   })
    //   .subscribe((res) => {
    //     console.log('students adds', res);
    //     window.location.reload();
    //   });

    if (this.importStudents) {
      this.classListService
        .addStudentsToClass(this.classListId, this.students)
        .subscribe((res) => {
          this.toaster.success('Students added successfuly');
          this.router.navigateByUrl(`/dashboard/home/classes`);
          console.log(res);
        });
    } else {
      this.classListService
        .deleteStudentFromClass(this.classListId, this.students)
        .subscribe((res) => {
          this.toaster.success('Students deleted successfuly');
          this.router.navigateByUrl(`/dashboard/home/classes`);

          console.log(res);
        });
    }
  }

  getStudentByClassId() {
    this.studentService.getByClass(this.classListId).subscribe((res: any) => {
      this.availableStudents = res.student;
    });
  }

  // checkboxChanged(event: any) {
  //   console.log(event.target.checked);
  //   if (event.target.checked) {
  //     this.availableStudents.forEach((student) => {
  //       if (student.id === event.target.value) {
  //         student.checked = true;
  //         this.students.push(event.target.value);
  //       }
  //     });
  //   } else {
  //     this.availableStudents.forEach((student) => {
  //       if (student.id === event.target.value) {
  //         student.checked = false;
  //         this.students = this.students.filter((e) => e !== event.target.value);
  //       }
  //     });
  //   }
  //   console.log(this.students);
  // }

  importDeleteStudent(student: Student) {
    this.availableStudents.forEach((stu) => {
      if (student.id === stu.id) {
        if (student.checked) {
          stu.checked = false;
          this.students = this.students.filter((e) => e !== stu.id);
        } else {
          stu.checked = true;
          this.students.push(stu.id || '');
        }
      }
    });
    console.log('asdasd', this.students);
  }
}

export interface addStudent {
  id?: string;
}
