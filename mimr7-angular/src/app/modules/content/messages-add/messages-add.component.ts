import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/shared/interfaces';
import { MessageService } from '../services/message.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

// import {  } from '../services/collections.service';

@Component({
  selector: 'app-messages-add',
  templateUrl: './messages-add.component.html',
  styleUrls: ['./messages-add.component.scss'],
})
export class MessagesAddComponent implements OnInit {
  isUpdate: boolean = false;
  messageId: string = '';
  contentId: string = '';
  highlightId: string = '';
  collectionForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    hint: new FormControl('', [Validators.required, Validators.minLength(3)]),
    solution: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  btnText: string = 'Add';

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id') || '';
    this.highlightId = this.route.snapshot.paramMap.get('hid') || '';
    console.log('eeee', this.route.snapshot.paramMap.get('edit'));
    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.isUpdate = true;
      this.btnText = 'Update';
      this.messageId = this.route.snapshot.paramMap.get('mid') || '';
      this.messageService
        .getById(String(this.messageId))
        .subscribe((res: any) => {
          console.log(res);
          this.collectionForm.patchValue({
            name: res.message.name,
            hint: res.message.hint,
            solution: res.message.solution,
          });
        });
    }
  }

  submit() {
    // console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { name, hint, solution } = this.collectionForm.value;
      const organizationData: Message = {
        name,
        hint,
        solution,
        ContentId: this.contentId,
        HighlightId: this.highlightId,
      };
      if (!this.isUpdate) {
        this.messageService.add(organizationData).subscribe(
          (res: any) => {
            this.toastr.success('Message Added Sucessfully');
            this.collectionForm.patchValue({
              name: '',
              hint: '',
              solution: '',
            });
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.messageService.update(this.messageId, organizationData).subscribe(
          (res: any) => {
            this.toastr.success('Message Updated Sucessfully');
            this._location.back();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    }
  }
}
