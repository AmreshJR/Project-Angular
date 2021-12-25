import { Component, OnInit } from '@angular/core';
import { DtoTeam } from 'Dto/DtoTeam';
import { AdminService } from 'src/app/admin-service.service';

@Component({
  selector: 'app-team-deatil',
  templateUrl: './team-deatil.component.html',
  styleUrls: ['./team-deatil.component.css']
})
export class TeamDeatilComponent implements OnInit {
  public teamLeads!:any[];
  public teamList!:any[];
  public current:string = "Select Lead";
  public team!:any[];
  public show!:boolean;
  public inactive!:any[];
  public selectedEmployee:string="Select Employee"
  public currentEmployee:string = "Select Lead";
  public edit:boolean = false;
  public selectedTeam:String="Select Team";
  public leadData:any;
  public teamData:any;
  public teamTypeData:any;
  public flag1:boolean = false;
  public flag2:boolean = false;
  public flag3:boolean = false;
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    var roleData = {role:"TeamLead"};
    this.service.getTeamLead(roleData).subscribe(
      (data)=>
      {
        this.teamLeads=data
      });
      this.service.getInactive().subscribe(data=>this.inactive=data)
      this.service.getTeamType().subscribe(data=>this.teamList=data)
  }
  
  setTeamLead(name:string){
    this.current = name;
    this.showDetail();
  }
  setLead(data:any){
    this.currentEmployee = data.userName;
    this.leadData = data;
    this.flag1 = true;
  }
  setEmployee(data:any){
    this.selectedEmployee = data.userName;
    this.teamData=data;
    this.flag2 = true;
  }
  showDetail(){
    this.show= true;
    var team= {leadName:this.current}
    this.service.getTeam(team).subscribe(data=>console.log(this.team=data));
  }
  displayEdit(){
    this.edit=true;
  }
  setTeam(data:any){
    this.selectedTeam= data.teamName
    this.teamTypeData = data;
    this.flag3 = true;
  }
  sendTeamData(){
    var team:DtoTeam = {
      userId : this.teamData.userId,
      assignedTOUser: this.leadData.userName,
      statusId: 1,
      teamTypeId: this.teamTypeData.teamId
    }
    this.selectedEmployee = "Select Employee"
    this.selectedTeam = "Select Team";
    this.currentEmployee = "Select Lead";
    console.log(team);
    this.flag1 = false;
    this.flag2 = false;
    this.flag3 = false
  }
}
