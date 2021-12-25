import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AllUserDto } from 'Dto/AllUserDto';
import { DtoPage } from 'Dto/DtoPage';
import { DtoUpdateRole } from 'Dto/DtoupdateRole';

import { AdminService } from '../../admin-service.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css']
})
export class AdminControlPanelComponent implements OnInit {
  public Users!:AllUserDto[];
  public Roles!:any[];
  public updateData!:any;
  public isLoading:boolean = true;
  public newRole:string = "Select Role";
  public length!:number;
  public pageSize:number = 5;

  constructor(private service: AdminService,public route:ActivatedRoute) { 

  }
  
  ngOnInit(): void {
  
    this.service.getAllRole().subscribe(data=>
      {
        this.Roles = data
      });
      this.service.getLength().subscribe(data=>this.length = +data);
      var page:DtoPage={
        page:0,
        noOfData:this.pageSize
      }
     this.service.getAllUser(page).subscribe(data=>
        {
          this.isLoading = false;
          this.Users = data;
        });
  }
  updateRoleData(data:any){
    this.updateData = data;
    if(data.role != null)
    this.newRole = data.role;
    else
    this.newRole = "Select Role"
  }
  setRole(data:any){
    this.newRole = data
    console.log(this.newRole);
  }
  updateRole(){
    var userData:DtoUpdateRole = {
      userName :  this.updateData.userName,
      newRole :  this.newRole,
      oldRole:  this.updateData.role
    }
    console.log(userData);
  }
  onPageChange(event:PageEvent){
    var page:DtoPage={
      page:event.pageIndex,
      noOfData:event.pageSize
    }
   this.service.getAllUser(page).subscribe(data=>
      {
        this.Users = data;
      });
  }
  deleteUser(userDaat:any){
  }
}
