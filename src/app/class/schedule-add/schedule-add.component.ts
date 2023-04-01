import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

import { ToastrService } from 'ngx-toastr';
import {
  Schedule,
  Content,
  Organization,
  ClassList,
} from 'src/app/shared/interfaces';
// import { classService } from '../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ClassService } from '../services/class.service';
import { ScheduleService } from '../services/schedule.service';
import { OrganizationService } from 'src/app/account-organization/services/account-organization.service';
import { ClassService } from '../services/class.service';
import { ContentService } from 'src/app/content/services/content.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.scss'],
})
export class ScheduleAddComponent {
  update: boolean = false;
  scheduleId: string = '';
  organizations: Organization[] = [];
  contents: Content[] = [];
  classes: ClassList[] = [];
  startDate: Date;
  endDate: Date;

  minStartDate = new Date();
  minEndDate: Date;

  collectionForm: FormGroup = new FormGroup({
    ClassListId: new FormControl('', [Validators.required]),
    OrganizationId: new FormControl('', [Validators.required]),
    ContentId: new FormControl('', [Validators.required]),
  });

  btnText: string = 'Add';

  constructor(
    private scheduleService: ScheduleService,
    private contentService: ContentService,
    private classService: ClassService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('eeee', this.route.snapshot.paramMap.get('edit'));

    this.contentService
      .getAll({ offset: 0, limit: 100 }, '')
      .subscribe((res: any) => {
        this.contents = res.data;
      });
    this.organizationService
      .getAll({ offset: 0, limit: 100 }, '')
      .subscribe((res: any) => {
        this.organizations = res.data;
      });

    this.classService
      .getAll({ offset: 0, limit: 100 }, '')
      .subscribe((res: any) => {
        this.classes = res.data;
      });

    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.btnText = 'Update';
      this.scheduleId = this.route.snapshot.paramMap.get('id') || '';
      this.scheduleService
        .getById(String(this.scheduleId))
        .subscribe((res: any) => {
          console.log('aaaaaaaaaaaaaaaaaaaaaaa', res);
          //add dates
          this.startDate = res.ClassListSchedule.startDate;
          this.endDate = res.ClassListSchedule.endDate;
          this.collectionForm.patchValue({
            ClassListId: res.ClassListSchedule.ClassListId,
            OrganizationId: res.ClassListSchedule.OrganizationId,
            ContentId: res.ClassListSchedule.ContentId,
          });
          this.minEndDate = new Date(this.startDate)
        });
    }
  }

  submit() {
    console.log(this.endDate, this.startDate);

    if (!this.startDate && !this.endDate) {
      this.toastr.error('Enter Valid dates');
    } else if (
      moment(this.endDate).isBefore(moment(this.startDate)) ||
      moment(this.endDate).isSame(moment(this.startDate))
    ) {
      this.toastr.error(`End date should be greater than start date`);
    } else if (this.collectionForm.valid) {
      const { ClassListId, OrganizationId, ContentId } =
        this.collectionForm.value;
      const locationData: Schedule = {
        ClassListId,
        OrganizationId,
        ContentId,
        endDate: moment(this.endDate).toISOString(),
        startDate: moment(this.startDate).toISOString(),
        //add dates
      };
      if (!this.update) {
        this.scheduleService.add(locationData).subscribe(
          (res: any) => {
            this.toastr.success('Schedule Added');
            this.router.navigateByUrl('/dashboard/classes/schedule');
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.scheduleService.update(this.scheduleId, locationData).subscribe(
          (res: any) => {
            this.toastr.success('Schedule Updated');

            this.router.navigateByUrl('/dashboard/classes/schedule');
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    }
  }

  startDateChange(event: MatDatepickerInputEvent<Date>) {
    this.minEndDate = moment(event.target.value).add(1, 'days').toDate();
    console.log(
      '🚀 ~ file: schedule-add.component.ts:143 ~ ScheduleAddComponent ~ startDateChange ~ this.minEndDate:',
      this.minEndDate
    );
    // this.events.push(`${type}: ${event.value}`);
  }
}
