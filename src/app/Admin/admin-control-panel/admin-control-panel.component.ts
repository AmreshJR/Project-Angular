import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AllUserDto } from 'Dto/AllUserDto';
import { DtoPage } from 'Dto/DtoPage';
import { DtoUpdateRole } from 'Dto/DtoupdateRole';
import { AuthenticationService } from 'src/app/authentication.service';

import { AdminService } from '../../admin-service.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css'],
})
export class AdminControlPanelComponent implements OnInit {
  public Users!: AllUserDto[];
  public isLoading: boolean = true;
  public Roles!: any[];
  public length!: number;
  public pageSize: number = 5;
  public ImageUrl: string = '';
  public EditdetailForm: FormGroup = new FormGroup({});

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.service.getAllRole().subscribe((data) => {
      this.Roles = data;
    });
    this.service.getLength().subscribe((data) => (this.length = +data));
    var page: DtoPage = {
      page: 0,
      noOfData: this.pageSize,
    };
    this.service.getAllUser(page).subscribe(
      (data) => {
        this.isLoading = false;
        this.Users = data;
      },
      (err) => {
        if (err.status == 401) this.authService.LogOut();
      }
    );
    this.authService.getUserProfile().subscribe(
      (data) => {
        this.ImageUrl = `https://localhost:44362/${data.dbPath}`;
        this.isLoading = false;
      },
      (err) => {
        this.ImageUrl =
          '../assets/78-785827_user-profile-avatar-login-account-male-user-icon.png';
      }
    );
    this.createForm();
  }
  onModelUpdate(userData: any) {
    this.EditdetailForm.controls['userName'].setValue(userData.userName);
    this.EditdetailForm.controls['newRole'].setValue(userData.role);
    this.EditdetailForm.controls['email'].setValue(userData.email);
    this.EditdetailForm.controls['authId'].setValue(userData.authId);
    this.EditdetailForm.controls['oldRole'].setValue(userData.role);
  }
  createForm() {
    this.EditdetailForm = this.fb.group({
      userName: ['', [Validators.required]],
      oldRole: ['', [Validators.required]],
      newRole: ['', [Validators.required]],
      email: ['', [Validators.required]],
      authId: ['', [Validators.required]],
    });
  }
  submitUpdate() {
    this.service.updateUserData(this.EditdetailForm.value).subscribe((data) => {
      console.log(data);
      if ((data.status = true)) '';
      else '';
    });
  }

  onPageChange(event: PageEvent) {
    var page: DtoPage = {
      page: event.pageIndex,
      noOfData: event.pageSize,
    };
    this.service.getAllUser(page).subscribe((data) => {
      this.Users = data;
    });
  }
  logout() {
    this.authService.LogOut();
  }
}
