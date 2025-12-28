import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTeachers } from './page-teachers';

describe('PageTeachers', () => {
    let component: PageTeachers;
    let fixture: ComponentFixture<PageTeachers>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageTeachers]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PageTeachers);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});