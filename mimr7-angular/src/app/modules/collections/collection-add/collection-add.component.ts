import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/shared/interfaces';
import { CollectionService } from '../services/collections.service';

@Component({
  selector: 'app-collection-add',
  templateUrl: './collection-add.component.html',
  styleUrls: ['./collection-add.component.scss'],
})
export class CollectionAddComponent implements OnInit {
  isUpdate: boolean = false;
  collectionId: string = '';
  collectionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    text: new FormControl('', []),
    type: new FormControl('', []),
    kind: new FormControl('', []),
    private: new FormControl(false, []),
    saleable: new FormControl(false, []),
    description: new FormControl('', []),
  });

  btnText: string = 'Add';

  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('eeee', this.route.snapshot.paramMap.get('edit'));
    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.isUpdate = true;
      this.btnText = 'Update';
      this.collectionId = this.route.snapshot.paramMap.get('id') || '';
      this.collectionService
        .getCollectionById(String(this.collectionId))
        .subscribe((res: any) => {
          console.log(res);
          this.collectionForm.patchValue({
            title: res.collection.title,
            text: res.collection.text,
            type: res.collection.type,
            kind: res.collection.kind,
            private: res.collection.private,
            saleable: res.collection.saleable,
            description: res.collection.description,
          });
        });
    }
  }

  submit() {
    // console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { title, kind, text, saleable, type, description } =
        this.collectionForm.value;
      const organizationData: Collection = {
        title,
        kind,
        text,
        saleable,
        type,
        description,
        private: this.collectionForm.value.private,
      };
      if (!this.isUpdate) {
        this.collectionService.addCollection(organizationData).subscribe(
          (res: any) => {
            this.router.navigateByUrl('/dashboard/collections');
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.collectionService
          .updateCollection(this.collectionId, organizationData)
          .subscribe(
            (res: any) => {
              this.router.navigateByUrl('/dashboard/collections');
            },
            (err: any) => {
              console.log(err);
            }
          );
      }
    }
  }
}
