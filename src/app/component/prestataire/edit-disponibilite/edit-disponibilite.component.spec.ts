import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisponibiliteComponent } from './edit-disponibilite.component';

describe('EditDisponibiliteComponent', () => {
  let component: EditDisponibiliteComponent;
  let fixture: ComponentFixture<EditDisponibiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisponibiliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDisponibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
