import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CowDetailPage } from './cow-detail.page';

describe('CowDetailPage', () => {
  let component: CowDetailPage;
  let fixture: ComponentFixture<CowDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CowDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
