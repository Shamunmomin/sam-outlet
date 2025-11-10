import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEndIconsComponent } from './mobile-end-icons.component';

describe('MobileEndIconsComponent', () => {
  let component: MobileEndIconsComponent;
  let fixture: ComponentFixture<MobileEndIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileEndIconsComponent]
    });
    fixture = TestBed.createComponent(MobileEndIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
