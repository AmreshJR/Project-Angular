import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeatilComponent } from './team-deatil.component';

describe('TeamDeatilComponent', () => {
  let component: TeamDeatilComponent;
  let fixture: ComponentFixture<TeamDeatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamDeatilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDeatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
