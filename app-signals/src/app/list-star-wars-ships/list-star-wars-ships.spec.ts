import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStarWarsShips } from './list-star-wars-ships';

describe('ListStarWarsShips', () => {
  let component: ListStarWarsShips;
  let fixture: ComponentFixture<ListStarWarsShips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStarWarsShips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStarWarsShips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
