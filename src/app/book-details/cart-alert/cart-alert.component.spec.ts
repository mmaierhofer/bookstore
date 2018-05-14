import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAlertComponent } from './cart-alert.component';

describe('CartAlertComponent', () => {
  let component: CartAlertComponent;
  let fixture: ComponentFixture<CartAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
