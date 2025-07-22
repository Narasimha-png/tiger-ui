import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoastingsComponent } from './roastings.component';

describe('RoastingsComponent', () => {
  let component: RoastingsComponent;
  let fixture: ComponentFixture<RoastingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoastingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoastingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
