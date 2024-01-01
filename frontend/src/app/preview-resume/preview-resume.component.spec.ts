import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewResumeComponent } from './preview-resume.component';

describe('PreviewResumeComponent', () => {
  let component: PreviewResumeComponent;
  let fixture: ComponentFixture<PreviewResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewResumeComponent]
    });
    fixture = TestBed.createComponent(PreviewResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
