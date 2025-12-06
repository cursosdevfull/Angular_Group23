import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxInterval } from './rx-interval';

describe('RxInterval', () => {
  let component: RxInterval;
  let fixture: ComponentFixture<RxInterval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxInterval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxInterval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
