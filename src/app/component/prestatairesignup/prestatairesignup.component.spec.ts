import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesignupComponent } from './prestatairesignup.component';

describe('PrestatairesignupComponent', () => {
  let component: PrestatairesignupComponent;
  let fixture: ComponentFixture<PrestatairesignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestatairesignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestatairesignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
