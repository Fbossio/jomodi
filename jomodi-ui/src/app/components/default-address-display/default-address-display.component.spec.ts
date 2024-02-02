import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAddressDisplayComponent } from './default-address-display.component';

describe('DefaultAddressDisplayComponent', () => {
  let component: DefaultAddressDisplayComponent;
  let fixture: ComponentFixture<DefaultAddressDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultAddressDisplayComponent]
    });
    fixture = TestBed.createComponent(DefaultAddressDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
