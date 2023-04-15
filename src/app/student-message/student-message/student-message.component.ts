import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Message, Student } from 'src/app/shared/interfaces';
import { MessageScheduleService } from '../services/message-schedule.service';
import { MessageAnswer } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import {
  MatDialog,
} from '@angular/material/dialog';
@Component({
  selector: 'app-student-message',
  templateUrl: './student-message.component.html',
  styleUrls: ['./student-message.component.scss'],
})
export class StudentMessageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  hash: string = '';
  student: Student = {
    email: '',
    mobilePhone: '',
    name: '',
  };
  messageScheduleId: string = '';
  message: Message = {
    hint: '',
    name: '',
    solution: '',
  };

  authForm: FormGroup = new FormGroup({
    answer: new FormControl('', Validators.required),
  });
  constructor(
    private messageScheduleService: MessageScheduleService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    super();
  }
  ngOnInit() {
    console.log('Onint dalll');
    this.hash = this.route.snapshot.paramMap.get('hash') || '';
    this.messageScheduleService.getByHash(this.hash).subscribe((res: any) => {
      console.log(
        '🚀 ~ file: student-message.component.ts:52 ~ this.messageScheduleService.getByHash ~ res:',
        res
      );
      this.message = res.message;
      this.student = res.student;
      this.messageScheduleId = res.messageScheduleId;
    });
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    console.log(this.authForm.valid, this.authForm.value);
    if (this.authForm.valid) {
      const { answer } = this.authForm.value;
      const answerData: MessageAnswer = {
        AccountId: this.student.AccountId || '',
        MessageScheduleId: this.messageScheduleId,
        StudentId: this.student.id || '',
        response: answer,
      };

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure want to submit the answer?',
          buttonText: {
            ok: 'submit',
            cancel: 'No',
          },
        },
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.messageScheduleService
            .submitAnswer(answerData)
            .subscribe((res) => {
              this.toastr.success('Answer Submitted Sucessfully');
              this.authForm.disable();
            });
        }
      });
    }
  }
}
