import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxLeaks } from './rx-leaks';

describe('RxLeaks', () => {
  let component: RxLeaks;
  let fixture: ComponentFixture<RxLeaks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxLeaks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxLeaks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
