import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbiltyComponent } from './abilty.component';

describe('AbiltyComponent', () => {
  let component: AbiltyComponent;
  let fixture: ComponentFixture<AbiltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbiltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbiltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
