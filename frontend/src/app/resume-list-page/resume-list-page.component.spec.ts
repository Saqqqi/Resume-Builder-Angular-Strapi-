import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeListPageComponent } from './resume-list-page.component';

describe('ResumeListPageComponent', () => {
  let component: ResumeListPageComponent;
  let fixture: ComponentFixture<ResumeListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeListPageComponent]
    });
    fixture = TestBed.createComponent(ResumeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
