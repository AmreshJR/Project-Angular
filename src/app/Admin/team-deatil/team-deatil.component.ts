import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DtoTeam } from 'Dto/DtoTeam';
import { AdminService } from 'src/app/admin-service.service';

@Component({
  selector: 'app-team-deatil',
  templateUrl: './team-deatil.component.html',
  styleUrls: ['./team-deatil.component.css'],
})
export class TeamDeatilComponent implements OnInit {
  public team!: any[];
  public teamLeads!: any[];
  public teamType!: any[];
  public EmployeeList!: any[];
  public edit: boolean = false;
  public show!: boolean;
  public current: string = 'Select Lead';
  public TeamUpdateForm: FormGroup = new FormGroup({});
  constructor(private service: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    var roleData = { role: 'TeamLead' };
    this.service.getTeamLead(roleData).subscribe((data) => {
      this.teamLeads = data;
    });
    this.createForm();
  }
  createForm() {
    this.service.getInactive().subscribe((data) => {
      this.EmployeeList = data;
    });
    this.service.getTeamType().subscribe((data) => (this.teamType = data));
    this.TeamUpdateForm = this.fb.group({
      userId: [[0], [Validators.required, Validators.min(1)]],
      assignedTOUser: [[0], [Validators.required, Validators.min(1)]],
      statusId: [1, [Validators.required]],
      teamTypeId: [0, [Validators.required, Validators.min(1)]],
    });
  }
  setTeamLead(name: string) {
    this.current = name;
    this.showDetail();
  }
  showDetail() {
    this.show = true;
    var team = { leadName: this.current };
    this.service
      .getTeam(team)
      .subscribe((data) => console.log((this.team = data)));
  }
  displayEdit() {
    this.edit = true;
  }
  sendTeamData() {
    var teamData: DtoTeam = {
      userId: +this.TeamUpdateForm.value.userId,
      assignedTOUser: this.TeamUpdateForm.value.assignedTOUser,
      statusId: this.TeamUpdateForm.value.statusId,
      teamTypeId: +this.TeamUpdateForm.value.teamTypeId,
    };
    console.log(teamData);
    this.service.assignUserToTeam(teamData).subscribe((data) => {
      console.log(data);
    });
  }
}
