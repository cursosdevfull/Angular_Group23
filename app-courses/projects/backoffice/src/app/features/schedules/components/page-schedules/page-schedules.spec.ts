import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSchedules } from './page-schedules';

describe('PageSchedules', () => {
  let component: PageSchedules;
  let fixture: ComponentFixture<PageSchedules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSchedules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSchedules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
