import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionnaireGuidePage } from './questionnaire-guide.page';

describe('QuestionnaireGuidePage', () => {
  let component: QuestionnaireGuidePage;
  let fixture: ComponentFixture<QuestionnaireGuidePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
