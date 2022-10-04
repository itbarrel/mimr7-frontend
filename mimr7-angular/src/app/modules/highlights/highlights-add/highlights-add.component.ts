import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection, Highlight } from 'src/app/shared/interfaces';
import { CollectionService } from '../../collections/services/collections.service';
import { HighlightService } from '../services/highlights.services';

@Component({
  selector: 'app-highlights-add',
  templateUrl: './highlights-add.component.html',
  styleUrls: ['./highlights-add.component.scss'],
})
export class HighlightsAddComponent implements OnInit {
  isUpdate: boolean = false;
  highlightId: string = '';
  collectionForm: FormGroup = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    order: new FormControl('', []),
    collection: new FormControl(null, []),
    description: new FormControl('', []),
  });

  btnText: string = 'Add';

  collections: Collection[] = [];

  constructor(
    private highlightService: HighlightService,
    private collectionService: CollectionService,
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
      this.highlightService
        .getHighlightById(String(this.highlightId))
        .subscribe((res: any) => {
          console.log('aaaaaaaaaaaaaaaaaaaaaaa',res);
          this.collectionForm.patchValue({
            content: res.highlight.content,
            order: res.highlight.order,
            collection: res.highlight.CollectionId,
            description: res.highlight.description,
          });
        });
    }
  }

  submit() {
    console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { content, order, collection, description } =
        this.collectionForm.value;
      const organizationData: Highlight = {
        content,
        order,
        CollectionId: collection,
        description,
      };
      if (!this.isUpdate) {
        this.highlightService.addHighlight(organizationData).subscribe(
          (res: any) => {
            this.router.navigateByUrl('/dashboard/highlights');
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.highlightService
          .updateHighlight(this.highlightId, organizationData)
          .subscribe(
            (res: any) => {
              this.router.navigateByUrl('/dashboard/highlights');
            },
            (err: any) => {
              console.log(err);
            }
          );
      }
    }
  }
}
