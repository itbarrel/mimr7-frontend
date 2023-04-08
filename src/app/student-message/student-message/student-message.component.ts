import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Message, Student } from 'src/app/shared/interfaces';
import { MessageScheduleService } from '../services/message-schedule.service';

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
    private route: ActivatedRoute
  ) {
    super();
  }
  ngOnInit() {
    console.log('Onint dalll');
    this.hash = this.route.snapshot.paramMap.get('hash') || '';
    this.messageScheduleService.getByHash(this.hash).subscribe((res: any) => {
      this.message = res.message;
      this.student = res.student;
    });
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    console.log(this.authForm);
  }
}
