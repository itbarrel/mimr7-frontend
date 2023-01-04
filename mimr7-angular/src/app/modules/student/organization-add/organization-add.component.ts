import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organization } from 'src/app/shared/interfaces';
import { Location } from '@angular/common';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-add.component.html',
  styleUrls: ['./organization-add.component.scss'],
})
export class OrganizationAddComponent implements OnInit {
  isUpdate: boolean = false;
  organizationId: string = '';

  collectionForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  btnText: string = 'Add';

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.isUpdate = true;
      this.btnText = 'Update';
      this.organizationId = this.route.snapshot.paramMap.get('id') || '';
      this.organizationService
        .getById(String(this.organizationId))
        .subscribe((res: any) => {
          console.log(res);
          this.collectionForm.patchValue({
            name: res.organization.name,
            city: res.organization.city,
          });
        });
    }
  }

  submit() {
    // console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { name, city } = this.collectionForm.value;
      const organizationData: Organization = {
        name,
        city,
      };
      if (!this.isUpdate) {
        this.organizationService.addOrganization(organizationData).subscribe(
          (res: any) => {
            this.toastr.success('Student Added Sucessfully');
            this.collectionForm.patchValue({
              name: '',
              city: '',
            });
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.organizationService
          .updateOrganization(this.organizationId, organizationData)
          .subscribe(
            (res: any) => {
              this.toastr.success('Student Updated Sucessfully');
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
