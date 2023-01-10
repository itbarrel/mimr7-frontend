import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { StudentService } from '../services/student.service';
import { Student } from 'src/app/shared/interfaces';
import { ClassListService } from '../services/class-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-import-students',
  templateUrl: './import-students.component.html',
  styleUrls: ['./import-students.component.scss'],
})
export class ImportStudentsComponent implements OnInit {
  availableStudents: Student[] = [];
  addedStudents: Student[] = [];
  addNewStudents: string[] = [];
  deleteStudents: string[] = [];
  students: string[] = [];
  oldstudents: string[] = [];

  classListId: string = '';
  constructor(
    private studentService: StudentService,
    private classListService: ClassListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.classListId = this.route.snapshot.paramMap.get('id') || '';

    // this.getStudents();
    this.getStudentByClassId();
    this.getClassData();
  }
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Walk dog'];

  getClassData() {
    this.classListService.getById(this.classListId).subscribe((res: any) => {
      console.log('already added', res.classList[0].Students);
      this.addedStudents = res.classList[0].Students;
      this.addedStudents.forEach((student: any) => {
        console.log('callinf from loop ', student);
        this.oldstudents.push(student.id);
      });
    });
  }

  // getStudents() {
  //   this.studentService.getAll(1, 100, '', '').subscribe((res: any) => {
  //     this.availableStudents = res.data;
  //     // this.addedStudents = res.data
  //   });
  // }

  drop(event: CdkDragDrop<Student[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.addedStudents);
  }

  submit() {
    this.addedStudents.forEach((student) => {
      const studentId = student.id || '';

      this.students.push(studentId);
    });
    console.log(this.students, '---------', this.oldstudents);
    this.students.forEach((stu, index) => {
      this.oldstudents.forEach((old, newInd) => {
        if (old === stu) {
          console.log('found');
          this.students.splice(index, 1);
          this.oldstudents.splice(newInd, 1);
        }
      });
    });
    this.classListService
      .addStudentsToClass(this.classListId, {
        students: this.students,
      })
      .subscribe((res) => {
        console.log('students adds', res);
      });
    console.log(this.students, '-----%%%%----', this.oldstudents);
  }
  getStudentByClassId() {
    this.studentService.getByClass(this.classListId).subscribe((res: any) => {
      this.availableStudents = res.student;
      console.log('res of class list students ', res);
    });
  }
}

export interface addStudent {
  id?: string;
}
