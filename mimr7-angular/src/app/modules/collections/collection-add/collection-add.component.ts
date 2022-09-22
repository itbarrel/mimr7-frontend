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
  collectionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    text: new FormControl('', []),
    type: new FormControl('', []),
    kind: new FormControl('', []),
    private: new FormControl(false, []),
    saleable: new FormControl(false, []),
    description: new FormControl('', []),
  });

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.collectionForm.valid, this.collectionForm.value);

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
      this.collectionService.addCollection(organizationData).subscribe(
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
