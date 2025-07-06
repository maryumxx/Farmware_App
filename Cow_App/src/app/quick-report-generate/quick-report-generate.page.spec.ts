import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickReportGeneratePage } from './quick-report-generate.page';

describe('QuickReportGeneratePage', () => {
  let component: QuickReportGeneratePage;
  let fixture: ComponentFixture<QuickReportGeneratePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickReportGeneratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
