import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalRecordsDetailPage } from './medical-records-detail.page';

describe('MedicalRecordsDetailPage', () => {
  let component: MedicalRecordsDetailPage;
  let fixture: ComponentFixture<MedicalRecordsDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
