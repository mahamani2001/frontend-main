import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererutilisateurComponent } from './gererutilisateur.component';

describe('GererutilisateurComponent', () => {
  let component: GererutilisateurComponent;
  let fixture: ComponentFixture<GererutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererutilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
