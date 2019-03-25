import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAddButtonComponent } from './plans-add-button.component';

describe('PlansAddButtonComponent', () => {
  let component: PlansAddButtonComponent;
  let fixture: ComponentFixture<PlansAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
