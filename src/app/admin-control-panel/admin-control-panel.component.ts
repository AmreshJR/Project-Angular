import { Component, OnInit } from '@angular/core';
import { AllUserDto } from 'Dto/AllUserDto';
import { DtoUpdateRole } from 'Dto/DtoupdateRole';

import { AdminService } from '../admin-service.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css']
})
export class AdminControlPanelComponent implements OnInit {
  public Users!:AllUserDto[];
  public Roles!:any[];
  public updateData!:any;
  public newRole:string = "Select Role";
  constructor(private service: AdminService) { 

  }
  
  ngOnInit(): void {
    this.service.getAllUser().subscribe(data=>this.Users = data);
    this.service.getAllRole().subscribe(data=>this.Roles = data);
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

  deleteUser(userDaat:any){
  }
}
