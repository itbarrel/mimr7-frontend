import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection, CollectionLibrary } from 'src/app/shared/interfaces';
import { CollectionService } from '../../collections/services/collections.service';
import { CollectionLibraryService } from '../services/collectionslibrary.services';

@Component({
  selector: 'app-collectionslibrary-add',
  templateUrl: './collectionslibrary-add.component.html',
  styleUrls: ['./collectionslibrary-add.component.scss']
})
export class CollectionslibraryAddComponent implements OnInit {

  isUpdate: boolean = false;
  highlightId: string = '';
  collectionForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    parentId: new FormControl(null, []),
    description: new FormControl('', []),
  });

  btnText: string = 'Add';

  collections: Collection[] = [];

  constructor(
    private collectionService: CollectionService,
    private collectionLibraryService : CollectionLibraryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('eeee', this.route.snapshot.paramMap.get('edit'));
    this.collectionService.getAll(1, 100, '', '').subscribe((res: any) => {
      console.log('all collections', res);
      this.collections = res.data;
    });
    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.isUpdate = true;
      this.btnText = 'Update';
      this.highlightId = this.route.snapshot.paramMap.get('id') || '';
      this.collectionLibraryService
        .geById(String(this.highlightId))
        .subscribe((res: any) => {
          console.log('aaaaaaaaaaaaaaaaaaaaaaa',res);
          this.collectionForm.patchValue({
            title: res.collectionLibrary.title,
            parentId: res.collectionLibrary.parentId,
            description: res.collectionLibrary.description,
          });
        });
    }
  }

  submit() {
    console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { title,parentId, description } =
        this.collectionForm.value;
      const organizationData: CollectionLibrary = {
        title,
        parentId,
        description,
      };
      if (!this.isUpdate) {
        this.collectionLibraryService.add(organizationData).subscribe(
          (res: any) => {
            this.router.navigateByUrl('/dashboard/collectionslibrary');
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.collectionLibraryService
          .update(this.highlightId, organizationData)
          .subscribe(
            (res: any) => {
              this.router.navigateByUrl('/dashboard/collectionslibrary');
            },
            (err: any) => {
              console.log(err);
            }
          );
      }
    }
  }
}
