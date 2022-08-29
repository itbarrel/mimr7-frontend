import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-edit-modal',
  templateUrl: './account-edit-modal.component.html',
  styleUrls: ['./account-edit-modal.component.scss'],
})
export class AccountEditModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AccountEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    console.log(';;;', this.data);
  }
}
