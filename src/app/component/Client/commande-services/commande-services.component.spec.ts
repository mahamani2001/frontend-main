import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeServicesComponent } from './commande-services.component';

describe('CommandeServicesComponent', () => {
  let component: CommandeServicesComponent;
  let fixture: ComponentFixture<CommandeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
