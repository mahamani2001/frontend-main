import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaschboardClientComponent } from './daschboard-client.component';

describe('DaschboardClientComponent', () => {
  let component: DaschboardClientComponent;
  let fixture: ComponentFixture<DaschboardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaschboardClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaschboardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
