import { Component } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-students-answer',
  templateUrl: './students-answer.component.html',
  styleUrls: ['./students-answer.component.scss']
})
export class StudentsAnswerComponent {

  scheduleId:string=''
  studentId:string=''
  messages:any=[]
  constructor(private scheduleService: ScheduleService,private route: ActivatedRoute){

  }
ngOnInit(){
  this.scheduleId = this.route.snapshot.paramMap.get('id') || '';
  console.log("🚀 ~ file: students-answer.component.ts:19 ~ StudentsAnswerComponent ~ ngOnInit ~ this.scheduleId:", this.scheduleId)
  this.studentId = this.route.snapshot.paramMap.get('sid') || '';
  console.log("🚀 ~ file: students-answer.component.ts:20 ~ StudentsAnswerComponent ~ ngOnInit ~ this.studentId:", this.studentId)
  this.getAllData()
}


getAllData(){
  this.scheduleService.getStudentMessagesInSchedule(this.studentId,this.scheduleId).subscribe(res=>{
    console.log(res)

    this.messages = res
  })
}

}
