import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Questionnaire2Page } from './questionnaire2.page';

describe('Questionnaire2Page', () => {
  let component: Questionnaire2Page;
  let fixture: ComponentFixture<Questionnaire2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Questionnaire2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
