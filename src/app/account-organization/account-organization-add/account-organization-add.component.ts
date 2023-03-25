import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Organization } from 'src/app/shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../services/account-organization.service';
// import { organizationService } from '../services/message.service';
@Component({
  selector: 'app-account-organization-add',
  templateUrl: './account-organization-add.component.html',
  styleUrls: ['./account-organization-add.component.scss']
})
export class AccountOrganizationAddComponent {

  hasFocus = false;
  name: string = '';
  city: string = '';
  update: boolean = false;
  organizationId:string=''

  @Output() cancel = new EventEmitter<string>();
  id: string = '';

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.organizationId = this.route.snapshot.paramMap.get('id') || '';
    this.checkParams();
  }
  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;

      this.organizationService
        .getById(String(this.organizationId))
        .subscribe((res: any) => {
          // patch values in the form
          this.name = res.organization.name;
          this.city = res.organization.city
        });
    }
  }
  submit() {
    if (!this.name || this.name.length < 3) {
      this.toastr.error('Enter a valid Organization Name');
    }else if (!this.city || this.city.length < 3) {
      this.toastr.error('Enter valid City');
    } else {
      const contentData: Organization = {
        name: this.name,
        city: this.city,

      };
      if (!this.update) {
        this.organizationService.addOrganization(contentData).subscribe((res) => {
          this.toastr.success('Added Sucessfully');
          this.name = '';
          this.city = '';
        });
      } else {
        this.organizationService.updateOrganization(this.organizationId, contentData)
          .subscribe((res) => {
            this.toastr.success('Updated Sucessfully');
            this.name = '';
            this.city = '';

            this.router.navigateByUrl(
              `/dashboard/organizations`
            );
          });
      }
    }
  }
}
