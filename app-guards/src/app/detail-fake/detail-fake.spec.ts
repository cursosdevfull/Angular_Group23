import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFake } from './detail-fake';

describe('DetailFake', () => {
  let component: DetailFake;
  let fixture: ComponentFixture<DetailFake>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailFake]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFake);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
