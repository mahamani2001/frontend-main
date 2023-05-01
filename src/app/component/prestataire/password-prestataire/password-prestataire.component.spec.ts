import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordPrestataireComponent } from './password-prestataire.component';

describe('PasswordPrestataireComponent', () => {
  let component: PasswordPrestataireComponent;
  let fixture: ComponentFixture<PasswordPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordPrestataireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
