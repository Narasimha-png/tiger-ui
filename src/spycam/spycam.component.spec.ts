import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpycamComponent } from './spycam.component';

describe('SpycamComponent', () => {
  let component: SpycamComponent;
  let fixture: ComponentFixture<SpycamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpycamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpycamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
