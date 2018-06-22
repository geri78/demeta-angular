import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FDashboardComponent } from './fdashboard.component';

describe('DashboardComponent', () => {
  let component: FDashboardComponent;
  let fixture: ComponentFixture<FDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
