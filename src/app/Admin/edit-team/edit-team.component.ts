import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-service.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  public teamLeads!:any[];
  public inactive!:any[];
  public selectedEmployee:string="Select Employee"
  public current:string = "Select Lead";
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    var roleData = {role:"TeamLead"};
    this.service.getTeamLead(roleData).subscribe(
      (data)=>
      {
        this.teamLeads=data
      });
      this.service.getInactive().subscribe(data=>this.inactive=data)
  }
  setTeamLead(data:any){
    this.current = data.userName;
  }
  setEmployee(data:any){
    this.selectedEmployee = data.userName;
  }

}
