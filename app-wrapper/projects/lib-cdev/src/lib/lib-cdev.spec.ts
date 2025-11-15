import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibCdev } from './lib-cdev';

describe('LibCdev', () => {
  let component: LibCdev;
  let fixture: ComponentFixture<LibCdev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibCdev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibCdev);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
