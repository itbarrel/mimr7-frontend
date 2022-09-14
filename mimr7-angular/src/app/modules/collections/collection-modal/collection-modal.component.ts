import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Collection } from 'src/app/shared/interfaces';
import { CollectionService } from '../services/collections.service';
@Component({
  selector: 'app-collection-modal',
  templateUrl: './collection-modal.component.html',
  styleUrls: ['./collection-modal.component.scss']
})
export class CollectionModalComponent implements OnInit {
  // title: String;
  // text?:String;
  // type?:String;
  // kind?:String;
  // private?:boolean;
  // saleable?:boolean;
  collectionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    text: new FormControl('', []),
    type: new FormControl('', []),
    kind: new FormControl('', []),
    private: new FormControl(false, []),
    saleable: new FormControl(false, []),
    description: new FormControl('', []),
  });
  buttonText: String = 'Add';
  update: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CollectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.collectionForm.patchValue({
        title: this.data.title,
        text: this.data.text,
        type: this.data.type,
        kind: this.data.kind,
        private: this.data.private,
        saleable: this.data.saleable,
        description: this.data.description
      });
      this.buttonText = 'Update';
      this.update = true;
    }
  }

  submit() {
    console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { title,text,type,kind,saleable,description } = this.collectionForm.value;
      const organizationData: any = {
        title,
        text,
        type,
        kind,
        private: this.collectionForm.value.private,
        saleable,
        description
      };
      if (!this.update) {
        this.collectionService.addCollection(organizationData).subscribe(
          (res: any) => {
            this.dialogRef.close({ success: true });
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        console.log('update called',this.data);
        this.collectionService.updateCollection(this.data.id,organizationData).subscribe(
          (res: any) => {
            this.dialogRef.close({ success: true });
          },
          (err: any) => {
            console.log(err);
          }
        )
      }
    }
  }

}
