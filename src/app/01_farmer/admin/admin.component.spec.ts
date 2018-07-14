import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: FAdminComponent;
  let fixture: ComponentFixture<FAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
