import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamQuestionComponent } from './view-exam-question.component';

describe('ViewExamQuestionComponent', () => {
  let component: ViewExamQuestionComponent;
  let fixture: ComponentFixture<ViewExamQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExamQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExamQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
