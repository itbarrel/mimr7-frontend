import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassList, Organization } from 'src/app/shared/interfaces';
import { Location } from '@angular/common';
import { ClassListService } from '../services/class-list.service';
import { OrganizationService } from '../../organizations/services/organization.service';

@Component({
  selector: 'app-class-list-add',
  templateUrl: './class-list-add.component.html',
  styleUrls: ['./class-list-add.component.scss'],
})
export class ClassListAddComponent implements OnInit {
  classListId: string = '';
  name: string = '';
  organizationId: string = '';
  htmlText = '';
  hasFocus = false;
  update: boolean = false;
  organizations: Organization[] = [];

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'], // remove formatting button

        ['link'],
        //['link', 'image', 'video']
      ],
    },

    // mention: {
    //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    //   mentionDenotationChars: ['@', '#'],
    //   source: (searchTerm: any, renderList: any, mentionChar: any) => {
    //     let values;

    //     if (mentionChar === '@') {
    //       values = this.atValues;
    //     } else {
    //       values = this.hashValues;
    //     }

    //     if (searchTerm.length === 0) {
    //       renderList(values, searchTerm);
    //     } else {
    //       const matches = [];
    //       for (var i = 0; i < values.length; i++)
    //         if (
    //           ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
    //         )
    //           matches.push(values[i]);
    //       renderList(matches, searchTerm);
    //     }
    //   },
    // },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter: {
          key: 13,
          handler: (range: any, context: any) => {
            console.log('enter');
            return true;
          },
        },
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private classListService: ClassListService,
    private toastr: ToastrService,
    private _location: Location,
    private router: Router,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.checkParams();
    this.organizationService.getAll(1, 100, false, '').subscribe((res: any) => {
      console.log(res);
      this.organizations = res.data;
    });
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.classListId = this.route.snapshot.paramMap.get('id') || '';
      this.classListService
        .getById(String(this.classListId))
        .subscribe((res: any) => {
          this.name = res.classList.name;
          this.htmlText = res.classList.description;
          this.organizationId = res.classList.OrganizationId;
        });
    }
  }
  submit() {
    if (!this.name || this.name.length < 3) {
      this.toastr.error('Enter a valid Title');
    } else if (!this.htmlText || this.htmlText.length < 6) {
      this.toastr.error('Enter valid Content');
    } else if (!this.organizationId || this.organizationId.length < 6) {
      this.toastr.error('Select Valid Organization');
    } else {
      const contentData: ClassList = {
        name: this.name,
        description: this.htmlText,
        OrganizationId: this.organizationId,
      };
      if (!this.update) {
        this.classListService.add(contentData).subscribe((res) => {
          this.toastr.success('Added Sucessfully');
          this.htmlText = '';
          this.name = '';
          this.organizationId = ''
        });
      } else {
        this.classListService
          .update(this.classListId, contentData)
          .subscribe((res) => {
            this.toastr.success('Updated Sucessfully');
            this.htmlText = '';
            this.name = '';
          this.organizationId = ''
            this.router.navigateByUrl('/dashboard/home/classes');
          });
      }
    }
  }

  // checkParams() {
  //   if (this.route.snapshot.paramMap.get('edit')) {
  //     this.isUpdate = true;
  //     this.btnText = 'Update';
  //     this.classListId = this.route.snapshot.paramMap.get('id') || '';
  //     this.classListService
  //       .getById(String(this.classListId))
  //       .subscribe((res: any) => {
  //         console.log(res);
  //         this.collectionForm.patchValue({
  //           name: res.student.name,
  //           email: res.student.email,
  //           mobilePhone: res.student.mobilePhone,
  //         });
  //       });
  //   }
  // }

  // submit() {
  //   // console.log(this.collectionForm.valid, this.collectionForm.value);

  //   if (this.collectionForm.valid) {
  //     const { name, description,OrganizationId } = this.collectionForm.value;
  //     const organizationData: ClassList = {
  //       name,
  //       description,
  //       OrganizationId

  //     };
  //     if (!this.isUpdate) {
  //       this.classListService.add(organizationData).subscribe(
  //         (res: any) => {
  //           this.toastr.success('Student Added Sucessfully');
  //           this.collectionForm.patchValue({
  //             name: '',
  //             email: '',
  //             mobilePhone: '',
  //           });
  //         },
  //         (err: any) => {
  //           console.log(err);
  //         }
  //       );
  //     } else {
  //       this.classListService.update(this.classListId, organizationData).subscribe(
  //         (res: any) => {
  //           this.toastr.success('Student Updated Sucessfully');
  //           this._location.back()
  //         },
  //         (err: any) => {
  //           console.log(err);
  //         }
  //       );
  //     }
  //   }
  // }
}
