import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DtoTeam } from 'Dto/DtoTeam';
import { AdminService } from 'src/app/admin-service.service';
import { AuthenticationService } from 'src/app/authentication.service';

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
  public modalMessage!: string;
  public isLoading: boolean = false;
  public TeamUpdateForm: FormGroup = new FormGroup({});
  constructor(
    private service: AdminService,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    var roleData = { role: 'TeamLead' };
    this.service.getTeamLead(roleData).subscribe(
      (data) => {
        this.teamLeads = data;
      },
      (err) => {
        if (err.status == 401) this.authService.LogOut();
      }
    );
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
    this.service.getTeam(team).subscribe((data) => {
      this.team = data;
    });
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
    this.isLoading = true;
    this.service.assignUserToTeam(teamData).subscribe((data) => {
      if (data.statusCode == 200)
        this.modalMessage = 'User Added Successfully.';
      else if (data.statusCode == 208)
        this.modalMessage = 'User Already Added.';
      else this.modalMessage = 'Error Occered, Try again.';
      this.isLoading = false;
    });
  }
}
