import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { DtoFilter } from 'Dto/DtoFilter';
import { DtoPage } from 'Dto/DtoPage';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public Users!: DtoFilter[];
  public teamLeads!: any[];
  public teamType!: any[];
  public current: string = 'Select Lead';
  public isLoading: boolean = false;
  public Roles!: any[];
  public filter: boolean = false;
  public showFilter: string = 'Choose Filter';
  public filters: string[] = ['Team', 'TeamLead'];
  public isActive!: string;
  public DateForm: FormGroup = new FormGroup({});
  constructor(
    public route: ActivatedRoute,
    private service: UserService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.withoutFilter();
    var roleData = { role: 'TeamLead' };
    this.service.getTeamLead(roleData).subscribe(
      (data) => {
        this.teamLeads = data;
      },
      (err) => {
        if (err.status == 401) this.authService.LogOut();
      }
    );

    this.service.getTeamType().subscribe((data) => (this.teamType = data));

    this.createForm();
  }
  createForm() {
    this.DateForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }
  get startDate() {
    return this.DateForm.get('startDate');
  }
  get endDate() {
    return this.DateForm.get('endDate');
  }
  populateEmpty(data: any) {
    data.forEach((x: any) => {
      if (x.teamName == null) x.teamName = 'Not Assigned';
      if (x.teamLead == null) x.teamLead = 'Not Assigned';
    });
  }
  withoutFilter() {
    this.service.WithoutFilter().subscribe((data) => {
      this.populateEmpty(data.result);
      this.filter = false;
      this.isActive = '';
      this.Users = data.result;
    });
  }

  dateFilter() {
    this.service.FilterByDate(this.DateForm.value).subscribe((data) => {
      this.filter = true;
      this.populateEmpty(data.result);
      this.Users = data.result;
    });
  }
  teamLeadFilter(lead: string) {
    this.isActive = lead;
    var teamLead: any = {
      teamLead: lead,
    };
    this.service.FilterByTeamLead(teamLead).subscribe((data) => {
      this.filter = true;
      this.populateEmpty(data.result);

      this.Users = data.result;
    });
  }
  teamFilter(teamName: string) {
    this.isActive = teamName;
    var team: any = {
      teamName: teamName,
    };
    this.service.FilterByTeam(team).subscribe((data) => {
      this.filter = true;
      this.populateEmpty(data.result);
      this.Users = data.result;
    });
  }
  active(data: string) {
    if (this.isActive == data) return true;
    else return false;
  }
}
