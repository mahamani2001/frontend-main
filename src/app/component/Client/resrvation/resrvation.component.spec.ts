import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResrvationComponent } from './resrvation.component';

describe('ResrvationComponent', () => {
  let component: ResrvationComponent;
  let fixture: ComponentFixture<ResrvationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResrvationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResrvationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
