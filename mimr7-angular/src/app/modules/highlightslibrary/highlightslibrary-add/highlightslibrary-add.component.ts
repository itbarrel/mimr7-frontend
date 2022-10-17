import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Highlight, HighlightLibrary } from 'src/app/shared/interfaces';
import { HighlightService } from '../../highlights/services/highlights.services';
import { HighlightLibraryService } from '../services/highlightlibrary.services';
@Component({
  selector: 'app-highlightslibrary-add',
  templateUrl: './highlightslibrary-add.component.html',
  styleUrls: ['./highlightslibrary-add.component.scss']
})
export class HighlightslibraryAddComponent implements OnInit {
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

  highlights: Highlight[] = [];

  constructor(
    private highlightService: HighlightService,
    private highlightLibraryService : HighlightLibraryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('eeee', this.route.snapshot.paramMap.get('edit'));
    this.highlightService.getAll(1, 100, '', '').subscribe((res: any) => {
      console.log('all collections', res);
      this.highlights = res.data;
    });
    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.isUpdate = true;
      this.btnText = 'Update';
      this.highlightId = this.route.snapshot.paramMap.get('id') || '';
      this.highlightLibraryService
        .geById(String(this.highlightId))
        .subscribe((res: any) => {
          console.log('aaaaaaaaaaaaaaaaaaaaaaa',res);
          this.collectionForm.patchValue({
            title: res.highlightLibrary.title,
            parentId: res.highlightLibrary.parentId,
            description: res.highlightLibrary.description,
          });
        });
    }
  }

  submit() {
    console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { title,parentId, description } =
        this.collectionForm.value;
      const organizationData: HighlightLibrary = {
        title,
        parentId,
        description,
      };
      if (!this.isUpdate) {
        this.highlightLibraryService.add(organizationData).subscribe(
          (res: any) => {
            this.router.navigateByUrl('/dashboard/highlightslibrary');
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.highlightLibraryService
          .update(this.highlightId, organizationData)
          .subscribe(
            (res: any) => {
              this.router.navigateByUrl('/dashboard/highlightslibrary');
            },
            (err: any) => {
              console.log(err);
            }
          );
      }
    }
  }
}
