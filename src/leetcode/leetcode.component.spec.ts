import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeetcodeComponent } from './leetcode.component';

describe('LeetcodeComponent', () => {
  let component: LeetcodeComponent;
  let fixture: ComponentFixture<LeetcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeetcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeetcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
