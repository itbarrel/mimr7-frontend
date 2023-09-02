import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/shared/interfaces';
import { LocationService } from '../services/location.service';
@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent {
  update: boolean = false;
  locationId: string = '';
  
  collectionForm: FormGroup = new FormGroup({
    address1: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    address2: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    address3: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    mobilePhone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    officePhone: new FormControl('', [Validators.required,Validators.minLength(11)]),
  });

  btnText: string = 'Add';


  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('eeee', this.route.snapshot.paramMap.get('edit'));
    
    this.checkParams();
  }

  checkParams() {
    if (this.route.snapshot.paramMap.get('edit')) {
      this.update = true;
      this.btnText = 'Update';
      this.locationId = this.route.snapshot.paramMap.get('id') || '';
      this.locationService
        .getLocationById(String(this.locationId))
        .subscribe((res: any) => {
          console.log('aaaaaaaaaaaaaaaaaaaaaaa',res);
          this.collectionForm.patchValue({
            address1: res.location.address1,
            address2:res.location.address2,
            address3:res.location.address3,
            city:res.location.city,
            country:res.location.country,
            location:res.location.location,
            mobilePhone:res.location.mobilePhone,
            officePhone:res.location.officePhone,
            state:res.location.state,
            type:res.location.type
          });
        });
    }
  }

  submit() {
    console.log(this.collectionForm.valid, this.collectionForm.value);

    if (this.collectionForm.valid) {
      const { address1,
        address2,
        address3,
        city,
        country,
        location,
        mobilePhone,
        officePhone,
        state,
        type } =
        this.collectionForm.value;
      const locationData: Location = {
       address1,
       address2,
       address3,
       city,
       country,
       location,
       mobilePhone,
       officePhone,
       state,
       type
      };
      if (!this.update) {
        this.locationService.addLocation(locationData).subscribe(
          (res: any) => {
            this.router.navigateByUrl('/dashboard/locations');
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        this.locationService
          .updateLocation(this.locationId, locationData)
          .subscribe(
            (res: any) => {
              this.router.navigateByUrl('/dashboard/locations');
            },
            (err: any) => {
              console.log(err);
            }
          );
      }
    }
  }
}
