import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/shared/interfaces';
import { StudentService } from 'src/app/student/services/student.service';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-import-students',
  templateUrl: './import-students.component.html',
  styleUrls: ['./import-students.component.scss']
})
export class ImportStudentsComponent {
  availableStudents: Student[] = [];
  students: string[] = [];
  addedFilter: string = '';
  txt: string = 'Add Students';
  importStudents: boolean = true;

  classListId: string = '';
  constructor(
    private studentService: StudentService,
    private classListService: ClassService,
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

  }


  getClassData() {
    this.classListService.getById(this.classListId).subscribe((res: any) => {
      console.log('already added', res.klass[0].Students);
      this.availableStudents = res.klass[0].Students;
    
    });
  }

 

  submit() {
    

    if (this.importStudents) {
      this.classListService
        .addStudentsToClass(this.classListId, this.students)
        .subscribe((res) => {
          this.toaster.success('Students added successfuly');
          this.router.navigateByUrl(`/dashboard/classes`);
          console.log(res);
        });
    } else {
      this.classListService
        .deleteStudentFromClass(this.classListId, this.students)
        .subscribe((res) => {
          this.toaster.success('Students deleted successfuly');
          this.router.navigateByUrl(`/dashboard/classes`);

          console.log(res);
        });
    }
  }

  getStudentByClassId() {
    this.studentService.getByClass(this.classListId).subscribe((res: any) => {
      this.availableStudents = res.student;
    });
  }


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
