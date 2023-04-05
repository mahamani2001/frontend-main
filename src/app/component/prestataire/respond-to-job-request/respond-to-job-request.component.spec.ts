import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondToJobRequestComponent } from './respond-to-job-request.component';

describe('RespondToJobRequestComponent', () => {
  let component: RespondToJobRequestComponent;
  let fixture: ComponentFixture<RespondToJobRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondToJobRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespondToJobRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
